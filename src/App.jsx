import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';

// LayoutWrapper component banate hain
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/'
  const isloginPage = location.pathname === '/login';
  const isRegistrationPage = location.pathname === '/registration'
  
  if (isHomePage || isloginPage || isRegistrationPage ) {
    return <>{children}</>;
  }
  
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <LayoutWrapper>
          <AppRoutes />
        </LayoutWrapper>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;