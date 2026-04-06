from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime
from .product import ProductOut

class CartItemBase(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemOut(CartItemBase):
    id: int
    cart_id: int
    product: ProductOut
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

class CartOut(BaseModel):
    id: int
    user_id: Optional[int] = None
    items: List[CartItemOut]
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
