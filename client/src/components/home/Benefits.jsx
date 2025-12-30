import { FlaskConical, Leaf, Truck, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: FlaskConical,
    title: "Science-Backed",
    desc: "Formulations based on clinical research, not bro-science."
  },
  {
    icon: Leaf,
    title: "100% Pure",
    desc: "Sourced from the finest ingredients with zero fillers."
  },
  {
    icon: ShieldCheck,
    title: "Lab Tested",
    desc: "Every batch is tested for purity and potency."
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    desc: "Free shipping on orders over $50 for members."
  }
];

const Benefits = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => (
            <div 
              key={idx} 
              className="glass-panel p-8 rounded-2xl border border-white/5 hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;