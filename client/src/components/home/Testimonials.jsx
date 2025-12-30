import { Quote } from 'lucide-react';

const reviews = [
  {
    name: "Alex Johnson",
    role: "CrossFit Coach",
    text: "I've tried every protein on the market. Members Nutrition is the only one that doesn't bloat me and tastes incredible.",
    rating: 5
  },
  {
    name: "Sarah Williams",
    role: "Marathon Runner",
    text: "The recovery stack changed my training. I'm hitting PRs at 35 that I couldn't hit at 25. Absolutely essential.",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "Gym Owner",
    text: "Stocking this in my gym has been a game changer. Clients love the brand and the wholesale margins are great.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Elite Athletes</h2>
            <p className="text-gray-400">Don't just take our word for it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-2xl border border-white/5 relative">
                    <Quote className="absolute top-8 right-8 text-white/5 rotate-180" size={60} />
                    
                    <div className="flex gap-1 mb-6">
                        {[...Array(review.rating)].map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-accent rounded-full shadow-[0_0_10px_rgba(249,115,22,0.4)]" />
                        ))}
                    </div>

                    <p className="text-gray-300 text-lg mb-6 leading-relaxed relative z-10">
                        "{review.text}"
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white border border-white/10">
                            {review.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="text-white font-bold">{review.name}</h4>
                            <p className="text-accent text-xs font-bold uppercase">{review.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;