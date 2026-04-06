from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from decimal import Decimal
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    price: Decimal
    stock_quantity: int = 0
    category_id: Optional[int] = None
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    stock_quantity: Optional[int] = None
    category_id: Optional[int] = None
    image_url: Optional[str] = None

class ProductOut(ProductBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
