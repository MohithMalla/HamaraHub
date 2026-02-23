import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { MapPin, Link as LinkIcon, Mail, Users, Star, GitBranch, Book, Search, Edit2 } from 'lucide-react';
import axios from 'axios';
import Sidebar from "../Sidebar"; 
import Navbar from "../Navbar";  
import { useTheme } from '../ThemeContext'; 
import EditProfileModal from './EditProfileModal'; 

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
                    <div className="flex items-center gap-2">
                      <Users size={16}/> 
                      <span className="font-bold text-black dark:text-white">{userProfile.followers}</span> followers · 
                      <span className="font-bold text-black dark:text-white">{userProfile.following}</span> following
                    </div>
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

                    {/* CONTRIBUTION HEATMAP */}
                    <h2 className="text-sm font-bold mb-3">484 contributions in the last year</h2>
                    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-[#0d1117] mb-6 shadow-sm">
                        <div className="w-full overflow-x-auto custom-scrollbar">
                            <div className="flex gap-1 min-w-[max-content] p-1">
                                {[...Array(52)].map((_, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        {[...Array(7)].map((_, j) => {
                                            const rand = Math.random();
                                            let color = "bg-gray-100 dark:bg-[#161b22]"; 
                                            if (rand > 0.9) color = "bg-blue-600 dark:bg-blue-400";
                                            else if (rand > 0.8) color = "bg-blue-400 dark:bg-blue-600";
                                            else if (rand > 0.6) color = "bg-blue-200 dark:bg-blue-800";
                                            return <div key={j} className={`w-3 h-3 rounded-sm ${color}`}></div>
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 text-[10px] text-gray-500">
                            <span>Learn how we count contributions</span>
                            <div className="flex items-center gap-1">
                                <span>Less</span>
                                <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-[#161b22]"></div>
                                <div className="w-3 h-3 rounded-sm bg-blue-200 dark:bg-blue-800"></div>
                                <div className="w-3 h-3 rounded-sm bg-blue-400 dark:bg-blue-600"></div>
                                <div className="w-3 h-3 rounded-sm bg-blue-600 dark:bg-blue-400"></div>
                                <span>More</span>
                            </div>
                        </div>
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