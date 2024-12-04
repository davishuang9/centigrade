import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_get_all_products():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/api/products")
    assert response.status_code == 200
    assert "items" in response.json()
    assert "total" in response.json()
    assert "page" in response.json()
    assert "page_size" in response.json()
    assert "total_pages" in response.json()

@pytest.mark.asyncio
async def test_pagination():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/api/products?page=2&page_size=5")
    assert response.status_code == 200
    data = response.json()
    assert data["page"] == 2
    assert data["page_size"] == 5
    assert len(data["items"]) <= 5
