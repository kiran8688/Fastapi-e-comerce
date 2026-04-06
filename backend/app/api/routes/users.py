from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.schemas.user import UserOut

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserOut)
async def update_me(
    full_name: str, 
    current_user: User = Depends(get_current_user), 
    db: AsyncSession = Depends(get_db)
):
    current_user.full_name = full_name
    await db.commit()
    await db.refresh(current_user)
    return current_user
