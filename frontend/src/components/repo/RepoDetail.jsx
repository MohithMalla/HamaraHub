// // // import React, { useState, useEffect } from "react";
// // // import { useParams } from "react-router-dom";
// // // import axios from "axios";
// // // import { FileCode, Save, ExternalLink, RefreshCw } from "lucide-react";
// // // import Navbar from "../Navbar";
// // // import Sidebar from "../Sidebar";

// // // const RepoDetail = () => {
// // //   const { id } = useParams();
// // //   const [repo, setRepo] = useState(null);
// // //   const [activeFile, setActiveFile] = useState(null); 
// // //   const [code, setCode] = useState(""); 
// // //   const [isSidebarOpen, setSidebarOpen] = useState(false);
// // //   const [isSaving, setIsSaving] = useState(false);

// // //   // Fetch Repo
// // //   useEffect(() => {
// // //     const fetchRepo = async () => {
// // //       try {
// // //         const response = await axios.get(`http://localhost:3002/repo/${id}`);
// // //         setRepo(response.data);
        
// // //         // Auto-select first file
// // //         if (response.data.content && response.data.content.length > 0) {
// // //           setActiveFile(response.data.content[0]);
// // //           setCode(response.data.content[0].code);
// // //         }
// // //       } catch (err) {
// // //         console.error("Error fetching repo:", err);
// // //       }
// // //     };
// // //     fetchRepo();
// // //   }, [id]);

// // //   // Save & Deploy Logic
// // //   const handleSave = async () => {
// // //     if (!activeFile) return;
// // //     setIsSaving(true);

// // //     try {
// // //       await axios.put(`http://localhost:3002/repo/update/${id}`, {
// // //         content: {
// // //           fileName: activeFile.fileName,
// // //           code: code 
// // //         }
// // //       });
// // //       alert("✅ Changes Deployed Successfully!");
// // //     } catch (err) {
// // //       console.error("Error saving:", err);
// // //       alert("❌ Failed to deploy changes.");
// // //     } finally {
// // //       setIsSaving(false);
// // //     }
// // //   };

// // //   if (!repo) return <div className="text-center mt-20">Loading...</div>;

// // //   const liveUrl = `http://localhost:3002/repo/view/${repo._id}`;

// // //   return (
// // //     <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 font-sans">
// // //       <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
// // //       <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

// // //       <main className="lg:ml-64 pt-20 px-6 h-[calc(100vh-80px)]">
// // //         <div className="max-w-6xl mx-auto h-full flex flex-col">
          
// // //           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-300 dark:border-gray-700 pb-4 mb-4 gap-4">
// // //             <div>
// // //               <h1 className="text-2xl font-bold flex items-center gap-2">
// // //                 <span className="text-blue-600">{repo.name}</span>
// // //                 <span className="text-xs border border-gray-300 dark:border-gray-600 rounded-full px-2 py-0.5 text-gray-500">
// // //                   {repo.visibility ? "Public" : "Private"}
// // //                 </span>
// // //               </h1>
// // //               <p className="text-gray-500 text-sm">{repo.description}</p>
// // //             </div>
            
// // //             <div className="flex gap-3">
// // //                <a 
// // //                 href={liveUrl} 
// // //                 target="_blank" 
// // //                 rel="noopener noreferrer"
// // //                 className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
// // //               >
// // //                 <ExternalLink size={16} /> View Live
// // //               </a>
// // //               <button 
// // //                 onClick={handleSave}
// // //                 disabled={isSaving}
// // //                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-70"
// // //               >
// // //                 {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16} />} 
// // //                 {isSaving ? "Deploying..." : "Deploy Changes"}
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <div className="flex-1 flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-[#0d1117]">
            
// // //             <div className="w-48 sm:w-64 bg-gray-50 dark:bg-[#161b22] border-r border-gray-300 dark:border-gray-700 p-4">
// // //               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Files</h3>
// // //               <div className="space-y-1">
// // //                 {repo.content.map((file, idx) => (
// // //                   <button
// // //                     key={idx}
// // //                     onClick={() => { setActiveFile(file); setCode(file.code); }}
// // //                     className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
// // //                       activeFile?.fileName === file.fileName 
// // //                       ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium" 
// // //                       : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
// // //                     }`}
// // //                   >
// // //                     <FileCode size={16} />
// // //                     {file.fileName}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <div className="flex-1 flex flex-col">
// // //               <div className="bg-gray-100 dark:bg-[#1c2128] px-4 py-2 text-xs font-mono border-b border-gray-300 dark:border-gray-700 text-gray-500">
// // //                 {activeFile ? `Editing: ${activeFile.fileName}` : "Select a file"}
// // //               </div>
// // //               <textarea
// // //                 value={code}
// // //                 onChange={(e) => setCode(e.target.value)}
// // //                 className="flex-1 w-full p-4 font-mono text-sm bg-white dark:bg-[#0d1117] text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
// // //                 spellCheck="false"
// // //                 placeholder="// Type code here..."
// // //               />
// // //             </div>

// // //           </div>

// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default RepoDetail;







// // import React, { useState, useEffect, useCallback } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import { FileCode, Save, ExternalLink, RefreshCw, Folder, ChevronRight, ChevronDown, Plus } from "lucide-react";
// // import Navbar from "../Navbar";
// // import Sidebar from "../Sidebar";

// // // --- RECURSIVE FILE TREE COMPONENT ---
// // const FileTreeNode = ({ node, userId, repoName, onFileSelect, currentPath = "" }) => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   useEffect(() => {
// //     if (node.name === "root") setIsOpen(true);
// //   }, [node]);

// //   if (node.type === "folder" || node.children) {
// //     const isRoot = node.name === "root";
// //     return (
// //       <div className={`${isRoot ? "" : "pl-4"}`}>
// //         {!isRoot && (
// //           <button 
// //             onClick={() => setIsOpen(!isOpen)} 
// //             className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 py-1.5 w-full text-left"
// //           >
// //             {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
// //             <Folder size={14} className="text-blue-400" /> {node.name}
// //           </button>
// //         )}
// //         {(isOpen || isRoot) && node.children && node.children.map((child, idx) => (
// //           <FileTreeNode 
// //             key={idx} 
// //             node={child} 
// //             userId={userId} 
// //             repoName={repoName} 
// //             onFileSelect={onFileSelect}
// //             currentPath={isRoot ? child.name : `${currentPath}/${child.name}`}
// //           />
// //         ))}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="pl-6">
// //       <button
// //         onClick={() => onFileSelect(node, currentPath)}
// //         className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 py-1.5 w-full text-left transition-colors"
// //       >
// //         <FileCode size={14} className="text-gray-400" /> {node.name}
// //       </button>
// //     </div>
// //   );
// // };


// // const RepoDetail = () => {
// //   const { id } = useParams();
// //   const [repo, setRepo] = useState(null);
// //   const [fileTree, setFileTree] = useState(null);
// //   const [activeFile, setActiveFile] = useState(null); 
// //   const [code, setCode] = useState(""); 
// //   const [isSidebarOpen, setSidebarOpen] = useState(false);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [isLoadingFile, setIsLoadingFile] = useState(false);

// //   const currentUserId = localStorage.getItem("userId");

// //   // Fetch Tree wrapped in useCallback
// //   const fetchFileTree = useCallback(async (ownerId, repoName) => {
// //     console.log(`[FRONTEND DEBUG] fetchFileTree called with OwnerId: "${ownerId}", RepoName: "${repoName}"`);
    
// //     if (!ownerId || ownerId === "undefined") {
// //         console.error("[FRONTEND ERROR] Owner ID is undefined! Aborting tree fetch.");
// //         return;
// //     }

// //     try {
// //       const treeRes = await axios.get(`http://localhost:3002/repo/getrepo`, {
// //         params: { userId: ownerId, repo: repoName }
// //       });
// //       console.log("[FRONTEND DEBUG] Tree data received:", treeRes.data.tree);
// //       setFileTree(treeRes.data.tree);
// //     } catch (err) {
// //       console.error("[FRONTEND ERROR] fetching repo tree:", err);
// //       setFileTree({ name: "root", type: "folder", children: [] }); 
// //     }
// //   }, []);

// //   // Initial Load
// //   useEffect(() => {
// //     const loadRepoData = async () => {
// //       console.log(`[FRONTEND DEBUG] Loading data for Repo Document ID: ${id}`);
// //       try {
// //         const repoRes = await axios.get(`http://localhost:3002/repo/${id}`);
// //         console.log("[FRONTEND DEBUG] Repo Meta received from MongoDB:", repoRes.data);
// //         setRepo(repoRes.data);
        
// //         // SAFELY GET OWNER ID (Handles both populated objects and raw strings)
// //         let ownerId = currentUserId;
// //         if (repoRes.data.owner) {
// //              ownerId = typeof repoRes.data.owner === 'object' ? repoRes.data.owner._id : repoRes.data.owner;
// //         }
        
// //         console.log(`[FRONTEND DEBUG] Resolved Owner ID for S3 calls: ${ownerId}`);

// //         await fetchFileTree(ownerId, repoRes.data.name);
// //       } catch (err) {
// //         console.error("[FRONTEND ERROR] fetching repo details:", err);
// //       }
// //     };
// //     loadRepoData();
// //   }, [id, currentUserId, fetchFileTree]);

// //   // Handle clicking a file in the tree
// //   const handleFileSelect = async (fileNode, filePath) => {
// //     console.log(`[FRONTEND DEBUG] Selected file:`, fileNode);
// //     setActiveFile({ ...fileNode, path: filePath });
    
// //     if (fileNode.isNew) {
// //         console.log("[FRONTEND DEBUG] File is new, skipping S3 fetch.");
// //         return;
// //     }

// //     setIsLoadingFile(true);
// //     setCode("// Loading content from S3...");

// //     try {
// //       let ownerId = currentUserId;
// //       if (repo && repo.owner) {
// //           ownerId = typeof repo.owner === 'object' ? repo.owner._id : repo.owner;
// //       }

// //       console.log(`[FRONTEND DEBUG] Fetching blob hash ${fileNode.hash} for user ${ownerId}`);
// //       const res = await axios.get(`http://localhost:3002/repo/getfile/${ownerId}/${repo.name}`, {
// //         params: { hash: fileNode.hash }
// //       });
// //       console.log("[FRONTEND DEBUG] File content successfully loaded.");
// //       setCode(res.data);
// //     } catch (err) {
// //       console.error("[FRONTEND ERROR] Failed to load file content", err);
// //       setCode("// Error loading file. It might be empty or corrupted.");
// //     } finally {
// //       setIsLoadingFile(false);
// //     }
// //   };

// //   // Add File Logic
// //   const handleCreateNewFile = () => {
// //     const fileName = window.prompt("Enter new file name (e.g., index.html or src/App.jsx):");
// //     if (!fileName || fileName.trim() === "") return;

// //     console.log(`[FRONTEND DEBUG] Creating new file in UI: ${fileName}`);

// //     // Set as active file immediately so user can edit it
// //     setActiveFile({ 
// //       name: fileName.split('/').pop(), 
// //       path: fileName, 
// //       hash: 'new_file', 
// //       isNew: true 
// //     });
// //     setCode(`// New file: ${fileName}\n`);
// //   };

// //   // Save & Deploy Logic
// //   const handleSave = async () => {
// //     if (!activeFile) return;
// //     setIsSaving(true);
    
// //     const payload = {
// //         content: {
// //           fileName: activeFile.path,
// //           code: code 
// //         }
// //     };
    
// //     console.log(`[FRONTEND DEBUG] Sending Save Request to /repo/update/${id} with payload:`, payload);

// //     try {
// //       const res = await axios.put(`http://localhost:3002/repo/update/${id}`, payload);
// //       console.log(`[FRONTEND DEBUG] Save successful. Response:`, res.data);
      
// //       alert("✅ Changes Deployed Successfully!");
      
// //       // Reload the tree so the new file shows up in the sidebar
// //       let ownerId = currentUserId;
// //       if (repo && repo.owner) {
// //           ownerId = typeof repo.owner === 'object' ? repo.owner._id : repo.owner;
// //       }
// //       await fetchFileTree(ownerId, repo.name);

// //       // Mark the file as no longer new
// //       setActiveFile(prev => ({ ...prev, isNew: false }));

// //     } catch (err) {
// //       console.error("[FRONTEND ERROR] Error saving file:", err);
// //       alert("❌ Failed to deploy changes.");
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };

// //   if (!repo) return <div className="text-center mt-20 text-gray-500">Loading Repository...</div>;

// //   const liveUrl = `http://localhost:3002/repo/view/${repo._id}`;

// //   return (
// //     <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 font-sans">
// //       <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
// //       <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

// //       <main className="lg:ml-64 pt-20 px-6 h-[calc(100vh-80px)]">
// //         <div className="max-w-6xl mx-auto h-full flex flex-col">
          
// //           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-300 dark:border-gray-700 pb-4 mb-4 gap-4">
// //             <div>
// //               <h1 className="text-2xl font-bold flex items-center gap-2">
// //                 <span className="text-blue-600">{repo.name}</span>
// //                 <span className="text-xs border border-gray-300 dark:border-gray-600 rounded-full px-2 py-0.5 text-gray-500">
// //                   {repo.visibility ? "Public" : "Private"}
// //                 </span>
// //               </h1>
// //               <p className="text-gray-500 text-sm">{repo.description}</p>
// //             </div>
            
// //             <div className="flex gap-3">
// //                <a 
// //                 href={liveUrl} 
// //                 target="_blank" 
// //                 rel="noopener noreferrer"
// //                 className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
// //               >
// //                 <ExternalLink size={16} /> View Live
// //               </a>
// //               <button 
// //                 onClick={handleSave}
// //                 disabled={isSaving || !activeFile || isLoadingFile}
// //                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16} />} 
// //                 {isSaving ? "Deploying..." : "Deploy Changes"}
// //               </button>
// //             </div>
// //           </div>

// //           <div className="flex-1 flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-[#0d1117]">
            
// //             {/* FILE TREE SIDEBAR */}
// //             <div className="w-48 sm:w-64 bg-gray-50 dark:bg-[#161b22] border-r border-gray-300 dark:border-gray-700 p-4 overflow-y-auto">
              
// //               {/* Header with Add File Button */}
// //               <div className="flex justify-between items-center mb-4">
// //                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Files</h3>
// //                 <button 
// //                   onClick={handleCreateNewFile} 
// //                   className="p-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/50 dark:hover:text-blue-400 transition-colors"
// //                   title="Create New File"
// //                 >
// //                   <Plus size={14} />
// //                 </button>
// //               </div>

// //               <div className="space-y-1">
// //                 {fileTree && fileTree.children && fileTree.children.length > 0 ? (
// //                    <FileTreeNode 
// //                       node={fileTree} 
// //                       userId={repo.owner || currentUserId} 
// //                       repoName={repo.name} 
// //                       onFileSelect={handleFileSelect} 
// //                    />
// //                 ) : (
// //                    <div className="text-center mt-6">
// //                      <p className="text-xs text-gray-400 italic mb-3">No files found in tree.</p>
// //                      <button 
// //                        onClick={handleCreateNewFile}
// //                        className="text-xs text-blue-500 hover:underline"
// //                      >
// //                        + Create your first file
// //                      </button>
// //                    </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* EDITOR AREA */}
// //             <div className="flex-1 flex flex-col relative">
// //               <div className="bg-gray-100 dark:bg-[#1c2128] px-4 py-2 text-xs font-mono border-b border-gray-300 dark:border-gray-700 text-gray-500 flex justify-between">
// //                 <span>{activeFile ? `Editing: ${activeFile.path}` : "Select a file to edit"}</span>
// //                 {activeFile && !activeFile.isNew && <span>Hash: {activeFile.hash.substring(0, 7)}...</span>}
// //                 {activeFile && activeFile.isNew && <span className="text-blue-500">Unsaved New File</span>}
// //               </div>
// //               <textarea
// //                 value={code}
// //                 onChange={(e) => setCode(e.target.value)}
// //                 disabled={!activeFile || isLoadingFile}
// //                 className="flex-1 w-full p-4 font-mono text-sm bg-white dark:bg-[#0d1117] text-gray-800 dark:text-gray-200 resize-none focus:outline-none disabled:opacity-70"
// //                 spellCheck="false"
// //                 placeholder={!activeFile ? "Select a file from the left sidebar or create a new one to start coding..." : "// Type code here..."}
// //               />
// //             </div>

// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default RepoDetail;


// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { FileCode, Save, ExternalLink, RefreshCw, Plus } from "lucide-react";
// import Navbar from "../Navbar";
// import Sidebar from "../Sidebar";

// const RepoDetail = () => {
//   const { id } = useParams();
//   const [repo, setRepo] = useState(null);
//   const [activeFile, setActiveFile] = useState(null); 
//   const [code, setCode] = useState(""); 
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   // 1. Fetch Repo Data directly from MongoDB
//   const loadRepoData = async () => {
//     try {
//       const repoRes = await axios.get(`http://localhost:3002/repo/${id}`);
//       setRepo(repoRes.data);
      
//       // If there are files in MongoDB, auto-select the first one
//       if (repoRes.data.content && repoRes.data.content.length > 0 && !activeFile) {
//         handleFileSelect(repoRes.data.content[0]);
//       }
//     } catch (err) {
//       console.error("Error fetching repo details:", err);
//     }
//   };

//   useEffect(() => {
//     loadRepoData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   // 2. Handle clicking a file in the sidebar
//   const handleFileSelect = (file) => {
//     setActiveFile(file);
//     setCode(file.code || ""); // Get the code directly from the MongoDB object
//   };

//   // 3. Add New File Logic
//   const handleCreateNewFile = () => {
//     const fileName = window.prompt("Enter new file name (e.g., app.js or styles.css):");
//     if (!fileName || fileName.trim() === "") return;

//     const newFile = { 
//       fileName: fileName, 
//       code: `// New file: ${fileName}\n`,
//       isNew: true 
//     };

//     setActiveFile(newFile);
//     setCode(newFile.code);
//   };

//   // 4. Save & Deploy Logic (Saves back to MongoDB)
//   const handleSave = async () => {
//     if (!activeFile) return;
//     setIsSaving(true);

//     try {
//       await axios.put(`http://localhost:3002/repo/update/${id}`, {
//         content: {
//           fileName: activeFile.fileName, // Using fileName as the identifier
//           code: code 
//         }
//       });
      
//       alert("✅ Changes Deployed Successfully!");
      
//       // Reload the data from MongoDB to show the updated file list
//       await loadRepoData();
      
//       if (activeFile.isNew) {
//         setActiveFile(prev => ({ ...prev, isNew: false }));
//       }

//     } catch (err) {
//       console.error("Error saving:", err);
//       alert("❌ Failed to deploy changes.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (!repo) return <div className="text-center mt-20 text-gray-500">Loading Repository...</div>;

//   const liveUrl = `http://localhost:3002/repo/view/${repo._id}`;

//   return (
//     <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 font-sans">
//       <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

//       <main className="lg:ml-64 pt-20 px-6 h-[calc(100vh-80px)]">
//         <div className="max-w-6xl mx-auto h-full flex flex-col">
          
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-300 dark:border-gray-700 pb-4 mb-4 gap-4">
//             <div>
//               <h1 className="text-2xl font-bold flex items-center gap-2">
//                 <span className="text-blue-600">{repo.name}</span>
//                 <span className="text-xs border border-gray-300 dark:border-gray-600 rounded-full px-2 py-0.5 text-gray-500">
//                   {repo.visibility ? "Public" : "Private"}
//                 </span>
//               </h1>
//               <p className="text-gray-500 text-sm">{repo.description}</p>
//             </div>
            
//             <div className="flex gap-3">
//                <a 
//                 href={liveUrl} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
//               >
//                 <ExternalLink size={16} /> View Live
//               </a>
//               <button 
//                 onClick={handleSave}
//                 disabled={isSaving || !activeFile}
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16} />} 
//                 {isSaving ? "Deploying..." : "Deploy Changes"}
//               </button>
//             </div>
//           </div>

//           <div className="flex-1 flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-[#0d1117]">
            
//             {/* FILE SIDEBAR (Mapped from MongoDB) */}
//             <div className="w-48 sm:w-64 bg-gray-50 dark:bg-[#161b22] border-r border-gray-300 dark:border-gray-700 p-4 overflow-y-auto">
              
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Files</h3>
//                 <button 
//                   onClick={handleCreateNewFile} 
//                   className="p-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/50 dark:hover:text-blue-400 transition-colors"
//                   title="Create New File"
//                 >
//                   <Plus size={14} />
//                 </button>
//               </div>

//               <div className="space-y-1">
//                 {repo.content && repo.content.length > 0 ? (
//                    repo.content.map((file, idx) => (
//                      <button
//                        key={idx}
//                        onClick={() => handleFileSelect(file)}
//                        className={`flex items-center gap-2 px-3 py-2 w-full text-left rounded-md text-sm transition-colors ${
//                          activeFile?.fileName === file.fileName
//                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
//                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
//                        }`}
//                      >
//                        <FileCode size={14} className={activeFile?.fileName === file.fileName ? "text-blue-500" : "text-gray-400"} /> 
//                        {file.fileName}
//                      </button>
//                    ))
//                 ) : (
//                    <div className="text-center mt-6">
//                      <p className="text-xs text-gray-400 italic mb-3">No files found.</p>
//                      <button onClick={handleCreateNewFile} className="text-xs text-blue-500 hover:underline">
//                        + Create your first file
//                      </button>
//                    </div>
//                 )}
//               </div>
//             </div>

//             {/* EDITOR AREA */}
//             <div className="flex-1 flex flex-col relative">
//               <div className="bg-gray-100 dark:bg-[#1c2128] px-4 py-2 text-xs font-mono border-b border-gray-300 dark:border-gray-700 text-gray-500 flex justify-between">
//                 <span>{activeFile ? `Editing: ${activeFile.fileName}` : "Select a file to edit"}</span>
//                 {activeFile && activeFile.isNew && <span className="text-blue-500">Unsaved New File</span>}
//               </div>
//               <textarea
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 disabled={!activeFile}
//                 className="flex-1 w-full p-4 font-mono text-sm bg-white dark:bg-[#0d1117] text-gray-800 dark:text-gray-200 resize-none focus:outline-none disabled:opacity-70"
//                 spellCheck="false"
//                 placeholder={!activeFile ? "Select a file from the left sidebar or create a new one to start coding..." : "// Type code here..."}
//               />
//             </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default RepoDetail;
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { 
  FileCode, 
  ExternalLink, 
  BookOpen, 
  GitBranch, 
  Tag, 
  Clock, 
  Folder, 
  File, 
  Settings, 
  Star, 
  GitFork, 
  Eye, 
  AlertCircle
} from "lucide-react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const RepoDetail = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null); // null means we are viewing the directory

  const loadRepoData = async () => {
    try {
      // Currently using MongoDB to fetch files, as your S3 tree is currently empty
      const repoRes = await axios.get(`http://localhost:3002/repo/${id}`);
      setRepo(repoRes.data);
    } catch (err) {
      console.error("Error fetching repo details:", err);
    }
  };

  useEffect(() => {
    loadRepoData();
  }, [id]);

  if (!repo) {
    return (
      <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#0d1117] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const liveUrl = `http://localhost:3002/repo/view/${repo._id}`;
  
  // Find README file if it exists
  const readmeFile = repo.content?.find(f => f.fileName.toLowerCase() === 'readme.md');

  // Tabs for the GitHub UI
  const tabs = [
    { name: 'Code', icon: <FileCode size={16} />, active: true },
    { name: 'Issues', icon: <AlertCircle size={16} />, count: repo.issues?.length || 0 },
    { name: 'Pull requests', icon: <GitBranch size={16} /> },
    { name: 'Actions', icon: <Clock size={16} /> },
    { name: 'Settings', icon: <Settings size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#0d1117] text-gray-900 dark:text-[#c9d1d9] font-sans">
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      <main className="pt-16 lg:ml-64 pb-10">
        {/* Repo Header */}
        <div className="bg-white dark:bg-[#0d1117] border-b border-gray-200 dark:border-[#30363d] pt-6 px-4 sm:px-8">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xl">
              <BookOpen size={20} className="text-gray-500" />
              <span className="text-blue-600 dark:text-[#58a6ff] hover:underline cursor-pointer">
                {repo.owner?.username || 'user'}
              </span>
              <span className="text-gray-400">/</span>
              <span className="font-bold text-blue-600 dark:text-[#58a6ff] hover:underline cursor-pointer">
                {repo.name}
              </span>
              <span className="border border-gray-200 dark:border-[#30363d] rounded-full px-2 py-0.5 text-xs text-gray-500 font-medium ml-2">
                {repo.visibility ? "Public" : "Private"}
              </span>
            </div>

            {/* GitHub Style Action Buttons */}
            <div className="flex items-center gap-2 text-sm">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-[#30363d] rounded-md bg-gray-50 dark:bg-[#21262d] hover:bg-gray-100 dark:hover:bg-[#30363d] transition-colors">
                <Eye size={16} /> Watch <span className="bg-white dark:bg-[#0d1117] px-1.5 rounded-full text-xs">0</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-[#30363d] rounded-md bg-gray-50 dark:bg-[#21262d] hover:bg-gray-100 dark:hover:bg-[#30363d] transition-colors">
                <GitFork size={16} /> Fork <span className="bg-white dark:bg-[#0d1117] px-1.5 rounded-full text-xs">0</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-[#30363d] rounded-md bg-gray-50 dark:bg-[#21262d] hover:bg-gray-100 dark:hover:bg-[#30363d] transition-colors">
                <Star size={16} /> Star <span className="bg-white dark:bg-[#0d1117] px-1.5 rounded-full text-xs">0</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="max-w-[1280px] mx-auto flex overflow-x-auto border-b border-transparent">
            {tabs.map((tab, idx) => (
              <button 
                key={idx}
                className={`flex items-center gap-2 px-4 py-2 text-sm border-b-2 font-medium transition-colors whitespace-nowrap
                  ${tab.active 
                    ? 'border-[#fd8c73] text-gray-900 dark:text-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
              >
                {tab.icon}
                {tab.name}
                {tab.count !== undefined && (
                  <span className="bg-gray-200 dark:bg-[#30363d] text-xs px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Files & README (Takes up 9 of 12 columns on large screens) */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* Branch Selector & Go To File */}
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-[#30363d] rounded-md bg-gray-50 dark:bg-[#21262d] text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#30363d]">
                <GitBranch size={16} /> main <span className="text-xs">▼</span>
              </button>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <button className="hover:text-blue-500 flex items-center gap-1">
                  <Clock size={16} /> 1 Commit
                </button>
              </div>
            </div>

            {/* DIRECTORY VIEW */}
            {!currentFile ? (
              <>
                {/* File Explorer Table */}
                <div className="border border-gray-200 dark:border-[#30363d] rounded-md overflow-hidden bg-white dark:bg-[#0d1117]">
                  
                  {/* Table Header (Commit Info) */}
                  <div className="bg-gray-50 dark:bg-[#161b22] border-b border-gray-200 dark:border-[#30363d] p-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-6 h-6 rounded-full bg-gray-200" />
                      <span className="font-medium text-gray-900 dark:text-white">{repo.owner?.username || 'user'}</span>
                      <span className="text-gray-500 hover:text-blue-500 cursor-pointer">Initial commit</span>
                    </div>
                    <span className="text-gray-500 text-xs">2 days ago</span>
                  </div>

                  {/* File Rows */}
                  <div className="divide-y divide-gray-200 dark:divide-[#30363d]">
                    {repo.content && repo.content.length > 0 ? (
                      repo.content.map((file, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setCurrentFile(file)}
                          className="flex items-center p-3 text-sm hover:bg-gray-50 dark:hover:bg-[#161b22] transition-colors cursor-pointer group"
                        >
                          <div className="w-1/3 flex items-center gap-3">
                            {/* Simple logic: if no extension, treat as folder, else file */}
                            {file.fileName.includes('.') ? (
                              <File size={16} className="text-gray-400" />
                            ) : (
                              <Folder size={16} className="text-blue-500" />
                            )}
                            <span className="font-medium text-gray-900 dark:text-[#c9d1d9] group-hover:text-blue-500">
                              {file.fileName}
                            </span>
                          </div>
                          <div className="w-1/2 text-gray-500 truncate">
                            Update {file.fileName}
                          </div>
                          <div className="w-1/6 text-right text-gray-500 text-xs">
                            2 days ago
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        This repository is empty.
                      </div>
                    )}
                  </div>
                </div>

                {/* README Block */}
                <div className="border border-gray-200 dark:border-[#30363d] rounded-md overflow-hidden mt-6 bg-white dark:bg-[#0d1117]">
                  <div className="bg-gray-50 dark:bg-[#161b22] border-b border-gray-200 dark:border-[#30363d] p-3 flex items-center gap-2 font-medium text-sm text-gray-900 dark:text-white">
                    <BookOpen size={16} /> README.md
                  </div>
                  <div className="p-8 text-center text-gray-500 bg-white dark:bg-[#0d1117]">
                    {readmeFile ? (
                      <pre className="text-left font-sans whitespace-pre-wrap text-gray-800 dark:text-gray-300">
                        {readmeFile.code}
                      </pre>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <BookOpen size={48} className="text-gray-300 dark:text-gray-600" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add a README</h3>
                        <p>Help people interested in this repository understand your project.</p>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm">
                          Add a README
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* SINGLE FILE VIEWER */
              <div className="border border-gray-200 dark:border-[#30363d] rounded-md overflow-hidden bg-white dark:bg-[#0d1117]">
                <div className="bg-gray-50 dark:bg-[#161b22] border-b border-gray-200 dark:border-[#30363d] p-3 flex items-center justify-between font-medium text-sm">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCurrentFile(null)}
                      className="text-blue-500 hover:underline"
                    >
                      {repo.name}
                    </button>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-900 dark:text-white">{currentFile.fileName}</span>
                  </div>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-800 dark:text-[#c9d1d9]">
                    {currentFile.code}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar (Takes up 3 of 12 columns) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* About Section */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">About</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {repo.description || "No description, website, or topics provided."}
              </p>
              
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm hover:underline mb-4 font-medium"
              >
                {/* <ExternalLink size={16} /> {liveUrl} */}
              </a>

              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-[#30363d]">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <BookOpen size={16} /> Readme
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock size={16} /> Activity
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Star size={16} /> 0 stars
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Eye size={16} /> 0 watching
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <GitFork size={16} /> 0 forks
                </div>
              </div>
            </div>

            {/* Releases Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-[#30363d]">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Releases</h3>
              <p className="text-gray-500 text-sm mb-2">No releases published</p>
              <button className="text-blue-500 text-sm hover:underline">Create a new release</button>
            </div>

            {/* Languages Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-[#30363d]">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Languages</h3>
              {/* Fake language bar based on your screenshot */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 flex overflow-hidden">
                <div className="bg-yellow-400 h-full" style={{ width: '94.3%' }}></div>
                <div className="bg-purple-500 h-full" style={{ width: '5.4%' }}></div>
                <div className="bg-red-500 h-full" style={{ width: '0.3%' }}></div>
              </div>
              <ul className="text-sm font-medium flex flex-col gap-1">
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> JavaScript <span className="text-gray-500 font-normal">94.3%</span></li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span className="w-2 h-2 rounded-full bg-purple-500"></span> CSS <span className="text-gray-500 font-normal">5.4%</span></li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span className="w-2 h-2 rounded-full bg-red-500"></span> HTML <span className="text-gray-500 font-normal">0.3%</span></li>
              </ul>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default RepoDetail;