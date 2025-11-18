import React from "react";
import Sidebar from '../../components/Sidebar';
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="  flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet/>
      </main>
    </div>
  );
};

export default DashboardLayout;
