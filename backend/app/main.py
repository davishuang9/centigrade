from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
from pydantic import BaseModel

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define product model
class Product(BaseModel):
    id: int
    title: str
    price: float
    description: str
    category: str
    image: str
    rating: dict

# Define paginated response model
class PaginatedProducts(BaseModel):
    items: list[Product]
    total: int
    page: int
    page_size: int
    total_pages: int

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI Backend"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/products", response_model=PaginatedProducts)
async def get_products(
    page: int = Query(default=1, ge=1, description="Page number"),
    page_size: int = Query(default=5, ge=1, le=100, description="Number of items per page")
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
                "total_pages": total_pages
            }
            
        except httpx.HTTPError as e:
            raise HTTPException(status_code=503, detail="Failed to fetch products from external API")
