import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, loading, updateQuantity, removeFromCart } = useCart();

  if (loading) return <div className="py-20 text-center">Loading your cart...</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-8 bg-[#f4f3ec] rounded-3xl mt-12 mx-4">
        <div className="bg-white p-8 rounded-full text-[#aa3bff] shadow-lg">
          <ShoppingBag size={64} />
        </div>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-[#08060d] mb-2">Your cart is empty</h2>
            <p className="text-[#6b6375] mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              to="/products" 
              className="bg-[#aa3bff] text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-[#aa3bff]/20 hover:scale-[1.02] transition-transform"
            >
              Start Shopping
            </Link>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);

  return (
    <div className="pb-20 text-left">
      <h1 className="text-4xl font-bold text-[#08060d] mb-12">
        Your <span className="text-[#aa3bff]">Cart</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-8">
          {cart.items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-[#e5e4e7] bg-white group hover:border-[#aa3bff] transition-colors">
              <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-[#f4f3ec]">
                  <img src={item.product.image_url || 'https://via.placeholder.com/150'} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-[#08060d] mb-1">{item.product.name}</h3>
                    <p className="text-sm text-[#6b6375]">Price: ${parseFloat(item.product.price).toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#6b6375] hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center border border-[#e5e4e7] rounded-lg overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >-</button>
                    <span className="px-5 py-1 border-x border-[#e5e4e7] font-mono text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >+</button>
                  </div>
                  <span className="text-xl font-bold font-mono text-[#08060d]">
                    ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[#08060d] text-white p-10 rounded-3xl shadow-xl shadow-[#08060d]/20">
            <h3 className="text-2xl font-bold mb-8">Order Summary</h3>
            <div className="space-y-6 mb-10 pb-8 border-b border-white/10">
              <div className="flex justify-between items-center text-gray-400">
                <span>Subtotal</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Shipping</span>
                <span className="text-[#aa3bff]">Free</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-white pt-4">
                <span>Total</span>
                <span className="font-mono text-[#aa3bff]">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="w-full bg-[#aa3bff] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#aa3bff]/30"
            >
              Checkout <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
