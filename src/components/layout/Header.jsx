import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Header = ({ toggleSidebar }) => {
  const { notification } = useContext(AppContext);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800 focus:outline-none mr-4"
          >
          </button>
          <h2 className="text-xl font-semibold text-gray-2000">Admin Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <span className="ml-2 text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;