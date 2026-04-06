import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCart = async () => {
    try {
      const res = await API.get('/cart/');
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
      setLoading(false);
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      // Basic local cart logic could go here for guests
      alert("Please login to add items to your cart");
      return;
    }
    try {
      await API.post('/cart/items', { product_id: productId, quantity });
      await fetchCart();
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await API.patch(`/cart/items/${itemId}`, { quantity });
      await fetchCart();
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await API.delete(`/cart/items/${itemId}`);
      await fetchCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
