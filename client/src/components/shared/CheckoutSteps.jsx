import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  // Helper to render a step
  const renderStep = (step, label, link) => {
    const isActive = step; // Current or completed step
    
    return (
      <div className="flex flex-col items-center relative z-10">
        <div 
           className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
             isActive 
               ? 'bg-accent text-white shadow-lg shadow-accent/30' 
               : 'bg-gray-200 text-gray-400'
           }`}
        >
          {isActive && step4 ? <Check size={16} /> : (isActive ? <Check size={16} /> : '')}
        </div>
        <div className={`text-xs font-bold mt-2 uppercase tracking-wide ${isActive ? 'text-accent' : 'text-gray-400'}`}>
           {isActive && link ? <Link to={link}>{label}</Link> : label}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex justify-between items-center relative">
        {/* Progress Bar Background */}
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
        
        {/* Login Step */}
        {renderStep(step1, 'Login', '/login')}
        
        {/* Shipping Step */}
        {renderStep(step2, 'Shipping', '/shipping')}
        
        {/* Payment Step */}
        {renderStep(step3, 'Payment', '/payment')}
        
        {/* Place Order Step */}
        {renderStep(step4, 'Order', '/placeorder')}
      </div>
    </div>
  );
};

export default CheckoutSteps;