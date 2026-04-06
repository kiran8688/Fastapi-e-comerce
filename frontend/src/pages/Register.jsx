import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { UserPlus, ArrowRight, Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { 
        email, 
        password, 
        full_name: fullName 
      });
      navigate('/login');
    } catch (err) {
      console.error("Registration failed", err);
      alert("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-12 rounded-3xl border border-[#e5e4e7] shadow-xl">
        <div className="flex flex-col items-center mb-10 text-center">
            <div className="bg-[#aa3bff]/10 p-4 rounded-2xl text-[#aa3bff] mb-4">
                <UserPlus size={32} />
            </div>
            <h1 className="text-3xl font-bold text-[#08060d]">Create Account</h1>
            <p className="text-[#6b6375] mt-2">Join the premium shopping experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6375]" size={20} />
            <input 
              type="text" 
              placeholder="Full Name" 
              required
              className="w-full pl-10 pr-4 py-3 border border-[#e5e4e7] rounded-xl focus:border-[#aa3bff] focus:outline-none bg-[#f4f3ec]/30 font-sans"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6375]" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              className="w-full pl-10 pr-4 py-3 border border-[#e5e4e7] rounded-xl focus:border-[#aa3bff] focus:outline-none bg-[#f4f3ec]/30 font-sans"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6375]" size={20} />
            <input 
              type="password" 
              placeholder="Create Password" 
              required
              className="w-full pl-10 pr-4 py-3 border border-[#e5e4e7] rounded-xl focus:border-[#aa3bff] focus:outline-none bg-[#f4f3ec]/30 font-sans"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
             type="submit" 
             className="w-full bg-[#aa3bff] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#aa3bff]/30"
          >
            Sign Up <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-8 text-center text-[#6b6375]">
          Already have an account? {' '}
          <Link to="/login" className="text-[#aa3bff] font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
