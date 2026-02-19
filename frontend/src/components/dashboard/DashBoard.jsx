// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { MoreHorizontal, Star, GitBranch, Heart } from 'lucide-react';

// // IMPORT NAVBAR AND SIDEBAR
// // Adjust the path "../" depending on where this file is located relative to components folder
// import Navbar from '../Navbar';
// import Sidebar from '../Sidebar';

// // --- LOCAL DASHBOARD WIDGETS ---

// // 1. Activity Feed Item
// const FeedItem = () => (
//   <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-5 mb-6 shadow-sm">
//     <div className="flex justify-between items-start mb-3">
//       <div className="flex gap-3">
//         <img 
//           src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
//           className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 dark:border-gray-700" 
//           alt="" 
//         />
//         <div>
//           <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
//             HamaraHub <span className="text-gray-500 font-normal">submitted 2 months ago</span>
//           </p>
//           <p className="text-xs text-gray-500 mt-0.5">Posted a new status about the core...</p>
//         </div>
//       </div>
//       <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
//           <MoreHorizontal size={18} />
//       </button>
//     </div>
    
//     <div className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-4 font-mono text-xs sm:text-sm border border-gray-100 dark:border-gray-800 overflow-x-auto">
//       <div className="text-gray-800 dark:text-gray-300 leading-relaxed">
//         <span className="text-purple-600 dark:text-purple-400">const</span> ratio = {'{'}{'\n'}
//         {'  '}mentary = {'{'}{'\n'}
//         {'    '}system.out.<span className="text-blue-600 dark:text-blue-400">println</span>(<span className="text-green-600 dark:text-green-400">"FileID"</span>);{'\n'}
//         {'  '}{'}'}{'\n'}
//         {'}'}
//       </div>
//     </div>

//     <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
//       <button className="flex items-center gap-1.5 hover:text-blue-500"><Star size={16}/> 563</button>
//       <button className="flex items-center gap-1.5 hover:text-blue-500"><GitBranch size={16}/> 133</button>
//       <button className="flex items-center gap-1.5 hover:text-red-500"><Heart size={16}/> 2</button>
//     </div>
//   </div>
// );

// // 2. Popular Repos Component
// const PopularRepos = () => {
//   const [repositories, setRepositories] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     const fetchRepositories = async () => {
//       if (!userId) return;
//       try {
//         const response = await axios.get(`http://localhost:3002/repo/user/${userId}`);
//         setRepositories(response.data.repositories || []);
//       } catch (error) {
//         console.error("Error fetching repositories:", error);
//       }
//     };

//     fetchRepositories();
//   }, []);

//   return (
//     <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-5 mb-6 shadow-sm">
//       <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Popular Repositories</h3>
//       <div className="space-y-4">
//         {repositories.length === 0 ? (
//            <p className="text-xs text-gray-500">No repositories found.</p>
//         ) : (
//           repositories.map((repo) => {
//             // Random width for visual effect since backend might not provide it
//             const randomWidth = Math.floor(Math.random() * 60) + 20 + "%";
            
//             return (
//               <div key={repo._id || repo.name}>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="font-medium text-gray-700 dark:text-gray-300">{repo.name}</span>
//                   <div className="flex items-center gap-1 text-xs text-gray-500">
//                     <Star size={10} className="fill-current" /> {repo.stars || 0}
//                   </div>
//                 </div>
//                 <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full bg-blue-600 rounded-full" 
//                     style={{ width: randomWidth }} 
//                   ></div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// // 3. Commit Graph Component
// const CommitGraph = () => (
//   <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
//     <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Commit graph</h3>
//     <div className="flex gap-1 h-24 items-end">
//        {/* Fake bars for the graph */}
//        {[...Array(12)].map((_, i) => {
//           const heights = ['h-8', 'h-12', 'h-16', 'h-10', 'h-20', 'h-14', 'h-6', 'h-24', 'h-12', 'h-18', 'h-4', 'h-10'];
//           return (
//              <div key={i} className={`flex-1 ${heights[i]} bg-blue-100 dark:bg-blue-900/30 rounded-sm relative group`}>
//                 <div className="absolute bottom-0 left-0 right-0 bg-blue-500 dark:bg-blue-600 rounded-sm h-1/2 opacity-80"></div>
//              </div>
//           )
//        })}
//     </div>
//     <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
//        <span>Jan</span>
//        <span>Apr</span>
//        <span>May</span>
//     </div>
//   </div>
// );

// // --- MAIN DASHBOARD EXPORT ---

// const Dashboard = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   // NOTE: isDark state is NO LONGER needed here because Navbar handles it via Context
//   const navigate = useNavigate();

//   // Redirect if not logged in (Optional protection)
//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//        // navigate("/login"); 
//     }
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      
//       {/* Pass only toggleSidebar to Navbar.
//          Theme toggling is now handled inside Navbar using Context.
//       */}
//       <Navbar 
//         toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
//       />

//       {/* Pass isOpen and toggleSidebar to Sidebar.
//          Theme (logo logic) is now handled inside Sidebar using Context.
//       */}
//       <Sidebar 
//         isOpen={isSidebarOpen} 
//         toggleSidebar={() => setSidebarOpen(false)}
//       />

//       <main className="pt-24 lg:ml-64 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
//          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
//            {/* Center Feed */}
//            <div className="lg:col-span-2">
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Activity</h1>
//               <FeedItem />
//               <FeedItem />
//               <FeedItem />
//            </div>

//            {/* Right Widgets */}
//            <div className="lg:col-span-1">
//               <PopularRepos />
//               <CommitGraph />
//            </div>

//          </div>
//       </main>

//     </div>
//   );
// };

// export default Dashboard;












import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { MoreHorizontal, Star, GitBranch, Heart, Activity } from 'lucide-react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
// ❌ REMOVED: import moment from 'moment'; (Not needed)

// --- 1. DYNAMIC FEED ITEM COMPONENT ---
const FeedItem = ({ repo }) => (
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
            You <span className="text-gray-500 font-normal">created a repository</span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
             {/* Uses standard JS Date instead of Moment */}
             {repo.createdAt ? new Date(repo.createdAt).toDateString() : "Just now"}
          </p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <MoreHorizontal size={18} />
      </button>
    </div>
    
    {/* Repo Card inside Feed */}
    <div className="bg-gray-50 dark:bg-[#161b22] rounded-lg p-4 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-2">
         <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-md">
            <GitBranch size={16}/>
         </div>
         <span className="font-bold text-gray-800 dark:text-gray-200">{repo.name}</span>
         <span className="text-xs border border-gray-300 dark:border-gray-600 px-2 py-0.5 rounded-full text-gray-500">
            {repo.visibility ? "Public" : "Private"}
         </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {repo.description || "No description provided."}
      </p>
      
      {/* Code Snippet Preview */}
      <div className="font-mono text-xs text-gray-500 bg-white dark:bg-[#0d1117] p-2 rounded border border-gray-200 dark:border-gray-700">
         <span className="text-blue-500">index.html</span> created.
      </div>
    </div>

    <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
      <Link to={`/repo/${repo._id}`} className="hover:text-blue-500 hover:underline">
         View Repository
      </Link>
    </div>
  </div>
);

// --- 2. POPULAR REPOS ---
const PopularRepos = ({ repositories }) => {
  return (
    <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-5 mb-6 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Popular Repositories</h3>
      <div className="space-y-4">
        {repositories.length === 0 ? (
           <p className="text-xs text-gray-500">No repositories found.</p>
        ) : (
          repositories.slice(0, 5).map((repo) => { // Limit to 5
            const randomWidth = Math.floor(Math.random() * 60) + 20 + "%";
            return (
              <Link to={`/repo/${repo._id}`} key={repo._id} className="block group">
                <div className="hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 -mx-2 rounded-md transition-colors cursor-pointer">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600">
                      {repo.name}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star size={10} className="fill-current" /> {repo.stars || 0}
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: randomWidth }}></div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

// ... CommitGraph (No changes) ...
const CommitGraph = () => (
    <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
       <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Commit graph</h3>
       <div className="flex gap-1 h-24 items-end">
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

// --- MAIN DASHBOARD ---
const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [repositories, setRepositories] = useState([]); // Store repos here
  const navigate = useNavigate();

  // Fetch Data on Load
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
       // navigate("/auth"); 
       return;
    }

    const fetchData = async () => {
      try {
        // Fetch user repositories
        const response = await axios.get(`http://localhost:3002/repo/user/${userId}`);
        
        // Backend returns { repositories: [...] }
        setRepositories(response.data.repositories || []);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      <main className="pt-24 lg:ml-64 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Center Feed: Show Recent Activity */}
           <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h1>
              
              {repositories.length === 0 ? (
                 <div className="text-center py-10 bg-white dark:bg-[#0d1117] rounded-xl border border-gray-200 dark:border-gray-800">
                    <Activity size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No activity yet. Create a repository to get started!</p>
                    <Link to="/create" className="text-blue-500 hover:underline mt-2 block">Create Repository</Link>
                 </div>
              ) : (
                 // Map through repositories to create "Feed Items"
                 // Sorting by newest first
                 repositories
                   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                   .map((repo) => (
                      <FeedItem key={repo._id} repo={repo} />
                   ))
              )}
           </div>

           {/* Right Widgets */}
           <div className="lg:col-span-1">
              <PopularRepos repositories={repositories} />
              <CommitGraph />
           </div>

         </div>
      </main>
    </div>
  );
};

export default Dashboard;