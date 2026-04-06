import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { cart, loading } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOrdering(true);
    try {
      await API.post('/orders/', { shipping_address: address });
      setSuccess(true);
      setTimeout(() => navigate('/orders'), 2500);
    } catch (err) {
      console.error("Order failed", err);
      alert("Order failed, please try again.");
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!cart || cart.items.length === 0) {
     return <div className="py-20 text-center">No items in cart for checkout.</div>;
  }

  if (success) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-8 bg-[#f4f3ec] rounded-3xl mt-12 mx-4">
        <div className="bg-[#aa3bff] p-8 rounded-full text-white shadow-lg animate-bounce">
          <CheckCircle2 size={64} />
        </div>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-[#08060d] mb-2">Order Confirmed!</h2>
            <p className="text-[#6b6375] mb-8">Thank you for your purchase. Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);

  return (
    <div className="pb-20 text-left">
      <h1 className="text-4xl font-bold text-[#08060d] mb-12">
        Finalize <span className="text-[#aa3bff]">Checkout</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Shipping Form */}
        <div className="space-y-10">
          <div className="bg-white p-8 rounded-3xl border border-[#e5e4e7]">
             <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Truck className="text-[#aa3bff]" /> Shipping Information
             </h3>
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#08060d] mb-2 uppercase tracking-wider">
                    Detailed Shipping Address
                  </label>
                  <textarea 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Enter full address, including apartment/suite number, city, and zip code."
                    rows={4}
                    className="w-full px-4 py-3 border border-[#e5e4e7] rounded-xl focus:border-[#aa3bff] focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="pt-8 flex flex-col space-y-4">
                   <div className="flex items-center gap-4 text-sm text-[#6b6375] bg-[#f4f3ec] p-4 rounded-xl border border-dashed border-[#aa3bff]/30">
                      <ShieldCheck className="text-[#aa3bff]" size={20} />
                      <span>All transactions are encrypted and secured.</span>
                   </div>
                   <button 
                      type="submit" 
                      disabled={ordering}
                      className="w-full bg-[#aa3bff] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#aa3bff]/30 active:scale-95 disabled:opacity-50"
                   >
                     {ordering ? 'Placing Order...' : 'Place Secure Order'} <ArrowRight size={20} />
                   </button>
                </div>
             </form>
          </div>
        </div>

        {/* Order Summary Preview */}
        <div className="space-y-8">
           <div className="bg-[#f4f3ec] p-10 rounded-3xl border border-[#e5e4e7]">
              <h3 className="text-2xl font-bold text-[#08060d] mb-8">Items Overview</h3>
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2">
                 {cart.items.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                       <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-[#e5e4e7] flex-shrink-0">
                          <img src={item.product.image_url || 'https://via.placeholder.com/100'} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-grow">
                          <h4 className="font-bold text-[#08060d] text-sm">{item.product.name}</h4>
                          <p className="text-xs text-[#6b6375]">Qty: {item.quantity}</p>
                       </div>
                       <span className="font-mono font-bold text-sm text-[#08060d]">
                          ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                       </span>
                    </div>
                 ))}
              </div>

              <div className="border-t border-[#e5e4e7] pt-8 space-y-4">
                 <div className="flex justify-between items-center text-[#6b6375]">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center text-[#6b6375]">
                    <span>Shipping</span>
                    <span className="text-[#aa3bff] font-bold">FREE</span>
                 </div>
                 <div className="flex justify-between items-center text-2xl font-bold pt-4 text-[#08060d]">
                    <span>Total Due</span>
                    <span className="font-mono text-[#aa3bff]">${subtotal.toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
