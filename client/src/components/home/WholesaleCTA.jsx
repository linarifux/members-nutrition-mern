import { Link } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';

const WholesaleCTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden">
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
                alt="Gym Background" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-10 md:p-20 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-accent/20">
                <Building2 size={14} /> B2B Partner Program
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Own a Gym or Supplement Store?
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Join our Wholesale Partner Program and get exclusive access to bulk pricing (up to 50% off), marketing materials, and priority support.
            </p>

            <Link 
                to="/wholesale" 
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors shadow-xl"
            >
                Apply for Wholesale <ArrowRight size={20} />
            </Link>
        </div>
      </div>
    </section>
  );
};

export default WholesaleCTA;