import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/`);
        // Note: Backend might need a dedicated GET /products/slug/{slug} 
        // For now, finding it in the list (assuming list is small)
        const found = res.data.find(p => p.slug === slug);
        setProduct(found);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!product) return <div className="py-20 text-center">Product not found.</div>;

  return (
    <div className="pb-20 text-left">
      <Link to="/products" className="inline-flex items-center gap-2 text-[#6b6375] hover:text-[#aa3bff] mb-12 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Section */}
        <div className="rounded-3xl overflow-hidden bg-[#f4f3ec] aspect-square border border-[#e5e4e7]">
           <img src={product.image_url || 'https://via.placeholder.com/600'} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
               {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-sm text-[#6b6375]">(48 reviews)</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#08060d] mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-[#aa3bff] font-mono mb-8">${parseFloat(product.price).toFixed(2)}</p>
          
          <div className="prose prose-slate mb-10">
            <p className="text-[#6b6375] text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center gap-6 mb-10">
            <div className="flex items-center border border-[#e5e4e7] rounded-xl overflow-hidden">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >-</button>
              <span className="px-6 py-2 border-x border-[#e5e4e7] font-mono">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >+</button>
            </div>

            <button 
              onClick={() => addToCart(product.id, quantity)}
              className="flex-grow bg-[#aa3bff] text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#aa3bff]/20 hover:scale-[1.02] transition-transform active:scale-95"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-10 border-t border-[#e5e4e7]">
            <div className="flex items-center gap-3 text-[#6b6375] text-sm">
              <Truck size={20} className="text-[#aa3bff]" />
              <span>Complimentary Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-[#6b6375] text-sm">
              <ShieldCheck size={20} className="text-[#aa3bff]" />
              <span>2-Year Global Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
