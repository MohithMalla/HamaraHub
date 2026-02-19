import React from 'react';
import { Home, Clock, CircleDot, Inbox, GitBranch, Heart, Settings, X } from 'lucide-react';
// IMPORT THEME HOOK
// Adjust the path "../context/ThemeContext" if your folder structure is different
import { useTheme } from './ThemeContext'; 

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Use the global theme state instead of props
  const { isDark } = useTheme();

  const menuItems = [
    { name: 'Dashboard', icon: <Home size={18} />, active: true },
    { name: 'Events', icon: <Clock size={18} /> },
    { name: 'Issues', icon: <CircleDot size={18} /> },
    { name: 'Notifications', icon: <Inbox size={18} /> },
    { name: 'Concerns', icon: <GitBranch size={18} /> },
    { name: 'Likes', icon: <Heart size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 transition-transform duration-300 ease-in-out
        bg-gray-50 dark:bg-[#0d1117] border-r border-gray-200 dark:border-gray-800
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        <div className="flex items-center h-16 px-6 mb-2">
          {/* Logo Logic using Global Context */}
          {isDark ? (
            <img 
              src="/image.png" 
              alt="HamaraHub" 
              className="h-8 w-auto" // Added explicit height class for stability
            />
          ) : (
            <img 
              src="/logo.png" 
              alt="HamaraHub" 
              className="h-8 w-auto"
            />
          )}

          <button className="ml-auto lg:hidden" onClick={toggleSidebar}>
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <nav className="px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium
                ${item.active 
                  ? 'bg-white dark:bg-[#161b22] text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200 dark:ring-gray-700' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800/50'}
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;