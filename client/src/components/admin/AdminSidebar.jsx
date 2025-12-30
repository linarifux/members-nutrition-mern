import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/admin/productlist', icon: Package, label: 'Products' },
    { path: '/admin/orderlist', icon: ShoppingCart, label: 'Orders' },
    { path: '/admin/userlist', icon: Users, label: 'Users' },
  ];

  return (
    <aside className="w-full md:w-64 glass-panel rounded-xl p-4 md:h-[calc(100vh-120px)] md:sticky md:top-24 mb-8 md:mb-0 border border-white/10 bg-white/5">
      <div className="mb-6 px-4">
        <h2 className="text-xl font-bold text-white">Admin<span className="text-accent">Panel</span></h2>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20 font-bold' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;