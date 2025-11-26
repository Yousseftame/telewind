import React, { useState } from "react";
import Sidebar from '../../components/Sidebar';
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content */}
      <main 
        className={`flex-1 bg-gray-100 p-6 overflow-auto transition-all duration-300 ${
          collapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Outlet/>
      </main>
    </div>
  );
};

export default DashboardLayout;