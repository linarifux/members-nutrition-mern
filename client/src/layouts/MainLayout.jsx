import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import CartDrawer from '../components/shared/CartDrawer'; // <--- Import

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-primary font-sans relative">
      
      {/* Dynamic Background Blurs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <Navbar />
      <CartDrawer /> {/* <--- Add here (can be anywhere, it's fixed position) */}

      {/* Main Content Area */}
      {/* Added pt-24 to prevent content from hiding behind the fixed navbar */}
      <main className="pt-24 min-h-[80vh]">
        <Outlet />
      </main>

      {/* Simple Footer Placeholder */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-200 mt-20">
        &copy; {new Date().getFullYear()} Members Nutrition. All rights reserved.
      </footer>
      
    </div>
  );
};

export default MainLayout;