import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

// Layouts
import MainLayout from './layouts/MainLayout';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Components & Pages
import AdminRoute from './components/shared/AdminRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage'; // <--- Import Dashboard
import ProductListPage from './pages/admin/ProductListPage';
import OrderListPage from './pages/admin/OrderListPage';           // <--- Import Order List
import ProductEditPage from './pages/admin/ProductEditPage';
import ProductCreatePage from './pages/admin/ProductCreatePage';
import UserListPage from './pages/admin/UserListPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      {/* ToastContainer global configuration for Dark Mode */}
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        theme="dark" 
        toastClassName="glass-panel border border-white/10 text-gray-200"
      />
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="placeorder" element={<PlaceOrderPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="profile" element={<ProfilePage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboardPage />} /> {/* <--- New Route */}
            <Route path="productlist" element={<ProductListPage />} />
            <Route path="orderlist" element={<OrderListPage />} />      {/* <--- New Route */}
            <Route path="product/create" element={<ProductCreatePage />} />
            <Route path="product/:id/edit" element={<ProductEditPage />} />
            <Route path="userlist" element={<UserListPage />} /> {/* Add this line */}
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;