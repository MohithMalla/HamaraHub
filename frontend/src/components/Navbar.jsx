import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Plus, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext'; // <--- Import Hook

// Remove props like toggleTheme/isDark
const Navbar = ({ toggleSidebar }) => { 
  const { isDark, toggleTheme } = useTheme(); // <--- Use Hook

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-10 h-16 
      bg-white dark:bg-[#0d1117] border-b border-gray-200 dark:border-gray-800 
      px-4 sm:px-8 flex items-center justify-between transition-colors duration-300">
      
      {/* ... Left side search/menu code ... */}
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2 text-gray-600 dark:text-gray-400" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        {/* ... Search bar code ... */}
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link to="/create">
          <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Plus size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </Link>
        
        {/* Toggle Theme Button */}
        <button 
          onClick={toggleTheme} // Uses context function
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* ... Bell and Profile Image ... */}
        <div className="relative cursor-pointer">
           <Bell size={20} className="text-gray-500 dark:text-gray-400 hover:text-blue-600" />
           <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-white dark:border-[#0d1117]"></span>
        </div>
        <Link to="/profile">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700 cursor-pointer bg-gray-100"/>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;