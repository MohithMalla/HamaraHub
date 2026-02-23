import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  FileCode, GitBranch, Clock, Folder, File, BookOpen, 
  Save, RefreshCw, Layout, Upload, CheckCircle 
} from "lucide-react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const UnifiedRepoView = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  
  const [repo, setRepo] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // S3 / Versioning State
  const [meta, setMeta] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCommit, setSelectedCommit] = useState("");
  const [fileTree, setFileTree] = useState(null);

  // Editor/Viewer State
  const [activeFile, setActiveFile] = useState(null); 
  const [code, setCode] = useState(""); 
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 1. REUSABLE FETCH FUNCTION (Fixes Auto-Refetching)
  const fetchRepoData = useCallback(async (isInitialLoad = false) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/repo/${id}`);
      const repoData = res.data;
      setRepo(repoData);

      if (repoData.isremote === false) {
        // S3 MODE: Fetch versioned metadata
        await fetchS3Metadata(repoData);
      } else {
        // MONGODB MODE: Auto-select first file only on initial load
        if (isInitialLoad && repoData.content?.length > 0) {
          handleFileSelect(repoData.content[0]);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRepoData(true);
  }, [fetchRepoData]);

  const fetchS3Metadata = async (repoData) => {
    try {
      const ownerId = typeof repoData.owner === 'object' ? repoData.owner._id : repoData.owner;
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/repo/getmeta`, {
        params: { userId: ownerId, repo: repoData.name }
      });
      setMeta(res.data);
      const defaultB = res.data.defaultBranch;
      setSelectedBranch(defaultB);
      setSelectedCommit(res.data.branches[defaultB].head);
    } catch (err) {
      console.error("S3 metadata fetch error:", err);
    }
  };

  useEffect(() => {
    if (repo?.isremote === false && selectedCommit) {
      const fetchTree = async () => {
        const ownerId = typeof repo.owner === 'object' ? repo.owner._id : repo.owner;
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/repo/getrepo`, {
            params: { 
              userId: ownerId, repo: repo.name, 
              branch: selectedBranch, commitHash: selectedCommit 
            }
          });
          setFileTree(res.data.tree);
        } catch (err) {
          console.error("S3 Tree fetch error:", err);
        }
      };
      fetchTree();
    }
  }, [selectedCommit, selectedBranch, repo]);

  // 2. FIXED UPLOAD LOGIC (Prevents double requests & Auto-refetches)
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || repo?.isremote === false) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileCode = e.target.result;
      const payload = {
        description: repo.description,
        content: {
          fileName: file.name,
          code: fileCode
        }
      };

      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/repo/update/${id}`, payload);

        if (response.data.message === "cant be updated localpush conflict") {
          alert("❌ Conflict: Repository is managed locally.");
        } else {
          alert("✅ File uploaded successfully!");
          // Trigger the refetch here
          await fetchRepoData(false); 
          // Reset input so same file can be selected again later
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("❌ Failed to update repository.");
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      alert("❌ Error reading file");
      setIsUploading(false);
    };

    reader.readAsText(file);
  };

  const handleFileSelect = async (file) => {
    if (repo?.isremote === false && file.hash) {
      setActiveFile({ fileName: file.name, hash: file.hash });
      setCode("// Fetching from S3...");
      try {
        const ownerId = typeof repo.owner === 'object' ? repo.owner._id : repo.owner;
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/repo/getfile/${ownerId}/${repo.name}`, {
          params: { hash: file.hash }
        });
        setCode(res.data);
      } catch (err) {
        setCode("// Error loading file from S3.");
      }
    } else {
      setActiveFile(file);
      setCode(file.code || "");
    }
  };

  const handleSave = async () => {
    if (!activeFile || repo?.isremote === false) return;
    setIsSaving(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/repo/update/${id}`, {
        content: { fileName: activeFile.fileName, code: code }
      });
      alert("✅ Saved to MongoDB successfully!");
      fetchRepoData(false); // Refetch after manual save as well
    } catch (err) {
      alert("❌ Save failed.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderS3Tree = (node) => {
    if (node.type === "folder") {
      return (
        <div key={node.name} className="ml-4">
          <div className="flex items-center gap-2 py-1 text-sm text-gray-700 dark:text-gray-300">
            <Folder size={14} className="text-blue-500" /> <span>{node.name}</span>
          </div>
          {node.children?.map(child => renderS3Tree(child))}
        </div>
      );
    }
    return (
      <button 
        key={node.hash}
        onClick={() => handleFileSelect(node)}
        className={`ml-6 flex items-center gap-2 py-1 text-sm w-full text-left transition-colors hover:text-blue-500 ${
          activeFile?.hash === node.hash ? "text-blue-600 font-bold" : "text-gray-500"
        }`}
      >
        <File size={14} /> {node.name}
      </button>
    );
  };

  if (loading || !repo) return <div className="text-center mt-20">Loading Data...</div>;

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#0d1117] text-gray-900 dark:text-[#c9d1d9]">
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      <main className="pt-20 lg:ml-64 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-[#30363d] pb-4">
            <div className="flex items-center gap-2 text-xl">
              <Layout size={20} className="text-gray-400" />
              <span className="text-blue-600 font-bold">{repo.name}</span>
              <span className="text-xs border border-gray-300 rounded-full px-2 py-0.5 ml-2">
                {repo.isremote ? "DB Mode" : "S3 Mode"}
              </span>
            </div>
            
            <div className="flex gap-3">
              {repo.isremote === true && (
                <>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-black transition-colors disabled:opacity-50"
                  >
                    {isUploading ? <RefreshCw size={16} className="animate-spin"/> : <Upload size={16} />} 
                    Upload File
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving || !activeFile}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16} />} 
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex border border-gray-300 dark:border-[#30363d] rounded-lg overflow-hidden bg-white dark:bg-[#0d1117] h-[650px]">
            {/* Sidebar Explorer */}
            <div className="w-64 bg-gray-50 dark:bg-[#161b22] border-r border-gray-300 dark:border-[#30363d] p-4 overflow-y-auto">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Explorer</h3>
              
              {repo.isremote ? (
                <div className="space-y-1">
                  {repo.content?.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFileSelect(file)}
                      className={`flex items-center gap-2 px-3 py-2 w-full text-left rounded-md text-sm transition-colors ${
                        activeFile?.fileName === file.fileName ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 font-semibold" : "hover:bg-gray-200 dark:hover:bg-gray-800"
                      }`}
                    >
                      <FileCode size={14} /> {file.fileName}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Active Branch</p>
                    <select 
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full text-xs bg-transparent border border-gray-300 dark:border-gray-700 p-1 rounded"
                    >
                      {meta && Object.keys(meta.branches).map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    {fileTree ? renderS3Tree(fileTree) : <p className="text-xs italic">No S3 files found.</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col">
              <div className="bg-gray-100 dark:bg-[#1c2128] px-4 py-2 text-xs font-mono border-b border-gray-300 dark:border-[#30363d] text-gray-500 flex justify-between items-center">
                <span>{activeFile ? (activeFile.fileName || activeFile.name) : "Select a file"}</span>
                {repo.isremote === false && (
                   <span className="flex items-center gap-1 text-blue-500 font-bold">
                     <CheckCircle size={12} /> S3 Protected
                   </span>
                )}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                readOnly={repo.isremote === false}
                className="flex-1 p-4 font-mono text-sm bg-transparent outline-none resize-none dark:text-gray-300"
                spellCheck="false"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnifiedRepoView;