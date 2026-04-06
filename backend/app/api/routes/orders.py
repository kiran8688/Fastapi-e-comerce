from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.order import Order
from app.models.order_item import OrderItem
from app.schemas.order import OrderCreate, OrderOut

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=OrderOut, status_code=status.HTTP_201_CREATED)
async def create_order(
    order_in: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Get cart for current user
    stmt = select(Cart).where(Cart.user_id == current_user.id)
    result = await db.execute(stmt)
    cart = result.scalar_one_or_none()
    
    if not cart or not cart.items:
        raise HTTPException(status_code=400, detail="Your cart is empty")

    # Create total price
    total_price = sum(item.product.price * item.quantity for item in cart.items)
    
    # Create the order
    new_order = Order(
        user_id=current_user.id,
        total_price=total_price,
        shipping_address=order_in.shipping_address,
        status="pending"
    )
    db.add(new_order)
    await db.flush() # get new order id
    
    # Create order items
    for cart_item in cart.items:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity,
            price_at_time_of_order=cart_item.product.price
        )
        db.add(order_item)
        
    # Clear the cart items
    for item in cart.items:
        await db.delete(item)
        
    await db.commit()
    await db.refresh(new_order)
    
    # Reload with relationships
    stmt = select(Order).where(Order.id == new_order.id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

@router.get("/", response_model=List[OrderOut])
async def list_orders(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    stmt = select(Order).where(Order.user_id == current_user.id)
    result = await db.execute(stmt)
    return result.scalars().all()

@router.get("/{order_id}", response_model=OrderOut)
async def get_order(
    order_id: int, 
    current_user: User = Depends(get_current_user), 
    db: AsyncSession = Depends(get_db)
):
    order = await db.get(Order, order_id)
    if not order or order.user_id != current_user.id:
         raise HTTPException(status_code=404, detail="Order not found")
    return order
