// import React, { useState, useEffect } from 'react';
// import { 
//   MapPin, Link as LinkIcon, Mail, Users, Star, 
//   GitBranch, Book
// } from 'lucide-react';
// import axios from 'axios';
// import Sidebar from "../Sidebar"; // Reuse your Sidebar
// import Navbar from "../Navbar";   // Reuse your Navbar
// import { useTheme } from '../ThemeContext'; // Importing the theme hook
// const Profile = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const { isDark } = useTheme();
//   const [userRepos, setUserRepos] = useState([]);
//   const [userProfile, setUserProfile] = useState({
//     username: "Loading...",
//     email: "...",
//     bio: "Full Stack Developer | Open Source Enthusiast" 
//   });

//   // Handle Theme
//   useEffect(() => {
//     if (isDark) document.documentElement.classList.add('dark');
//     else document.documentElement.classList.remove('dark');
//   }, [isDark]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
    
//     // 1. Fetch User Repositories
//     const fetchRepos = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3002/repo/user/${userId}`);
//         setUserRepos(response.data.repositories || []);
//       } catch (err) {
//         console.error("Error fetching repos", err);
//       }
//     };

//     // 2. Fetch User Details (Simulated here if you don't have a specific user endpoint yet)
//     // Ideally: axios.get(`http://localhost:3002/user/${userId}`)
//     const fetchProfile = async () => {
//         // For now, we simulate fetching based on what we have
//         const id = localStorage.getItem("userId");
//         if(id) {
//             setUserProfile(prev => ({...prev, username: "MohithSai Malla" })); // Replace with real fetch
//         }
//     }

//     if(userId) {
//         fetchRepos();
//         fetchProfile();
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 font-sans">
//       <Navbar 
//         toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
//         toggleTheme={() => setIsDark(!isDark)} 
//         isDark={isDark}
//       />
      
//       <Sidebar 
//         isOpen={isSidebarOpen} 
//         toggleSidebar={() => setSidebarOpen(false)} 
//       />

//       <main className="pt-24 lg:ml-64 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
//           {/* LEFT COLUMN: User Info */}
//           <div className="md:col-span-1">
//             <div className="relative">
//                 <img 
//                     src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
//                     alt="Profile" 
//                     className="w-64 h-64 rounded-full border border-gray-200 dark:border-gray-800 bg-white mb-4"
//                 />
//                 <h1 className="text-2xl font-bold">{userProfile.username}</h1>
//                 <p className="text-gray-500 text-lg mb-4">{userProfile.username.toLowerCase().replace(" ", "")}</p>
                
//                 <p className="text-sm mb-6">{userProfile.bio}</p>
                
//                 <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-[#21262d] dark:hover:bg-[#30363d] dark:border-gray-600 border border-gray-300 rounded-md py-1.5 text-sm font-medium mb-6 transition-colors">
//                     Edit profile
//                 </button>

//                 <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//                     <div className="flex items-center gap-2"><Users size={16}/> <span className="font-bold text-black dark:text-white">12</span> followers · <span className="font-bold text-black dark:text-white">5</span> following</div>
//                     <div className="flex items-center gap-2"><MapPin size={16}/> India</div>
//                     <div className="flex items-center gap-2"><Mail size={16}/> {userProfile.email}</div>
//                     <div className="flex items-center gap-2"><LinkIcon size={16}/> <a href="#" className="hover:text-blue-500 hover:underline">mallamohith-portfolio.app</a></div>
//                 </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Content */}
//           <div className="md:col-span-3">
             
//              {/* Profile Navigation Tabs */}
//              <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto">
//                  <button className="px-4 py-2 border-b-2 border-orange-500 font-medium text-sm flex items-center gap-2">
//                     <Book size={16}/> Overview
//                  </button>
//                  <button className="px-4 py-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
//                     <GitBranch size={16}/> Repositories <span className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 text-xs">{userRepos.length}</span>
//                  </button>
//                  <button className="px-4 py-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
//                     <Star size={16}/> Stars
//                  </button>
//              </div>

//              {/* Pinned / Popular Repos */}
//              <h2 className="text-sm font-bold mb-3">Popular repositories</h2>
//              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//                  {userRepos.slice(0, 6).map((repo) => (
//                     <div key={repo._id} className="border border-gray-200 dark:border-gray-800 rounded-md p-4 bg-white dark:bg-[#0d1117] flex flex-col justify-between">
//                         <div>
//                             <div className="flex items-center justify-between mb-2">
//                                 <a href="#" className="font-bold text-blue-500 hover:underline">{repo.name}</a>
//                                 <span className="text-xs border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5 text-gray-500">{repo.visibility ? 'Public' : 'Private'}</span>
//                             </div>
//                             <p className="text-xs text-gray-500 mb-4 line-clamp-2">
//                                 {repo.description || "No description provided."}
//                             </p>
//                         </div>
//                         <div className="flex items-center gap-4 text-xs text-gray-500">
//                              <div className="flex items-center gap-1">
//                                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span> JavaScript
//                              </div>
//                              <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
//                                  <Star size={14}/> {repo.stars || 0}
//                              </div>
//                              <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
//                                  <GitBranch size={14}/> 0
//                              </div>
//                         </div>
//                     </div>
//                  ))}
                 
//                  {userRepos.length === 0 && (
//                      <div className="col-span-2 text-center py-10 border border-dashed border-gray-300 rounded-md">
//                          <p className="text-gray-500">You don't have any repositories yet.</p>
//                      </div>
//                  )}
//              </div>

//              {/* Contribution Graph (Heatmap Placeholder) */}
//              <h2 className="text-sm font-bold mb-3">484 contributions in the last year</h2>
//              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-[#0d1117] mb-6 overflow-hidden">
//                 {/* Visual Fake Heatmap for UI */}
//                 <div className="flex gap-1">
//                     {[...Array(52)].map((_, i) => (
//                         <div key={i} className="flex flex-col gap-1">
//                             {[...Array(7)].map((_, j) => {
//                                 const opacity = Math.random() > 0.7 ? "bg-blue-500" : "bg-gray-100 dark:bg-gray-800";
//                                 return <div key={j} className={`w-3 h-3 rounded-sm ${opacity}`}></div>
//                             })}
//                         </div>
//                     ))}
//                 </div>
//              </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Profile;








// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; 
// import { 
//   MapPin, Link as LinkIcon, Mail, Users, Star, 
//   GitBranch, Book, Search
// } from 'lucide-react';
// import axios from 'axios';
// import Sidebar from "../Sidebar"; 
// import Navbar from "../Navbar";   
// import { useTheme } from '../ThemeContext'; 

// const Profile = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const { isDark } = useTheme();
  
//   // Tab State: 'overview' | 'repositories' | 'stars'
//   const [activeTab, setActiveTab] = useState("overview"); 
  
//   const [userRepos, setUserRepos] = useState([]);
//   const [userProfile, setUserProfile] = useState({
//     username: "Loading...",
//     email: "...",
//     bio: "Full Stack Developer | Open Source Enthusiast" 
//   });

//   // Handle Theme
//   useEffect(() => {
//     if (isDark) document.documentElement.classList.add('dark');
//     else document.documentElement.classList.remove('dark');
//   }, [isDark]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
    
//     // 1. Fetch Repos
//     const fetchRepos = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3002/repo/user/${userId}`);
//         setUserRepos(response.data.repositories || []);
//       } catch (err) {
//         console.error("Error fetching repos", err);
//       }
//     };

//     // 2. Fetch Profile Info
//     const fetchProfile = async () => {
//         const id = localStorage.getItem("userId");
//         if(id) {
//             setUserProfile(prev => ({...prev, username: "MohithSai Malla" })); 
//         }
//     }

//     if(userId) {
//         fetchRepos();
//         fetchProfile();
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
//       <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

//       <main className="pt-24 lg:ml-64 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
//           {/* --- LEFT COLUMN: User Info --- */}
//           <div className="md:col-span-1">
//             <div className="relative">
//                 <img 
//                     src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
//                     alt="Profile" 
//                     className="w-64 h-64 rounded-full border border-gray-200 dark:border-gray-800 bg-white mb-4 shadow-sm"
//                 />
//                 <h1 className="text-2xl font-bold">{userProfile.username}</h1>
//                 <p className="text-gray-500 text-lg mb-4">{userProfile.username.toLowerCase().replace(" ", "")}</p>
//                 <p className="text-sm mb-6">{userProfile.bio}</p>
                
//                 <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-[#21262d] dark:hover:bg-[#30363d] dark:border-gray-600 border border-gray-300 rounded-md py-1.5 text-sm font-medium mb-6 transition-colors">
//                     Edit profile
//                 </button>

//                 <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//                     <div className="flex items-center gap-2"><Users size={16}/> <span className="font-bold text-black dark:text-white">12</span> followers · <span className="font-bold text-black dark:text-white">5</span> following</div>
//                     <div className="flex items-center gap-2"><MapPin size={16}/> India</div>
//                     <div className="flex items-center gap-2"><Mail size={16}/> {userProfile.email}</div>
//                     <div className="flex items-center gap-2"><LinkIcon size={16}/> <a href="#" className="hover:text-blue-500 hover:underline">mallamohith-portfolio.app</a></div>
//                 </div>
//             </div>
//           </div>

//           {/* --- RIGHT COLUMN: Content --- */}
//           <div className="md:col-span-3">
             
//              {/* DYNAMIC TABS */}
//              <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto">
//                  <button 
//                     onClick={() => setActiveTab("overview")}
//                     className={`px-4 py-2 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
//                         activeTab === "overview" 
//                         ? "border-orange-500 text-gray-900 dark:text-white" 
//                         : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300"
//                     }`}
//                  >
//                     <Book size={16}/> Overview
//                  </button>
//                  <button 
//                     onClick={() => setActiveTab("repositories")}
//                     className={`px-4 py-2 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
//                         activeTab === "repositories" 
//                         ? "border-orange-500 text-gray-900 dark:text-white" 
//                         : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300"
//                     }`}
//                  >
//                     <GitBranch size={16}/> Repositories <span className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 text-xs">{userRepos.length}</span>
//                  </button>
//                  <button 
//                     onClick={() => setActiveTab("stars")}
//                     className={`px-4 py-2 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
//                         activeTab === "stars" 
//                         ? "border-orange-500 text-gray-900 dark:text-white" 
//                         : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300"
//                     }`}
//                  >
//                     <Star size={16}/> Stars
//                  </button>
//              </div>

//              {/* --- VIEW: OVERVIEW --- */}
//              {activeTab === "overview" && (
//                 <>
//                     <h2 className="text-sm font-bold mb-3">Popular repositories</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//                         {userRepos.slice(0, 4).map((repo) => (
//                             <div key={repo._id} className="border border-gray-200 dark:border-gray-800 rounded-md p-4 bg-white dark:bg-[#0d1117] flex flex-col justify-between shadow-sm">
//                                 <div className="flex items-center justify-between mb-2">
//                                     <Link to={`/repo/${repo._id}`} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
//                                         {repo.name}
//                                     </Link>
//                                     <span className="text-xs border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5 text-gray-500">
//                                         {repo.visibility ? 'Public' : 'Private'}
//                                     </span>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mb-4 line-clamp-2 min-h-[2.5em]">
//                                     {repo.description || "No description provided."}
//                                 </p>
//                                 <div className="flex items-center gap-4 text-xs text-gray-500">
//                                     <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> JavaScript</div>
//                                     <div className="flex items-center gap-1"><Star size={14}/> {repo.stars || 0}</div>
//                                 </div>
//                             </div>
//                         ))}
//                          {userRepos.length === 0 && (
//                             <div className="col-span-2 text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
//                                 No popular repositories yet.
//                             </div>
//                         )}
//                     </div>

//                     <h2 className="text-sm font-bold mb-3">484 contributions in the last year</h2>
//                     <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-[#0d1117] mb-6 overflow-hidden shadow-sm">
//                         <div className="w-full overflow-x-auto">
//                            {/* --- THE BLUE SHADES HEATMAP (High Contrast Fix) --- */}
//                            <div className="flex gap-1 min-w-[600px]">
//                                 {[...Array(52)].map((_, i) => (
//                                     <div key={i} className="flex flex-col gap-1">
//                                         {[...Array(7)].map((_, j) => {
//                                             const rand = Math.random();
//                                             // Default: Empty Cell (Distinct Gray for Light Mode, Dark for Dark Mode)
//                                             let color = "bg-gray-200 dark:bg-[#161b22]"; 

//                                             // Active Cells: Vivid Blue
//                                             if (rand > 0.9) color = "bg-[#216e39] dark:bg-[#39d353]";       // Darkest/Brightest Green (GitHub Style) or Blue
//                                             // Let's stick to the BLUE theme you requested:
//                                             if (rand > 0.9) color = "bg-blue-700 dark:bg-blue-500";
//                                             else if (rand > 0.8) color = "bg-blue-500 dark:bg-blue-700";
//                                             else if (rand > 0.7) color = "bg-blue-300 dark:bg-blue-900";

//                                             return <div key={j} className={`w-3 h-3 rounded-sm ${color}`}></div>
//                                         })}
//                                     </div>
//                                 ))}
//                            </div>
//                         </div>
//                     </div>
//                 </>
//              )}

//              {/* --- VIEW: REPOSITORIES --- */}
//              {activeTab === "repositories" && (
//                 <div className="space-y-4">
//                     <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-800 pb-4">
//                         <div className="relative flex-1">
//                             <input type="text" placeholder="Find a repository..." className="w-full bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 text-sm pl-8 focus:ring-2 focus:ring-blue-500 outline-none" />
//                             <Search className="absolute left-2.5 top-2 text-gray-500" size={14}/>
//                         </div>
//                         <Link to="/create" className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-bold flex items-center gap-2 transition-colors">
//                              New
//                         </Link>
//                     </div>

//                     {userRepos.map((repo) => (
//                         <div key={repo._id} className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-4 flex justify-between items-start">
//                             <div>
//                                 <div className="flex items-center gap-2 mb-1">
//                                     <Link to={`/repo/${repo._id}`} className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
//                                         {repo.name}
//                                     </Link>
//                                     <span className="text-xs border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5 text-gray-500">
//                                         {repo.visibility ? 'Public' : 'Private'}
//                                     </span>
//                                 </div>
//                                 <p className="text-sm text-gray-500 mb-4 max-w-lg">
//                                     {repo.description || "No description provided."}
//                                 </p>
//                                 <div className="flex items-center gap-4 text-xs text-gray-500">
//                                     <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> JavaScript</div>
//                                     <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer"><Star size={14}/> {repo.stars || 0}</div>
//                                     <div>Updated {repo.updatedAt ? new Date(repo.updatedAt).toLocaleDateString() : 'Recently'}</div>
//                                 </div>
//                             </div>
//                             <div className="hidden sm:block">
//                                 <button className="bg-gray-100 dark:bg-[#21262d] border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-xs font-medium flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-[#30363d] transition-colors">
//                                     <Star size={14}/> Star
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
                    
//                     {userRepos.length === 0 && (
//                         <div className="text-center py-10">
//                             <p className="text-gray-500">You don't have any repositories yet.</p>
//                         </div>
//                     )}
//                 </div>
//              )}

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Profile;





import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { MapPin, Link as LinkIcon, Mail, Users, Star, GitBranch, Book, Search, Edit2 } from 'lucide-react';
import axios from 'axios';
import Sidebar from "../Sidebar"; 
import Navbar from "../Navbar";  
import { useTheme } from '../ThemeContext'; 
import EditProfileModal from './EditProfileModal'; // We will create this

const Profile = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();
  
  const [activeTab, setActiveTab] = useState("overview"); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [userRepos, setUserRepos] = useState([]);
  const [userProfile, setUserProfile] = useState({
    username: "Loading...",
    email: "...",
    bio: "",
    followers: 0,
    following: 0
  });

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const fetchProfileData = async () => {
    const userId = localStorage.getItem("userId");
    if(!userId) return;

    try {
      // Fetch Repos
      const repoRes = await axios.get(`http://localhost:3002/repo/user/${userId}`);
      setUserRepos(repoRes.data.repositories || []);
      
      // Fetch User Profile
      const profileRes = await axios.get(`http://localhost:3002/userProfile/${userId}`);
      setUserProfile({
        username: profileRes.data.username || "Unknown Developer",
        email: profileRes.data.email || "No email provided",
        bio: profileRes.data.bio || "Full Stack Developer | Open Source Enthusiast",
        followers: profileRes.data.followers?.length || 0,
        following: profileRes.data.following?.length || 0
      });
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditProfileModal 
          currentProfile={userProfile} 
          onClose={() => setIsEditModalOpen(false)} 
          onSuccess={fetchProfileData} 
        />
      )}

      <main className="pt-24 lg:ml-64 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* --- LEFT COLUMN: User Info --- */}
          <div className="md:col-span-1">
            <div className="relative">
                <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.username}`} 
                    alt="Profile" 
                    className="w-64 h-64 rounded-full border border-gray-200 dark:border-gray-800 bg-white mb-4 shadow-sm"
                />
                <h1 className="text-2xl font-bold">{userProfile.username}</h1>
                <p className="text-gray-500 text-lg mb-4">@{userProfile.username.toLowerCase().replace(/\s+/g, "")}</p>
                <p className="text-sm mb-6">{userProfile.bio}</p>
                
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-[#21262d] dark:hover:bg-[#30363d] dark:border-gray-600 border border-gray-300 rounded-md py-1.5 text-sm font-medium mb-6 transition-colors flex justify-center items-center gap-2"
                >
                    <Edit2 size={14}/> Edit profile
                </button>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2"><Users size={16}/> <span className="font-bold text-black dark:text-white">{userProfile.followers}</span> followers · <span className="font-bold text-black dark:text-white">{userProfile.following}</span> following</div>
                    <div className="flex items-center gap-2"><MapPin size={16}/> HamaraHub Universe</div>
                    <div className="flex items-center gap-2"><Mail size={16}/> {userProfile.email}</div>
                </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Content --- */}
          <div className="md:col-span-3">
             <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto">
                 <button 
                    onClick={() => setActiveTab("overview")}
                    className={`px-4 py-2 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${activeTab === "overview" ? "border-orange-500 text-gray-900 dark:text-white" : "border-transparent text-gray-500 hover:border-gray-300"}`}
                 >
                    <Book size={16}/> Overview
                 </button>
                 <button 
                    onClick={() => setActiveTab("repositories")}
                    className={`px-4 py-2 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${activeTab === "repositories" ? "border-orange-500 text-gray-900 dark:text-white" : "border-transparent text-gray-500 hover:border-gray-300"}`}
                 >
                    <GitBranch size={16}/> Repositories <span className="bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 text-xs">{userRepos.length}</span>
                 </button>
             </div>

             {/* OVERVIEW TAB */}
             {activeTab === "overview" && (
                <>
                    <h2 className="text-sm font-bold mb-3">Popular repositories</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {userRepos.slice(0, 4).map((repo) => (
                            <div key={repo._id} className="border border-gray-200 dark:border-gray-800 rounded-md p-4 bg-white dark:bg-[#0d1117] flex flex-col justify-between shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <Link to={`/repo/${repo._id}`} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                                        {repo.name}
                                    </Link>
                                    <span className="text-xs border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5 text-gray-500">
                                        {repo.visibility ? 'Public' : 'Private'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-4 line-clamp-2 min-h-[2.5em]">{repo.description || "No description provided."}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> Code</div>
                                    <div className="flex items-center gap-1"><Star size={14}/> {repo.stars || 0}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
             )}

             {/* REPOSITORIES TAB */}
             {activeTab === "repositories" && (
                <div className="space-y-4">
                    {userRepos.map((repo) => (
                        <div key={repo._id} className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-4 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Link to={`/repo/${repo._id}`} className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline">{repo.name}</Link>
                                    <span className="text-xs border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5 text-gray-500">{repo.visibility ? 'Public' : 'Private'}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{repo.description || "No description provided."}</p>
                            </div>
                        </div>
                    ))}
                    {userRepos.length === 0 && <p className="text-gray-500 py-10">No repositories yet.</p>}
                </div>
             )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;