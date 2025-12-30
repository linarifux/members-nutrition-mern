import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-white/5 pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white tracking-tighter">
              Members<span className="text-accent">Nutrition</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Elevate your potential with science-backed formulations. 
              Pure. Potent. Premium.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
                    <Icon size={18} />
                  </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Explore</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {['Home', 'About Us', 'Shop All', 'Wholesale', 'Contact'].map(link => (
                  <li key={link}>
                      <Link to="/" className="hover:text-accent hover:pl-2 transition-all duration-300 inline-block">{link}</Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-1" />
                <span>123 Wellness Blvd, <br/> New York, NY 10012</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>support@members.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="glass-panel p-6 rounded-2xl border-white/5 bg-white/5">
            <h3 className="text-white font-bold text-lg mb-2">Join the Club</h3>
            <p className="text-xs text-gray-400 mb-4">Get 10% off your first premium order.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email address" 
                className="glass-input w-full px-4 py-3 rounded-lg text-sm"
              />
              <button className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 btn-glow">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>&copy; {currentYear} Members Nutrition.</p>
          <div className="flex items-center gap-1 opacity-50">
             <span>Designed for</span>
             <span className="text-white font-bold">Greatness</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;