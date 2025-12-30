import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/shared/CheckoutSteps';
import { ArrowRight, MapPin } from 'lucide-react';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Pre-fill form if address exists in state
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment'); 
  };

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] -z-10" />

      <CheckoutSteps step1 step2 />

      <div className="max-w-xl mx-auto glass-panel rounded-3xl shadow-2xl overflow-hidden border border-white/10 mt-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent/20 to-orange-600/10 p-8 text-white relative overflow-hidden border-b border-white/5">
           <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
           <h1 className="text-2xl font-bold relative z-10 flex items-center gap-2">
              <MapPin className="text-accent" /> Shipping Details
           </h1>
           <p className="text-gray-300 text-sm mt-2 relative z-10 opacity-80">
              Where should we send your package?
           </p>
        </div>

        <div className="p-8">
          <form onSubmit={submitHandler} className="space-y-6">
            
            {/* Address */}
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Street Address</label>
               <input 
                 type="text" 
                 required
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:bg-black/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                 placeholder="123 Main St, Apt 4B"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* City */}
                <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">City</label>
                   <input 
                     type="text" 
                     required
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:bg-black/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                     placeholder="New York"
                   />
                </div>

                {/* Postal Code */}
                <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Postal Code</label>
                   <input 
                     type="text" 
                     required
                     value={postalCode}
                     onChange={(e) => setPostalCode(e.target.value)}
                     className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:bg-black/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                     placeholder="10001"
                   />
                </div>
            </div>

            {/* Country */}
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Country</label>
               <input 
                 type="text" 
                 required
                 value={country}
                 onChange={(e) => setCountry(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:bg-black/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                 placeholder="United States"
               />
            </div>

            <button 
              type="submit" 
              className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 mt-6 shadow-lg shadow-accent/20 btn-glow"
            >
              Continue to Payment <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;