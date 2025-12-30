import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts'; // Import
import Benefits from '../components/home/Benefits';
import WholesaleCTA from '../components/home/WholesaleCTA';
import Testimonials from '../components/home/Testimonials';

const HomePage = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <Benefits />
      <FeaturedProducts /> {/* Add Section */}
      <WholesaleCTA />
      <Testimonials />
    </div>
  );
};

export default HomePage;