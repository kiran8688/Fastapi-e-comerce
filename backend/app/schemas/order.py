from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from decimal import Decimal
from datetime import datetime
from .product import ProductOut

class OrderItemOut(BaseModel):
    id: int
    product_id: Optional[int] = None
    product: Optional[ProductOut] = None
    quantity: int
    price_at_time_of_order: Decimal

    model_config = ConfigDict(from_attributes=True)

class OrderCreate(BaseModel):
    shipping_address: str

class OrderUpdate(BaseModel):
    status: str

class OrderOut(BaseModel):
    id: int
    user_id: Optional[int] = None
    status: str
    total_price: Decimal
    shipping_address: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    items: List[OrderItemOut]

    model_config = ConfigDict(from_attributes=True)
