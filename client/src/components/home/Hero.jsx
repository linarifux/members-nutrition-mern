import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';

// Animation Variants for staggered entrance
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
    <section className="relative min-h-[85vh] flex items-center">
      {/* Background decorative blobs */}
      <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none mix-blend-multiply"></div>
      
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-center md:text-left"
        >
          {/* A small "pill" badge above headline */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider">
            <TrendingUp size={16} /> New Standard in Nutrition
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-primary">
            Fuel Your Body. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-600">
              Master Your Health.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Premium supplements and vitamins for high performers. Unlock exclusive retail and wholesale pricing today.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/shop" className="group flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
              Shop Now 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/wholesale" className="flex items-center justify-center gap-2 bg-white text-primary border-2 border-gray-200 px-8 py-4 rounded-full text-lg font-bold hover:border-primary hover:bg-gray-50 transition-all active:scale-95">
              Wholesale Access
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="pt-8 flex items-center justify-center md:justify-start gap-8 text-gray-500 text-sm font-medium">
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
          className="relative hidden md:block h-full min-h-[600px]"
        >
          {/* Main Image Container with interesting border radius */}
          <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl shadow-primary/10 border-[6px] border-white bg-gray-100">
             {/* Replace with your actual high-res image later */}
             <img 
               src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" 
               alt="Athlete training" 
               className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
             />
             {/* Dark Overlay Gradient for better text contrast if needed */}
             <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay"></div>
          </div>

          {/* FLOATING GLASS CARD #1 - Bottom Left */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ 
              opacity: { delay: 1, duration: 0.5 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
            }}
            className="absolute bottom-12 -left-12 bg-white/30 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-xl flex items-center gap-4 w-64 z-10"
          >
            <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center text-white">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-bold text-primary leading-none">Wholesale</h3>
              <p className="text-sm text-primary/70">Save up to 50%</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;