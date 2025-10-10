import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home'; // Home page import karo
import Dashboard from '../pages/Dashboard';
import UserList from '../pages/Users/UserList';
import ProductList from '../pages/Products/ProductList';
import AddProduct from '../pages/Products/AddProduct';
import EditProduct from '../pages/Products/EditProduct';
import CategoryList from '../pages/Categories/CategoryList';
import AddCategory from '../pages/Categories/AddCategory';
import EditCategory from '../pages/Categories/EditCategory';
import OrderList from '../pages/Orders/OrderList';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import { ProtectedRoute } from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home page as default route */}
      <Route path='/dashboard'
        element={
          <ProtectedRoute>
            <AnimatedRoute>
              <Dashboard />
            </AnimatedRoute>
          </ProtectedRoute>
        } />
      <Route
        path="/"
        element={
          <AnimatedRoute>
            <Home />
          </AnimatedRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <AnimatedRoute>
            <Registration />
          </AnimatedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AnimatedRoute>
            <Login />
          </AnimatedRoute>
        }
      />
      
      <Route
        path="/users"
        element={
          <ProtectedRoute>
          <AnimatedRoute>
            <UserList />
          </AnimatedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
          <AnimatedRoute>
            <ProductList />
          </AnimatedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/add"
        element={
          <ProtectedRoute>
          <AnimatedRoute>
            <AddProduct />
          </AnimatedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute>
          <AnimatedRoute>
            <EditProduct />
          </AnimatedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
          <AnimatedRoute>
            <CategoryList />
          </AnimatedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories/add"
        element={
          <ProtectedRoute>
          <AnimatedRoute>
            <AddCategory />
          </AnimatedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories/edit/:id"
        element={
          <ProtectedRoute>
          <AnimatedRoute>
            <EditCategory />
          </AnimatedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
          <AnimatedRoute>
            <OrderList />
          </AnimatedRoute>
          </ProtectedRoute>
        }
      />
      {/* Fallback route - agar koi route match na ho toh home page pe redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;