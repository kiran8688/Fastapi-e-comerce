import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-xl border border-[#e5e4e7] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#aa3bff]">
      <div className="relative aspect-square overflow-hidden bg-[#f4f3ec]">
        <img 
          src={product.image_url || 'https://via.placeholder.com/300'} 
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <button 
          onClick={() => addToCart(product.id)}
          className="absolute bottom-4 right-4 bg-[#aa3bff] text-white p-3 rounded-full opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg hover:scale-110"
        >
          <ShoppingCart size={20} />
        </button>
      </div>

      <div className="p-4 text-left">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-xl font-bold text-[#08060d] mb-2 hover:text-[#aa3bff] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-[#6b6375] text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#aa3bff] font-mono">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          <Link 
            to={`/products/${product.slug}`}
            className="text-sm font-medium text-[#6b6375] hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
