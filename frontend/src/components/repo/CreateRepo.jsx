// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { 
//   Home, Clock, CircleDot, Inbox, Heart, Settings, 
//   GitBranch, Search, Bell, Menu, X, Plus, Sun, Moon 
// } from "lucide-react";
// import { useTheme } from '../ThemeContext'; // Importing the theme hook
// import Sidebar from "../Sidebar"; 
// import Navbar from "../Navbar"; 

// const CreateRepo = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const { isDark } = useTheme();
  
//   // Form State
//   const [repoName, setRepoName] = useState("");
//   const [description, setDescription] = useState("");
//   const [visibility, setVisibility] = useState(true); 
  
//   const navigate = useNavigate();

//   // Handle Theme
//   useEffect(() => {
//     if (isDark) document.documentElement.classList.add('dark');
//     else document.documentElement.classList.remove('dark');
//   }, [isDark]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       alert("Please login first!");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:3002/repo/create", {
//         name: repoName,
//         description: description,
//         visibility: visibility,
//         owner: userId,
//         content: [], 
//         issues: []
//       });

//       console.log("Repo created successfully");
//       navigate("/"); 
//     } catch (err) {
//       console.error("Error creating repo:", err);
//       alert("Failed to create repository.");
//     }
//   };

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

//       {/* --- UPDATED MAIN SECTION --- */}
//       {/* lg:ml-64 -> Pushes content right for sidebar
//           min-h-screen -> Makes container full height
//           pt-16 -> Adds padding for top navbar
//           flex items-center justify-center -> CENTERS the card vertically & horizontally 
//       */}
//       <main className="lg:ml-64 min-h-screen pt-16 flex items-center justify-center px-4 pb-10">
        
//         {/* Added w-full max-w-3xl to ensure card width is correct */}
//         <div className="w-full max-w-3xl bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm">
          
//           <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
//             <h1 className="text-2xl font-bold">Create a new repository</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               A repository contains all project files, including the revision history.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Owner & Name */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Repository Name <span className="text-red-500">*</span></label>
//               <input 
//                 type="text" 
//                 value={repoName}
//                 onChange={(e) => setRepoName(e.target.value)}
//                 className="w-full bg-gray-50 dark:bg-[#161b22] border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 placeholder="my-awesome-project"
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Description <span className="text-gray-400 font-normal">(optional)</span></label>
//               <textarea 
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full bg-gray-50 dark:bg-[#161b22] border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
//                 placeholder="Short description of your project..."
//               />
//             </div>

//             {/* Visibility */}
//             <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
//               <div className="flex items-start gap-3 mb-4">
//                 <input 
//                   type="radio" 
//                   name="visibility" 
//                   id="public" 
//                   checked={visibility === true} 
//                   onChange={() => setVisibility(true)}
//                   className="mt-1"
//                 />
//                 <label htmlFor="public">
//                   <span className="block font-medium text-sm">Public</span>
//                   <span className="block text-xs text-gray-500">Anyone on the internet can see this repository. You choose who can commit.</span>
//                 </label>
//               </div>

//               <div className="flex items-start gap-3">
//                 <input 
//                   type="radio" 
//                   name="visibility" 
//                   id="private" 
//                   checked={visibility === false} 
//                   onChange={() => setVisibility(false)}
//                   className="mt-1"
//                 />
//                 <label htmlFor="private">
//                   <span className="block font-medium text-sm">Private</span>
//                   <span className="block text-xs text-gray-500">You choose who can see and commit to this repository.</span>
//                 </label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
//               <button 
//                 type="submit" 
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors text-sm"
//               >
//                 Create repository
//               </button>
//             </div>

//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CreateRepo;






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Home, Clock, CircleDot, Inbox, Heart, Settings, 
  GitBranch, Search, Bell, Menu, X, Plus, Sun, Moon 
} from "lucide-react";
import { useTheme } from '../ThemeContext'; // Importing the theme hook
import Sidebar from "../Sidebar"; 
import Navbar from "../Navbar"; 

const CreateRepo = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();
  
  // Form State
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true); 
  
  // ✅ NEW: Loading state for deployment
  const [isDeploying, setIsDeploying] = useState(false);

  const navigate = useNavigate();

  // Handle Theme
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first!");
      return;
    }

    // Start Loading
    setIsDeploying(true);
    console.log(repoName,description,visibility,userId)
    try {
      const response = await axios.post("http://localhost:3002/repo/create", {
        name: repoName,
        description: description,
        visibility: visibility,
        owner: userId,
        content: [], 
        issues: []
      });

      console.log("Repo created successfully");

      // ✅ SUCCESS ALERT with Live Link
      if(response.data.deploymentUrl) {
        console.log("Deployment URL:", response.data.deploymentUrl);
        alert(`🚀 Repository Created Successfully!\n\nYour Website is LIVE at:\n${response.data.deploymentUrl}`);
      }

      navigate("/"); 
    } catch (err) {
      console.error("Error creating repo:", err);
      alert("Failed to create repository.");
    } finally {
      // Stop Loading
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar 
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
        toggleTheme={() => setIsDark(!isDark)} 
        isDark={isDark}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setSidebarOpen(false)} 
      />

      {/* --- UPDATED MAIN SECTION --- */}
      <main className="lg:ml-64 min-h-screen pt-16 flex items-center justify-center px-4 pb-10">
        
        {/* Added w-full max-w-3xl to ensure card width is correct */}
        <div className="w-full max-w-3xl bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm">
          
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
            <h1 className="text-2xl font-bold">Create a new repository</h1>
            <p className="text-sm text-gray-500 mt-1">
              A repository contains all project files, including the revision history.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Owner & Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Repository Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#161b22] border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="my-awesome-project"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#161b22] border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                placeholder="Short description of your project..."
              />
            </div>

            {/* Visibility */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="flex items-start gap-3 mb-4">
                <input 
                  type="radio" 
                  name="visibility" 
                  id="public" 
                  checked={visibility === true} 
                  onChange={() => setVisibility(true)}
                  className="mt-1"
                />
                <label htmlFor="public">
                  <span className="block font-medium text-sm">Public</span>
                  <span className="block text-xs text-gray-500">Anyone on the internet can see this repository. You choose who can commit.</span>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input 
                  type="radio" 
                  name="visibility" 
                  id="private" 
                  checked={visibility === false} 
                  onChange={() => setVisibility(false)}
                  className="mt-1"
                />
                <label htmlFor="private">
                  <span className="block font-medium text-sm">Private</span>
                  <span className="block text-xs text-gray-500">You choose who can see and commit to this repository.</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <button 
                type="submit" 
                disabled={isDeploying} // Disable while loading
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors text-sm"
              >
                {isDeploying ? "Creating & Deploying..." : "Create repository"}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateRepo;