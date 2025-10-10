import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { 
  HomeIcon, 
  UsersIcon, 
  ShoppingBagIcon, 
  TagIcon, 
  ReceiptRefundIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';
import { logoutUser } from '../../Redux/Actions/AuthActions';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const links = [
    { path: '/dashboard', name: 'Dashboard', icon: <HomeIcon className="h-6 w-6" /> },
    { path: '/users', name: 'Users', icon: <UsersIcon className="h-6 w-6" /> },
    { path: '/products', name: 'Products', icon: <ShoppingBagIcon className="h-6 w-6" /> },
    { path: '/categories', name: 'Categories', icon: <TagIcon className="h-6 w-6" /> },
    { path: '/orders', name: 'Orders', icon: <ReceiptRefundIcon className="h-6 w-6" /> }
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login'); // Still navigate even if there's an error
    }
  };

  return (
    <motion.div
      initial={{ width: isOpen ? '250px' : '80px' }}
      animate={{ width: isOpen ? '250px' : '80px' }}
      transition={{ duration: 0.3 }}
      className={`bg-indigo-800 text-white flex flex-col ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 h-screen relative`}
    >
      <div className="p-4 flex items-center justify-between">
        {isOpen && (
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none hover:bg-indigo-700 p-1 rounded"
        >
          {isOpen ? '←' : '→'}
        </button>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul>
          {links.map((link) => (
            <li key={link.path} className="mb-2">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center p-3 ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-600'} rounded-lg transition-colors mx-2`
                }
              >
                {link.icon}
                {isOpen && (
                  <motion.span
                    initial={{ opacity: isOpen ? 1 : 0 }}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3"
                  >
                    {link.name}
                  </motion.span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button - Bottom mein fixed position */}
      <div className="mt-auto p-4 border-t border-indigo-700">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-3 text-red-300 hover:bg-red-900 hover:text-white rounded-lg transition-colors mx-2 ${
            isOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
          {isOpen && (
            <motion.span
              initial={{ opacity: isOpen ? 1 : 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-3"
            >
              Logout
            </motion.span>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;