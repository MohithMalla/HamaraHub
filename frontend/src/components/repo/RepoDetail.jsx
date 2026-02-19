import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FileCode, Save, ExternalLink, RefreshCw } from "lucide-react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const RepoDetail = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);
  const [activeFile, setActiveFile] = useState(null); 
  const [code, setCode] = useState(""); 
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch Repo
  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/repo/${id}`);
        setRepo(response.data);
        
        // Auto-select first file
        if (response.data.content && response.data.content.length > 0) {
          setActiveFile(response.data.content[0]);
          setCode(response.data.content[0].code);
        }
      } catch (err) {
        console.error("Error fetching repo:", err);
      }
    };
    fetchRepo();
  }, [id]);

  // Save & Deploy Logic
  const handleSave = async () => {
    if (!activeFile) return;
    setIsSaving(true);

    try {
      await axios.put(`http://localhost:3002/repo/update/${id}`, {
        content: {
          fileName: activeFile.fileName,
          code: code 
        }
      });
      alert("✅ Changes Deployed Successfully!");
    } catch (err) {
      console.error("Error saving:", err);
      alert("❌ Failed to deploy changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!repo) return <div className="text-center mt-20">Loading...</div>;

  const liveUrl = `http://localhost:3002/repo/view/${repo._id}`;

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 pt-20 px-6 h-[calc(100vh-80px)]">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-300 dark:border-gray-700 pb-4 mb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-blue-600">{repo.name}</span>
                <span className="text-xs border border-gray-300 dark:border-gray-600 rounded-full px-2 py-0.5 text-gray-500">
                  {repo.visibility ? "Public" : "Private"}
                </span>
              </h1>
              <p className="text-gray-500 text-sm">{repo.description}</p>
            </div>
            
            <div className="flex gap-3">
               <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                <ExternalLink size={16} /> View Live
              </a>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-70"
              >
                {isSaving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16} />} 
                {isSaving ? "Deploying..." : "Deploy Changes"}
              </button>
            </div>
          </div>

          <div className="flex-1 flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-[#0d1117]">
            
            <div className="w-48 sm:w-64 bg-gray-50 dark:bg-[#161b22] border-r border-gray-300 dark:border-gray-700 p-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Files</h3>
              <div className="space-y-1">
                {repo.content.map((file, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveFile(file); setCode(file.code); }}
                    className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                      activeFile?.fileName === file.fileName 
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium" 
                      : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <FileCode size={16} />
                    {file.fileName}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="bg-gray-100 dark:bg-[#1c2128] px-4 py-2 text-xs font-mono border-b border-gray-300 dark:border-gray-700 text-gray-500">
                {activeFile ? `Editing: ${activeFile.fileName}` : "Select a file"}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full p-4 font-mono text-sm bg-white dark:bg-[#0d1117] text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
                spellCheck="false"
                placeholder="// Type code here..."
              />
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default RepoDetail;