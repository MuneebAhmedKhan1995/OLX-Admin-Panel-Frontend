import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  UsersIcon, 
  ShoppingBagIcon, 
  TagIcon, 
  ReceiptRefundIcon 
} from '@heroicons/react/24/outline';


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const links = [
    { path: '/', name: 'Dashboard', icon: <HomeIcon className="h-6 w-6" /> },
  { path: '/users', name: 'Users', icon: <UsersIcon className="h-6 w-6" /> },
  { path: '/products', name: 'Products', icon: <ShoppingBagIcon className="h-6 w-6" /> },
  { path: '/categories', name: 'Categories', icon: <TagIcon className="h-6 w-6" /> },
  { path: '/orders', name: 'Orders', icon: <ReceiptRefundIcon className="h-6 w-6" /> }
  ];

  return (
    <motion.div
      initial={{ width: isOpen ? '250px' : '80px' }}
      animate={{ width: isOpen ? '250px' : '80px' }}
      transition={{ duration: 0.3 }}
      className={`bg-indigo-800 text-white flex flex-col ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between">
        {isOpen && (
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
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
                  `flex items-center p-3 ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-600'} rounded-lg transition-colors`
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
    </motion.div>
  );
};

export default Sidebar;