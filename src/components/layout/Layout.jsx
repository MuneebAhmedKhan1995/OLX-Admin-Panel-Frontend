import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Notification from '../common/Notification';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <Notification />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Header from './Header'; // Agar admin navbar alag hai
// import UserNavbar from '../../pages/Navbar'; // Home page ke liye alag navbar

// const Layout = ({ children }) => {
//   const location = useLocation();
  
//   // Check if current route is home page
//   const isHomePage = location.pathname === '/';

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Home page pe UserNavbar show karo, baaki pages pe AdminNavbar */}
//       {isHomePage ? <UserNavbar /> : <Header  />}
      
//       <main className={isHomePage ? '' : 'pt-16'}>
//         {children}
//       </main>
//     </div>
//   );
// };

// export default Layout;