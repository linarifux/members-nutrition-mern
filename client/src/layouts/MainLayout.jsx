import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Navbar from '../components/shared/Navbar';

const MainLayout = () => {
  return (
    // Updated Background: Deep slate/black gradient
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-accent selection:text-white"> 
      
      {/* Background Ambience (Optional: Adds subtle glowing orbs behind content) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Content z-10 ensures it sits above the background blobs */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="grow container mx-auto px-4 py-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;