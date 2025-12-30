import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../redux/slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../redux/slices/ordersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { Loader2, User, Package, Save, ShieldCheck, ShoppingBag, Eye, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  // Redux State
  const { userInfo } = useSelector((state) => state.auth);
  
  // API Hooks
  const [updateProfile, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

  // Fill form on load
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      {/* Page Header */}
      <div className="mb-10 flex items-end gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center text-white shadow-lg shadow-accent/20">
             <User size={32} />
        </div>
        <div>
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
            <p className="text-gray-400">Manage your account and view order history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COL: User Details Form */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
        >
            <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-accent"/> Account Details
                </h2>

                <form onSubmit={submitHandler} className="space-y-4 relative z-10">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-3.5 text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="Enter name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                className="glass-input w-full pl-10 pr-4 py-3 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                        <div className="relative">
                            <span className="absolute left-3 top-3.5 text-gray-500">@</span>
                            <input 
                                type="email" 
                                placeholder="Enter email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="glass-input w-full pl-10 pr-4 py-3 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="border-t border-white/10 my-4 pt-4">
                        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                            <Lock size={14} /> Change Password
                        </h3>
                        
                        <div className="space-y-4">
                            <input 
                                type="password" 
                                placeholder="New Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="glass-input w-full px-4 py-3 rounded-xl"
                            />
                            <input 
                                type="password" 
                                placeholder="Confirm New Password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="glass-input w-full px-4 py-3 rounded-xl"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loadingUpdate}
                        className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-4 btn-glow"
                    >
                        {loadingUpdate ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Update Profile</>}
                    </button>
                </form>

                {/* Role Badge */}
                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                    <span className="text-sm text-gray-400">Account Type</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                        userInfo.role === 'wholesale' 
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                            : userInfo.role === 'admin' 
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                        {userInfo.role === 'admin' ? 'Administrator' : userInfo.role === 'wholesale' ? 'Wholesale Partner' : 'Retail Customer'}
                    </span>
                </div>
            </div>
        </motion.div>

        {/* RIGHT COL: Order History */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
        >
             <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden min-h-[500px]">
                <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Package size={20} className="text-accent"/> Order History
                    </h2>
                </div>

                {loadingOrders ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-accent" size={40} />
                    </div>
                ) : errorOrders ? (
                    <div className="p-8 text-center text-red-400">
                        {errorOrders?.data?.message || errorOrders.error}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Payment</th>
                                    <th className="p-4">Delivery</th>
                                    <th className="p-4">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-mono text-gray-500">
                                            {order._id.substring(order._id.length - 8)}
                                        </td>
                                        <td className="p-4 text-gray-300">
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td className="p-4 font-bold text-white">
                                            ${order.totalPrice}
                                        </td>
                                        <td className="p-4">
                                            {order.isPaid ? (
                                                <span className="inline-flex items-center gap-1 text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs">
                                                    Paid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs">
                                                    Not Paid
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {order.isDelivered ? (
                                                <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs">Delivered</span>
                                            ) : (
                                                <span className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded text-xs">In Progress</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <Link 
                                                to={`/order/${order._id}`} 
                                                className="p-2 bg-white/10 hover:bg-accent hover:text-white rounded-lg transition-colors inline-block"
                                            >
                                                <Eye size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {orders.length === 0 && (
                            <div className="text-center py-20">
                                <ShoppingBag className="mx-auto text-gray-600 mb-4" size={48} />
                                <h3 className="text-xl font-bold text-gray-400">No orders yet</h3>
                                <Link to="/shop" className="text-accent hover:underline mt-2 inline-block">Start Shopping</Link>
                            </div>
                        )}
                    </div>
                )}
             </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProfilePage;