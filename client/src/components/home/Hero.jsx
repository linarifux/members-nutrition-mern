import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100 } 
  },
};

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-visible">
      {/* Background decorative blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-150 h-150 bg-accent/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen"></div>
      
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center px-6">
        
        {/* LEFT COLUMN: Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-center md:text-left relative z-10"
        >
          {/* Pill Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg shadow-accent/5">
            <Sparkles size={16} /> New Standard in Nutrition
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-white">
            Fuel Your Body. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-orange-500 drop-shadow-lg">
              Master Your Health.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Premium supplements and vitamins for high performers. Unlock exclusive retail and wholesale pricing today.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/shop" className="group flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-accent/20 btn-glow">
              Shop Now 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/wholesale" className="flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 hover:border-white/30 transition-all active:scale-95 backdrop-blur-sm">
              Wholesale Access
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="pt-4 flex items-center justify-center md:justify-start gap-8 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-accent" size={20} /> GMP Certified
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-accent" size={20} /> Lab Tested
            </div>
          </motion.div>
        </motion.div>


        {/* RIGHT COLUMN: Visual Composition */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          className="relative hidden md:block h-full min-h-150"
        >
          {/* Main Image Container */}
          <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl shadow-accent/5 border border-white/10 bg-gray-900/50 backdrop-blur-sm">
             {/* Gradient overlay for better text contrast if needed */}
             <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10"></div>
             
             <img 
               src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
               alt="Athlete training" 
               className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-[2s] ease-out"
             />
          </div>

          {/* FLOATING GLASS CARD - Dark Glass Style */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ 
              opacity: { delay: 1, duration: 0.5 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
            }}
            className="absolute bottom-12 -left-12 bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-4 w-72 z-20"
          >
            <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center text-accent border border-accent/20">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white leading-none mb-1">Wholesale Partner</h3>
              <p className="text-sm text-gray-400">Save up to 50% on bulk.</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;