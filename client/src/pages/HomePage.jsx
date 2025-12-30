import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Benefits from '../components/home/Benefits';
import WholesaleCTA from '../components/home/WholesaleCTA';
import Testimonials from '../components/home/Testimonials';

const HomePage = () => {
  return (
    // 'space-y-0' lets components control their own padding, 
    // ensuring background effects blend perfectly.
    <div className="space-y-0 pb-20"> 
      <Hero />
      <Benefits />
      <FeaturedProducts />
      <WholesaleCTA />
      <Testimonials />
    </div>
  );
};

export default HomePage;