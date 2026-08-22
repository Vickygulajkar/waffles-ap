import React, { type ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#fcf9f5] font-sans">
      {/* Sidebar - fixed width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#fcf9f5] p-8">
          {children || (
             <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                Dashboard Content Goes Here
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
