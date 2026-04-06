import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="bg-white border-b border-[#e5e4e7] sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-2xl font-bold text-[#08060d]">
          Shop<span className="text-[#aa3bff]">Ease</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/products" className="text-[#6b6375] hover:text-[#aa3bff]">Products</Link>
          <Link to="/cart" className="relative text-[#6b6375] hover:text-[#aa3bff]">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#aa3bff] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-mono">
                {cartItemCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/orders" className="text-[#6b6375] hover:text-[#aa3bff]">Orders</Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-[#6b6375] hover:text-red-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-[#6b6375] hover:text-[#aa3bff]">
              <User size={20} />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#6b6375]">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#e5e4e7] px-4 py-4 space-y-4">
          <Link 
            to="/products" 
            className="block text-[#6b6375]"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link 
            to="/cart" 
            className="block text-[#6b6375]"
            onClick={() => setIsOpen(false)}
          >
            Cart ({cartItemCount})
          </Link>
          {user ? (
            <>
              <Link 
                to="/orders" 
                className="block text-[#6b6375]"
                onClick={() => setIsOpen(false)}
              >
                Orders
              </Link>
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="block text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="block text-[#6b6375]"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
