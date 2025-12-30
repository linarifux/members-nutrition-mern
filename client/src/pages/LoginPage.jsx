import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (err) {
      console.error(err);
      // Optional: Add toast notification here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-4xl shadow-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2 min-h-150">
        
        {/* LEFT: Form Section */}
        <div className="p-10 md:p-14 flex flex-col justify-center relative">
           <div className="mb-10">
              <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
              <p className="text-gray-500">Enter your credentials to access your account.</p>
           </div>

           {error && (
             <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm font-medium">
               {error?.data?.message || 'Invalid email or password'}
             </div>
           )}

           <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700">Email Address</label>
                 <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                      type="email" 
                      placeholder="name@company.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700">Password</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20}/></>}
              </button>
           </form>

           <div className="mt-8 text-center text-sm text-gray-500">
              New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-accent font-bold hover:underline">Create Account</Link>
           </div>
        </div>

        {/* RIGHT: Visual Section */}
        <div className="hidden md:block relative bg-primary overflow-hidden">
           <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-primary/80 z-10" />
           <img 
             src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" 
             alt="Fitness Model" 
             className="w-full h-full object-cover opacity-80"
           />
           <div className="absolute bottom-14 left-14 z-20 text-white max-w-xs">
              <h2 className="text-3xl font-bold mb-4">Wholesale Access</h2>
              <p className="opacity-90 leading-relaxed">
                 Approved retailers get up to 50% off. Login to view your exclusive pricing.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;