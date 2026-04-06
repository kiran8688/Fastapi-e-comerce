import { useState, useEffect } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { Filter, Search } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          API.get('/products/'),
          API.get('/categories/')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Failed to fetch products/categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || p.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-20 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="text-4xl font-bold text-[#08060d]">
          All <span className="text-[#aa3bff]">Products</span>
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6375]" size={20} />
            <input 
              type="text" 
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-[#e5e4e7] rounded-xl focus:border-[#aa3bff] focus:outline-none bg-white font-sans"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6375]" size={20} />
            <select 
              className="pl-10 pr-8 py-2 border border-[#e5e4e7] rounded-xl focus:border-[#aa3bff] focus:outline-none bg-white appearance-none cursor-pointer font-sans"
              onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-[#f4f3ec] rounded-xl aspect-[3/4]" />
          ))}
        </div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#f4f3ec] rounded-2xl">
              <p className="text-[#6b6375] text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
