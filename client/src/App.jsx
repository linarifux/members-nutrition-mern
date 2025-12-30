import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // <--- Import Toast Container
import 'react-toastify/dist/ReactToastify.css'; // <--- Import Toast CSS

// Layouts
import MainLayout from './layouts/MainLayout';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
// import CartPage from './pages/CartPage'; // If you have a separate cart page (optional)
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

// Admin Components & Pages
import AdminRoute from './components/shared/AdminRoute';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import ProductCreatePage from './pages/admin/ProductCreatePage'; // <--- Import Create Page
import NotFoundPage from './pages/NotFoundPage'; // <--- Import

function App() {
  return (
    <BrowserRouter>
      {/* ToastContainer needs to be here (top level) so toasts can 
         pop up on top of any page. 
      */}
      <ToastContainer position="bottom-right" autoClose={3000} />
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Protected Routes (Logged In Users) */}
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="placeorder" element={<PlaceOrderPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="productlist" element={<ProductListPage />} />
            <Route path="product/create" element={<ProductCreatePage />} /> {/* <--- New Route */}
            <Route path="product/:id/edit" element={<ProductEditPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;