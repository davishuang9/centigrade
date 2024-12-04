from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
from pydantic import BaseModel
from fastapi_cache import FastAPICache
from fastapi_cache.backends.inmemory import InMemoryBackend
from fastapi_cache.decorator import cache

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProductRating(BaseModel):
    rate: float
    count: int


# Define product model
class Product(BaseModel):
    id: int
    title: str
    price: float
    description: str
    category: str
    image: str
    rating: ProductRating


# Define paginated response model
class PaginatedProducts(BaseModel):
    items: list[Product]
    total: int
    page: int
    page_size: int
    total_pages: int


@app.on_event("startup")
async def on_startup():
    FastAPICache.init(InMemoryBackend())


@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI Backend"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/api/products", response_model=PaginatedProducts)
@cache(expire=60)
async def get_products(
    page: int = Query(default=1, ge=1, description="Page number"),
    page_size: int = Query(
        default=5, ge=1, le=100, description="Number of items per page"
    ),
):
    """
    Fetch products from the Fake Store API with pagination
    """
    async with httpx.AsyncClient() as client:
        try:
            # Get all products first (limited to 100 by the API)
            response = await client.get("https://fakestoreapi.com/products?limit=100")
            response.raise_for_status()
            all_products = response.json()

            # Calculate pagination
            total_items = len(all_products)
            total_pages = (total_items + page_size - 1) // page_size

            # Validate page number
            if page > total_pages:
                raise HTTPException(status_code=404, detail="Page not found")

            # Get paginated slice of products
            start_idx = (page - 1) * page_size
            end_idx = min(start_idx + page_size, total_items)
            paginated_products = all_products[start_idx:end_idx]

            return {
                "items": paginated_products,
                "total": total_items,
                "page": page,
                "page_size": page_size,
                "total_pages": total_pages,
            }

        except httpx.HTTPError as e:
            raise HTTPException(
                status_code=503, detail="Failed to fetch products from external API"
            )


@app.get("/api/products/{product_id}", response_model=Product)
@cache(expire=60)
async def get_product(product_id: int):
    """
    Fetch a single product by ID from the Fake Store API
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"https://fakestoreapi.com/products/{product_id}"
            )
            response.raise_for_status()
            product = response.json()
            return product
        except httpx.HTTPError as e:
            raise HTTPException(status_code=404, detail="Product not found")


class UserCredentials(BaseModel):
    username: str
    password: str


@app.post("/api/login")
@cache(expire=60)
async def user_login(credentials: UserCredentials):
    """
    Authenticate user and return token
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://fakestoreapi.com/auth/login", json=credentials.dict()
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=401, detail="Invalid credentials")
