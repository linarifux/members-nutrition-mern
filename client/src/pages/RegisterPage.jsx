import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { Loader2, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null); // Local validation error

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading, error }] = useRegisterMutation();
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
    
    // 1. Client-side validation
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    } else {
      setMessage(null);
    }

    // 2. Server request
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
       {/* Background Glow spots */}
       <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
       <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="glass-panel rounded-4xl shadow-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2 min-h-150 border border-white/10 relative z-10">

        {/* LEFT: Form Section */}
        <div className="p-10 md:p-14 flex flex-col justify-center relative">
           <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Join the Club</h1>
              <p className="text-gray-400">Create an account to unlock fast checkout and order tracking.</p>
           </div>

           {/* Error Alerts */}
           {(error || message) && (
             <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6 text-sm font-medium border border-red-500/20 flex items-center gap-2">
               <div className="w-1 h-4 bg-red-400 rounded-full"></div>
               {message || error?.data?.message}
             </div>
           )}

           <form onSubmit={submitHandler} className="space-y-5">
             
             {/* Name Input */}
             <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">Full Name</label>
                 <div className="relative">
                    <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                 </div>
             </div>

             {/* Email Input */}
             <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">Email Address</label>
                 <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
                    <input 
                      type="email" 
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                 </div>
             </div>

             {/* Password Input */}
             <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">Password</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                 </div>
             </div>

             {/* Confirm Password */}
             <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">Confirm Password</label>
                 <div className="relative">
                    <CheckCircle className="absolute left-4 top-3.5 text-gray-500" size={18} />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                 </div>
             </div>

             <button 
               type="submit" 
               disabled={isLoading}
               className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-accent/20 btn-glow"
             >
               {isLoading ? <Loader2 className="animate-spin" /> : <>Create Account <ArrowRight size={20}/></>}
             </button>
           </form>

           <div className="mt-8 text-center text-sm text-gray-400">
             Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-accent font-bold hover:underline">Log In</Link>
           </div>
        </div>

        {/* RIGHT: Visual Section */}
        <div className="hidden md:block relative bg-gray-900 overflow-hidden">
           <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10" />
           {/* Updated to a valid, high-quality, moody gym image */}
           <img 
             src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
             alt="Dark Gym Atmosphere" 
             className="w-full h-full object-cover opacity-80 scale-105"
           />
           <div className="absolute bottom-14 left-14 z-20 text-white max-w-sm">
              <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">Start Your Journey</h2>
              <ul className="space-y-3 opacity-90 text-sm font-medium">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> Exclusive member-only discounts</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> Fast & trackable shipping</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> Early access to new drops</li>
              </ul>
           </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;