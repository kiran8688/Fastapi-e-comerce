import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden rounded-3xl bg-[#08060d]">
        <div className="absolute inset-0 opacity-30">
           <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
              alt="Hero background"
              className="w-full h-full object-cover"
           />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Elevate Your <span className="text-[#aa3bff]">Lifestyle</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10">
            Discover a curated collection of premium products designed for the modern individual. Quality meets aesthetic in every piece.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link 
              to="/products" 
              className="bg-[#aa3bff] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-[#aa3bff]/20"
            >
              Shop Collection <ShoppingBag size={20} />
            </Link>
            <Link 
              to="/register" 
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[
          { icon: Zap, title: "Next-Day Delivery", desc: "Get your items delivered faster than ever with our optimized logistics." },
          { icon: ShieldCheck, title: "Secure Checkout", desc: "Your security is our priority. Encrypted payments and data protection." },
          { icon: Truck, title: "Free Shipping", desc: "Enjoy free worldwide shipping on all orders over $150." }
        ].map((f, i) => (
          <div key={i} className="p-8 rounded-2xl border border-[#e5e4e7] bg-white hover:shadow-lg transition-shadow text-left">
            <div className="w-12 h-12 rounded-xl bg-[#aa3bff]/10 text-[#aa3bff] flex items-center justify-center mb-6">
              <f.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#08060d] mb-3">{f.title}</h3>
            <p className="text-[#6b6375] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Categories/CTA */}
      <section className="rounded-3xl bg-[#f4f3ec] p-12 md:p-20 text-left flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#08060d] mb-6">
            New arrivals <br/> every <span className="text-[#aa3bff]">Monday</span>.
          </h2>
          <p className="text-[#6b6375] text-lg mb-8">
            Our catalog is constantly evolving. Be the first to know about new drops and exclusive member-only collections.
          </p>
          <Link to="/products" className="inline-flex items-center gap-2 text-[#aa3bff] font-bold text-lg group">
            Browse New Arrivals <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full md:w-[500px]">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200 mt-8">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
