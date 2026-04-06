from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.product import Product
from app.schemas.cart import CartOut, CartItemCreate, CartItemUpdate, CartItemOut

router = APIRouter(prefix="/cart", tags=["cart"])

async def get_or_create_cart(db: AsyncSession, user_id: int) -> Cart:
    stmt = select(Cart).where(Cart.user_id == user_id)
    result = await db.execute(stmt)
    cart = result.scalar_one_or_none()
    
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        await db.commit()
        await db.refresh(cart)
    return cart

@router.get("/", response_model=CartOut)
async def get_cart(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    cart = await get_or_create_cart(db, current_user.id)
    # Eagerly load items and products (simplified for this boilerplate)
    stmt = select(Cart).where(Cart.id == cart.id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

@router.post("/items", response_model=CartItemOut)
async def add_cart_item(
    item_in: CartItemCreate, 
    current_user: User = Depends(get_current_user), 
    db: AsyncSession = Depends(get_db)
):
    cart = await get_or_create_cart(db, current_user.id)
    
    # Check if item exists in cart
    stmt = select(CartItem).where(
        CartItem.cart_id == cart.id, 
        CartItem.product_id == item_in.product_id
    )
    result = await db.execute(stmt)
    existing_item = result.scalar_one_or_none()
    
    if existing_item:
        existing_item.quantity += item_in.quantity
        await db.commit()
        await db.refresh(existing_item)
        return existing_item
    
    # Create new item
    new_item = CartItem(cart_id=cart.id, **item_in.model_dump())
    db.add(new_item)
    await db.commit()
    await db.refresh(new_item)
    return new_item

@router.patch("/items/{item_id}", response_model=CartItemOut)
async def update_cart_item(
    item_id: int,
    item_in: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    cart = await get_or_create_cart(db, current_user.id)
    item = await db.get(CartItem, item_id)
    
    if not item or item.cart_id != cart.id:
        raise HTTPException(status_code=404, detail="Item not found in your cart")
        
    item.quantity = item_in.quantity
    await db.commit()
    await db.refresh(item)
    return item

@router.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_cart_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    cart = await get_or_create_cart(db, current_user.id)
    item = await db.get(CartItem, item_id)
    
    if not item or item.cart_id != cart.id:
        raise HTTPException(status_code=404, detail="Item not found in your cart")
        
    await db.delete(item)
    await db.commit()
