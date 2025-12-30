import { Link } from 'react-router-dom';
import { useGetUsersQuery, useDeleteUserMutation } from '../../redux/slices/usersApiSlice';
import { Loader2, Trash2, Edit, Check, X, ShieldAlert, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import AdminSidebar from '../../components/admin/AdminSidebar';

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const performDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success('User deleted successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = (id) => {
    toast(({ closeToast }) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-red-400 font-bold">
            <AlertTriangle size={18} />
            <span>Delete this user?</span>
        </div>
        <div className="flex gap-3 justify-end">
            <button 
                className="text-gray-400 text-sm hover:text-white font-medium px-2"
                onClick={closeToast}
            >
                Cancel
            </button>
            <button 
                className="bg-red-500/20 text-red-200 border border-red-500/50 px-3 py-1 rounded-md text-sm font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
                onClick={() => {
                    performDelete(id);
                    closeToast();
                }}
            >
                Delete
            </button>
        </div>
      </div>
    ), { autoClose: false, closeButton: false, position: "top-center" });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <AdminSidebar />

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-white mb-8">Users</h1>

        {isLoading ? (
          <Loader2 className="animate-spin text-accent mx-auto mt-10" />
        ) : error ? (
          <div className="text-red-400 glass-panel p-4 text-center">
            {error?.data?.message || error.error}
          </div>
        ) : (
          <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase">ID</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase">NAME</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase">EMAIL</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase">ROLE</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-xs text-gray-500">
                        {user._id.substring(user._id.length - 6)}...
                      </td>
                      <td className="p-4 text-gray-200 font-medium">{user.name}</td>
                      <td className="p-4">
                        <a href={`mailto:${user.email}`} className="text-accent hover:underline text-sm">
                          {user.email}
                        </a>
                      </td>
                      <td className="p-4">
                        {user.role === 'admin' ? (
                          <span className="inline-flex items-center gap-1 bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs font-bold border border-red-500/20">
                             <ShieldAlert size={12} /> Admin
                          </span>
                        ) : user.role === 'wholesale' ? (
                            <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs font-bold border border-blue-500/20">
                                Wholesale
                            </span>
                        ) : (
                            <span className="text-gray-500 text-xs">Retail</span>
                        )}
                      </td>
                      <td className="p-4 flex gap-2">
                        <Link 
                            to={`/admin/user/${user._id}/edit`}
                            className="p-2 bg-white/5 text-gray-300 rounded hover:bg-accent hover:text-white transition-all"
                        >
                            <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="p-2 bg-white/5 text-gray-400 rounded hover:bg-red-500/20 hover:text-red-400 transition-all"
                          disabled={loadingDelete}
                        >
                          {loadingDelete ? <Loader2 size={16} className="animate-spin"/> : <Trash2 size={16} />}
                        </button>
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

export default UserListPage;