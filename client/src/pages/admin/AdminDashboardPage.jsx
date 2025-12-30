import AdminSidebar from '../../components/admin/AdminSidebar';
import { useGetOrdersQuery } from '../../redux/slices/ordersApiSlice';
import { useGetProductsQuery } from '../../redux/slices/productsApiSlice';
import { Loader2, DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboardPage = () => {
  const { data: orders, isLoading: loadingOrders } = useGetOrdersQuery();
  const { data: products, isLoading: loadingProducts } = useGetProductsQuery();

  if (loadingOrders || loadingProducts) return <Loader2 className="animate-spin text-accent mx-auto mt-20" size={40} />;

  // --- Calculate Stats ---
  const totalRevenue = orders?.reduce((acc, order) => acc + order.totalPrice, 0) || 0;
  const totalOrders = orders?.length || 0;
  const totalProducts = products?.length || 0;

  // --- Prepare Chart Data (Last 5 Orders for simplicity, or map by date) ---
  // A real app would aggregate this on the backend
  const chartData = orders?.map(order => ({
    date: order.createdAt.substring(0, 10),
    amount: order.totalPrice
  })).slice(-10) || []; // Last 10 orders

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        
        {/* Header */}
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                title="Total Revenue" 
                value={`$${totalRevenue.toFixed(2)}`} 
                icon={DollarSign} 
                color="text-green-400" 
                bg="bg-green-400/10"
            />
            <StatCard 
                title="Total Orders" 
                value={totalOrders} 
                icon={ShoppingBag} 
                color="text-accent" 
                bg="bg-accent/10"
            />
            <StatCard 
                title="Active Products" 
                value={totalProducts} 
                icon={Package} 
                color="text-blue-400" 
                bg="bg-blue-400/10"
            />
        </div>

        {/* Analytics Chart */}
        <div className="glass-panel p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-accent"/> Sales Trend
            </h3>
            <div className="h-75w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" stroke="#666" tick={{fill: '#999'}} />
                        <YAxis stroke="#666" tick={{fill: '#999'}} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={3} dot={{r: 4, fill: '#f97316'}} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

      </div>
    </div>
  );
};

// Simple reusable card for stats
const StatCard = ({ title, value, icon: Icon, color, bg }) => (
    <div className="glass-panel p-6 rounded-xl border border-white/10 flex items-center justify-between">
        <div>
            <p className="text-gray-400 text-sm mb-1">{title}</p>
            <h4 className="text-2xl font-bold text-white">{value}</h4>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg} ${color}`}>
            <Icon size={24} />
        </div>
    </div>
);

export default AdminDashboardPage;