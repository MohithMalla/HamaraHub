import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Menu, X, Home, Clock, 
  CircleDot, Inbox, Heart, Settings, 
  Moon, Sun, Star, GitBranch, Share2, 
  MoreHorizontal, Plus
} from 'lucide-react';


// --- COMPONENTS ---

// 1. Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar ,isDark}) => {
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
  
  {isDark ? (
    <img 
      src="/image.png" 
      alt="HamaraHub" 
       
    />
  ) : (
    <img 
      src="/logo.png" 
      alt="HamaraHub" 
       
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

// 2. Navbar Component
const Navbar = ({ toggleSidebar, toggleTheme, isDark }) => {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-10 h-16 
      bg-white dark:bg-[#0d1117] border-b border-gray-200 dark:border-gray-800 
      px-4 sm:px-8 flex items-center justify-between transition-colors duration-300">
      
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2 text-gray-600 dark:text-gray-400" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center w-full max-w-md bg-gray-100 dark:bg-[#010409] border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <Search size={18} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search for names..." 
            className="bg-transparent border-none outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Plus size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-500 dark:text-gray-400 hover:text-blue-600" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-white dark:border-[#0d1117]"></span>
        </div>

        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
          alt="User" 
          className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700 cursor-pointer bg-gray-100"
        />
      </div>
    </header>
  );
};

// 3. Activity Feed Item
const FeedItem = () => (
  <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-5 mb-6 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div className="flex gap-3">
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
          className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 dark:border-gray-700" 
          alt="" 
        />
        <div>
          <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
            HamaraHub <span className="text-gray-500 font-normal">submitted 2 months ago</span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Posted a new status about the core...</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
         <MoreHorizontal size={18} />
      </button>
    </div>
    
    {/* Code Block */}
    <div className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-4 font-mono text-xs sm:text-sm border border-gray-100 dark:border-gray-800 overflow-x-auto">
      <div className="text-gray-800 dark:text-gray-300 leading-relaxed">
        <span className="text-purple-600 dark:text-purple-400">const</span> ratio = {'{'}{'\n'}
        {'  '}mentary = {'{'}{'\n'}
        {'    '}system.out.<span className="text-blue-600 dark:text-blue-400">println</span>(<span className="text-green-600 dark:text-green-400">"FileID"</span>);{'\n'}
        {'  '}{'}'}{'\n'}
        {'}'}
      </div>
    </div>

    <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
      <button className="flex items-center gap-1.5 hover:text-blue-500"><Star size={16}/> 563</button>
      <button className="flex items-center gap-1.5 hover:text-blue-500"><GitBranch size={16}/> 133</button>
      <button className="flex items-center gap-1.5 hover:text-red-500"><Heart size={16}/> 2</button>
    </div>
  </div>
);

// 4. Right Column Widgets
const PopularRepos = () => {
  const repos = [
    { name: 'github', stars: 656, width: 'w-full' },
    { name: 'rothoris', stars: 255, width: 'w-3/4' },
    { name: 'conitest', stars: 201, width: 'w-1/2' },
    { name: 'repositshub', stars: 128, width: 'w-1/3' },
    { name: 'mbhamarahub', stars: 133, width: 'w-1/4' },
  ];

  return (
    <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-5 mb-6 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Popular Repositories</h3>
      <div className="space-y-4">
        {repos.map((repo, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
               <span className="font-medium text-gray-700 dark:text-gray-300">{repo.name}</span>
               <div className="flex items-center gap-1 text-xs text-gray-500">
                 <Star size={10} className="fill-current" /> {repo.stars}
               </div>
            </div>
            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
               <div className={`h-full bg-blue-600 rounded-full ${repo.width}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommitGraph = () => (
  <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Commit graph</h3>
    <div className="flex gap-1 h-24 items-end">
       {/* Fake bars for the graph */}
       {[...Array(12)].map((_, i) => {
          const heights = ['h-8', 'h-12', 'h-16', 'h-10', 'h-20', 'h-14', 'h-6', 'h-24', 'h-12', 'h-18', 'h-4', 'h-10'];
          return (
             <div key={i} className={`flex-1 ${heights[i]} bg-blue-100 dark:bg-blue-900/30 rounded-sm relative group`}>
                <div className="absolute bottom-0 left-0 right-0 bg-blue-500 dark:bg-blue-600 rounded-sm h-1/2 opacity-80"></div>
             </div>
          )
       })}
    </div>
    <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
       <span>Jan</span>
       <span>Apr</span>
       <span>May</span>
    </div>
  </div>
);

// --- MAIN APP ---

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false); 

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      
      <Navbar 
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
        toggleTheme={() => setIsDark(!isDark)} 
        isDark={isDark}
      />

      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setSidebarOpen(false)}
        isDark={isDark}
      />

      <main className="pt-24 lg:ml-64 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Center Feed (Takes 2 columns) */}
            <div className="lg:col-span-2">
               <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Activity</h1>
               <FeedItem />
               <FeedItem />
               <FeedItem />
            </div>

            {/* Right Widgets (Takes 1 column) */}
            <div className="lg:col-span-1">
               <PopularRepos />
               <CommitGraph />
            </div>

         </div>
      </main>

    </div>
  );
}

export default App;