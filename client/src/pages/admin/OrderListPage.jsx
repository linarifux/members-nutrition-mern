import { useGetOrdersQuery } from '../../redux/slices/ordersApiSlice';
import { Link } from 'react-router-dom';
import { Loader2, Eye, X } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <AdminSidebar />

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-white mb-8">Order Management</h1>

        {isLoading ? (
          <Loader2 className="animate-spin text-accent mx-auto" />
        ) : error ? (
          <div className="text-red-500">{error?.data?.message || error.error}</div>
        ) : (
          <div className="glass-panel rounded-xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="p-4 font-bold text-xs uppercase text-gray-500">ID</th>
                    <th className="p-4 font-bold text-xs uppercase text-gray-500">User</th>
                    <th className="p-4 font-bold text-xs uppercase text-gray-500">Date</th>
                    <th className="p-4 font-bold text-xs uppercase text-gray-500">Total</th>
                    <th className="p-4 font-bold text-xs uppercase text-gray-500">Paid</th>
                    <th className="p-4 font-bold text-xs uppercase text-gray-500">Delivered</th>
                    <th className="p-4 font-bold text-xs uppercase text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-xs text-gray-500">{order._id.substring(order._id.length - 6)}</td>
                      <td className="p-4 text-white font-medium">{order.user && order.user.name}</td>
                      <td className="p-4 text-sm">{order.createdAt.substring(0, 10)}</td>
                      <td className="p-4 text-accent font-bold">${order.totalPrice}</td>
                      <td className="p-4">
                        {order.isPaid ? (
                          <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded">Paid</span>
                        ) : (
                          <span className="text-red-400 text-xs bg-red-400/10 px-2 py-1 rounded">Not Paid</span>
                        )}
                      </td>
                      <td className="p-4">
                        {order.isDelivered ? (
                          <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded">Delivered</span>
                        ) : (
                          <span className="text-yellow-400 text-xs bg-yellow-400/10 px-2 py-1 rounded">Pending</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Link to={`/order/${order._id}`} className="p-2 bg-white/10 rounded hover:bg-accent hover:text-white transition-colors inline-block">
                          <Eye size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListPage;