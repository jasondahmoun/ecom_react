import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NotFound from '../pages/NotFound';
import CartPage from '../pages/CartPage';
import LoginAdmin from '../pages/LoginAdmin';
import LoginUser from '../pages/LoginUser';
import ProductDetail from '../pages/ProductDetail';
import ProductList from '../pages/ProductList';

export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginUser />} />
      <Route path="/admin-login" element={<LoginAdmin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
