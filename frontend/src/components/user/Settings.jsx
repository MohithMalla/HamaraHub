import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { AlertTriangle } from 'lucide-react';

const Settings = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you absolutely sure? This action cannot be undone. All repositories and data will be permanently deleted.");
    if (!confirmDelete) return;

    setIsDeleting(true);
    const userId = localStorage.getItem("userId");

    try {
      await axios.delete(`http://localhost:3002/deleteProfile/${userId}`);
      
      // Clear local storage and redirect to auth
      localStorage.clear();
      alert("Account deleted successfully.");
      window.location.href = "/auth"; 
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Failed to delete account. Please try again later.");
      setIsDeleting(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#010409] text-gray-900 dark:text-gray-100 font-sans">
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />

      <main className="pt-24 lg:ml-64 px-4 sm:px-8 pb-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">Account Settings</h1>
        
        <div className="space-y-8">
            {/* General Actions */}
            <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Session Management</h2>
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md font-medium text-sm transition-colors"
                >
                    Log out of HamaraHub
                </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-white dark:bg-[#0d1117] border border-red-500/30 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-2 text-red-600 flex items-center gap-2">
                    <AlertTriangle size={20} /> Danger Zone
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <button 
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="px-4 py-2 bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-md font-medium text-sm transition-colors disabled:opacity-50"
                >
                    {isDeleting ? "Deleting Account..." : "Delete Account"}
                </button>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;