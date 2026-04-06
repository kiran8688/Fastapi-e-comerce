import { useState, useEffect } from 'react';
import API from '../services/api';
import { Package, Calendar, MapPin, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/');
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading your orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-8 bg-[#f4f3ec] rounded-3xl mt-12 mx-4">
        <div className="bg-white p-8 rounded-full text-[#aa3bff] shadow-lg">
          <Package size={64} />
        </div>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-[#08060d] mb-2">No orders yet</h2>
            <p className="text-[#6b6375] mb-8">Your order history is empty. Time for your first purchase!</p>
            <Link 
              to="/products" 
              className="bg-[#aa3bff] text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-[#aa3bff]/20 hover:scale-[1.02] transition-transform text-lg"
            >
              Start Shopping
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 text-left">
      <h1 className="text-4xl font-bold text-[#08060d] mb-12">
        Order <span className="text-[#aa3bff]">History</span>
      </h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-3xl border border-[#e5e4e7] overflow-hidden hover:border-[#aa3bff] transition-all duration-300">
             <div className="bg-[#f4f3ec]/50 p-6 flex flex-wrap items-center justify-between gap-6 border-b border-[#e5e4e7]">
                <div className="flex items-center gap-4">
                   <div className="bg-white p-3 rounded-xl border border-[#e5e4e7] text-[#aa3bff]">
                      <Package size={24} />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-[#6b6375] uppercase tracking-wider mb-1">Order ID</p>
                      <h3 className="font-mono text-[#08060d]">ORD-2026-F{order.id}</h3>
                   </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="hidden sm:block">
                      <p className="text-xs font-bold text-[#6b6375] uppercase tracking-wider mb-1">Placed On</p>
                      <div className="flex items-center gap-2 text-[#08060d]">
                         <Calendar size={16} className="text-[#aa3bff]" />
                         <span>{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-[#6b6375] uppercase tracking-wider mb-1">Total</p>
                      <p className="font-mono font-bold text-[#aa3bff] text-lg">${parseFloat(order.total_price).toFixed(2)}</p>
                   </div>
                   <div className="bg-[#aa3bff] text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                      {order.status}
                   </div>
                </div>
             </div>

             <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                   <div className="space-y-6">
                      <h4 className="font-bold text-[#08060d]">Items ({order.items.length})</h4>
                      <div className="space-y-4">
                         {order.items.map(item => (
                            <div key={item.id} className="flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-[#aa3bff]" />
                                  <span className="text-[#6b6375]">{item.product?.name || 'Product'} × {item.quantity}</span>
                               </div>
                               <span className="font-mono text-sm text-[#08060d]">${parseFloat(item.price_at_time_of_order).toFixed(2)}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="space-y-6 md:border-l md:border-[#e5e4e7] md:pl-12">
                      <h4 className="font-bold text-[#08060d]">Shipping Details</h4>
                      <div className="flex items-start gap-3 text-[#6b6375]">
                        <MapPin size={20} className="text-[#aa3bff] flex-shrink-0 mt-1" />
                        <p className="text-sm leading-relaxed">{order.shipping_address}</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
