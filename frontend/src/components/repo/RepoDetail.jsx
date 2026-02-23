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