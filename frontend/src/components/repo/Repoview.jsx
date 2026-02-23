import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  FileCode, 
  GitBranch, 
  Clock, 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown,
  User,
  Layout
} from "lucide-react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const RepoView = () => {
  const { id } = useParams(); // Using the ID from URL
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // API State
  const [meta, setMeta] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCommit, setSelectedCommit] = useState("");
  const [fileTree, setFileTree] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [viewMode, setViewMode] = useState("tree"); // "tree" or "file"
  const [loading, setLoading] = useState(true);

  // Hardcoded params based on your example for initial fetch
  // In a real app, these would come from the 'repo' object or URL
  const userId = "6997305e1f7a1d223a7b1928";
  const repoName = "repo1";

  // 1. Load Metadata (Branches & Commits)
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/repo/getmeta?userId=${userId}&repo=${repoName}`);
        setMeta(res.data);
        const defaultB = res.data.defaultBranch;
        setSelectedBranch(defaultB);
        // Set head commit of default branch as active
        setSelectedCommit(res.data.branches[defaultB].head);
      } catch (err) {
        console.error("Error fetching metadata:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetadata();
  }, []);

  // 2. Load File Tree when Commit changes
  useEffect(() => {
    if (!selectedCommit) return;

    const fetchTree = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3002/repo/getrepo?userId=${userId}&repo=${repoName}&branch=${selectedBranch}&commitHash=${selectedCommit}`
        );
        setFileTree(res.data.tree);
        setViewMode("tree");
      } catch (err) {
        console.error("Error fetching tree:", err);
      }
    };
    fetchTree();
  }, [selectedCommit, selectedBranch]);

  // 3. Load File Content
  const handleFileClick = async (hash) => {
    try {
      const res = await axios.get(`http://localhost:3002/repo/getfile/${userId}/${repoName}?hash=${hash}`);
      setFileContent(res.data);
      setViewMode("file");
    } catch (err) {
      console.error("Error fetching file:", err);
    }
  };

  // --- RECURSIVE RENDERER FOR FILE TREE ---
  const renderTree = (node) => {
    if (node.type === "folder") {
      return (
        <div key={node.name} className="ml-4">
          <div className="flex items-center gap-2 py-1 text-gray-700 dark:text-gray-300">
            <Folder size={16} className="text-blue-500" />
            <span className="font-medium">{node.name}</span>
          </div>
          <div className="border-l border-gray-200 dark:border-gray-700 ml-2">
            {node.children?.map(child => renderTree(child))}
          </div>
        </div>
      );
    }
    return (
      <div 
        key={node.hash} 
        onClick={() => handleFileClick(node.hash)}
        className="ml-6 flex items-center gap-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 cursor-pointer group"
      >
        <File size={14} className="group-hover:text-blue-500" />
        <span>{node.name}</span>
      </div>
    );
  };

  if (loading) return <div className="flex justify-center mt-20">Loading Repository...</div>;

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#0d1117] text-gray-900 dark:text-[#c9d1d9]">
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      <main className="pt-20 lg:ml-64 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xl">
              <Layout size={20} className="text-gray-400" />
              <span className="text-blue-600 font-bold">{repoName}</span>
              <span className="text-xs border border-gray-300 rounded-full px-2 py-0.5">Public</span>
            </div>
          </div>

          {/* Selectors: Branch & Commit */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2 bg-white dark:bg-[#161b22] border border-gray-300 dark:border-[#30363d] rounded-md px-3 py-1.5 shadow-sm">
              <GitBranch size={16} className="text-gray-500" />
              <select 
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setSelectedCommit(meta.branches[e.target.value].head);
                }}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer"
              >
                {meta && Object.keys(meta.branches).map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-[#161b22] border border-gray-300 dark:border-[#30363d] rounded-md px-3 py-1.5 shadow-sm">
              <Clock size={16} className="text-gray-500" />
              <select 
                value={selectedCommit}
                onChange={(e) => setSelectedCommit(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer"
              >
                {meta && meta.branches[selectedBranch]?.commits.map(c => (
                  <option key={c.hash} value={c.hash}>{c.message} ({c.hash.substring(0,7)})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Browser Container */}
          <div className="border border-gray-300 dark:border-[#30363d] rounded-lg overflow-hidden bg-white dark:bg-[#0d1117]">
            {/* Nav path */}
            <div className="bg-gray-50 dark:bg-[#161b22] border-b border-gray-300 dark:border-[#30363d] p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span 
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setViewMode("tree")}
                >
                  {repoName}
                </span>
                {viewMode === "file" && <><span className="text-gray-400">/</span> <span className="font-mono text-xs">file_view</span></>}
              </div>
              <div className="text-xs text-gray-500">
                Commit: <span className="font-mono bg-gray-200 dark:bg-gray-800 px-1 rounded">{selectedCommit?.substring(0,7)}</span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4 min-h-[300px]">
              {viewMode === "tree" ? (
                <div className="space-y-1">
                  {fileTree ? renderTree(fileTree) : <p className="text-center text-gray-500 py-10">Empty tree</p>}
                </div>
              ) : (
                <div className="relative">
                   <button 
                    onClick={() => setViewMode("tree")}
                    className="absolute -top-10 right-0 text-xs text-blue-500 hover:underline"
                  >
                    Back to tree
                  </button>
                  <pre className="p-4 bg-gray-50 dark:bg-[#010409] rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                    {fileContent || "// No content available"}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Commit List for Branch */}
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
              <Clock size={16}/> Commit History for {selectedBranch}
            </h3>
            <div className="space-y-3">
              {meta?.branches[selectedBranch]?.commits.map((commit) => (
                <div 
                  key={commit.hash}
                  onClick={() => setSelectedCommit(commit.hash)}
                  className={`p-3 border rounded-md flex items-center justify-between cursor-pointer transition-all ${
                    selectedCommit === commit.hash 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" 
                    : "border-gray-200 dark:border-[#30363d] hover:bg-gray-50 dark:hover:bg-[#161b22]"
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold">{commit.message}</p>
                    <p className="text-xs text-gray-500 font-mono">{commit.hash}</p>
                  </div>
                  <div className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                    {selectedCommit === commit.hash ? "Active" : "View"}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default RepoView;