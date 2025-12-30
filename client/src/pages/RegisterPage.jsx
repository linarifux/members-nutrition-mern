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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-4xl shadow-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2 min-h-162.5">

        {/* LEFT: Form Section */}
        <div className="p-10 md:p-14 flex flex-col justify-center relative">
           <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">Join the Club</h1>
              <p className="text-gray-500">Create an account to unlock fast checkout and order tracking.</p>
           </div>

           {/* Error Alerts */}
           {(error || message) && (
             <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm font-medium border border-red-100 flex items-center gap-2">
               <div className="w-1 h-4 bg-red-400 rounded-full"></div>
               {message || error?.data?.message}
             </div>
           )}

           <form onSubmit={submitHandler} className="space-y-5">
              
              {/* Name Input */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
                 <div className="relative">
                    <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                 </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
                 <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                 </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                 </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Confirm Password</label>
                 <div className="relative">
                    <CheckCircle className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <>Create Account <ArrowRight size={20}/></>}
              </button>
           </form>

           <div className="mt-8 text-center text-sm text-gray-500">
              Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-accent font-bold hover:underline">Log In</Link>
           </div>
        </div>

        {/* RIGHT: Visual Section */}
        <div className="hidden md:block relative bg-gray-900 overflow-hidden">
           <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
           <img 
             src="https://images.unsplash.com/photo-1574680096141-987702e5c0c8?q=80&w=1974&auto=format&fit=crop" 
             alt="Healthy Lifestyle" 
             className="w-full h-full object-cover opacity-90"
           />
           <div className="absolute bottom-14 left-14 z-20 text-white max-w-sm">
              <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
              <ul className="space-y-3 opacity-90 text-sm">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div> Exclusive member-only discounts</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div> Fast & trackable shipping</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div> Early access to new drops</li>
              </ul>
           </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
