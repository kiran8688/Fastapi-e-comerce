from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    description = Column(Text)
    price = Column(Numeric(10,2), nullable=False)
    stock_quantity = Column(Integer, nullable=False, default=0)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="SET NULL"))
    image_url = Column(String(512))
    created_at = Column(DateTime(timezone=True), server_default=func.now())