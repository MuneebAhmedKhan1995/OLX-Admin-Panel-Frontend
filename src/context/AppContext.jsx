// src/context/AppContext.jsx
import { createContext, useState, useEffect } from 'react';
import { getUsers, getProducts, getCategories, getOrders } from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, productsData, categoriesData, ordersData] = await Promise.all([
        getUsers(),
        getProducts(),
        getCategories(),
        getOrders()
      ]);
      setUsers(usersData);
      setProducts(productsData);
      setCategories(categoriesData);
      setOrders(ordersData);
    } catch (error) {
      showNotification('Failed to fetch data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addProduct = (product) => {
    setProducts([...products, product]);
    showNotification('Product added successfully', 'success');
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    showNotification('Product updated successfully', 'success');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showNotification('Product deleted successfully', 'success');
  };

  const addCategory = (category) => {
    setCategories([...categories, category]);
    showNotification('Category added successfully', 'success');
  };

  const updateCategory = (updatedCategory) => {
    setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    showNotification('Category updated successfully', 'success');
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    showNotification('Category deleted successfully', 'success');
  };

  const toggleUserBlock = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
    ));
    showNotification('User status updated', 'success');
  };

  return (
    <AppContext.Provider value={{
      users,
      products,
      categories,
      orders,
      loading,
      notification,
      showNotification,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      toggleUserBlock
    }}>
      {children}
    </AppContext.Provider>
  );
};