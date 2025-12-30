import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Navbar from '../components/shared/Navbar'; // Ensure this path matches where you saved Navbar

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-accent selection:text-white relative"> 
      
      {/* 1. Global Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Top Left Orb */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]" />
          {/* Bottom Right Orb */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      {/* 2. Content Wrapper (z-10 sits above background) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        {/* - pt-24: Adds padding to top so content doesn't hide behind fixed Navbar 
            - w-full: Allows children (like Hero) to control their own width/container 
        */}
        <main className="flex-grow w-full pt-24">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;