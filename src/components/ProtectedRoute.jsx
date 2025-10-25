// ProtectedRoute.jsx - Ye shayad aisa dikh raha hoga
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://olx-admin-panel-backend.vercel.app/auth/me', {
          credentials: 'include', // cookies ke liye important hai
          method: "GET",
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Loading state - ye important hai
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Ya koi spinner
  }

  // Redirect agar authenticated nahi hai
  if (!isAuthenticated) {
    // return <Navigate to="/login" replace />;
  }

  return children;
};