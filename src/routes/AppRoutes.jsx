import { Routes, Route } from 'react-router-dom';
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AnimatedRoute>
            <Dashboard />
          </AnimatedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <AnimatedRoute>
            <UserList />
          </AnimatedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <AnimatedRoute>
            <ProductList />
          </AnimatedRoute>
        }
      />
      <Route
        path="/products/add"
        element={
          <AnimatedRoute>
            <AddProduct />
          </AnimatedRoute>
        }
      />
      <Route
        path="/products/edit/:id"
        element={
          <AnimatedRoute>
            <EditProduct />
          </AnimatedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <AnimatedRoute>
            <CategoryList />
          </AnimatedRoute>
        }
      />
      <Route
        path="/categories/add"
        element={
          <AnimatedRoute>
            <AddCategory />
          </AnimatedRoute>
        }
      />
      <Route
        path="/categories/edit/:id"
        element={
          <AnimatedRoute>
            <EditCategory />
          </AnimatedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <AnimatedRoute>
            <OrderList />
          </AnimatedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;