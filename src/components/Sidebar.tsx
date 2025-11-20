import React, { useState } from "react";
import {
  Home,
  Users,
  Grid,
  Bed,
  Layers,
  FileText,
  Lock,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Draggable from "react-draggable";
import { AuthContextType } from "@/services/types";
import { useAuth } from "@/store/AuthContext/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";


interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;          // <-- Add routing
  onClick?: () => void;
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logOutUser }: AuthContextType = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    logOutUser();
    localStorage.removeItem("token");
    navigate("/login" , { replace: true });
  };

  const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Logout"
  }).then(async (result) => {
    if (result.isConfirmed) {
      // Call your logout function
      

      Swal.fire({
        title: "Logged out",
        text: "You have been logged out successfully.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
        didClose: () => {
          // Run logout AFTER the toast finishes
          logOut();
        }
      });
    }
  });
};

  const menuItems: MenuItem[] = [
    // { label: "Home", icon: <Home size={20} />, path: "/dashboard" },
    { label: "Products", icon: <Users size={20} />, path: "/adminProduct" },
    { label: "Industries", icon: <Grid size={20} />, path: "/adminindustries" },
    // { label: "Studies", icon: <Bed size={20} />, path: "/adminStudies" },
    { label: "Category", icon: <Bed size={20} />, path: "/AdminCate" },
    { label: "Events", icon: <Layers size={20} />, path: "/adminEvents" },
    { label: "Partners", icon: <FileText size={20} />, path: "/AdminPartner" },
    { label: "Contacts", icon: <FileText size={20} />, path: "/Contacts" },
    { label: "Certifications", icon: <FileText size={20} />, path: "/certifications" },

    // Logout stays without path
    { label: "Logout", icon: <LogOut size={20} />, onClick: handleLogout  },
  ];

  return (
    
      <div
        className={`h-screen bg-[#011449] text-white flex flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Toggle Button */}
        <div className="flex justify-end p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-gray-700 p-1 rounded"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex-1 mt-4 space-y-3">
          {menuItems.map((item) => {
            const content = (
              <div className="flex items-center w-full p-2 hover:bg-gray-700 rounded transition-colors duration-200">
                <span className="flex justify-center w-8">{item.icon}</span>
                {!collapsed && (
                  <span className="ml-3 text-md font-medium">{item.label}</span>
                )}
              </div>
            );

            return (
              <li key={item.label}>
                {/* If logout → just button */}
                {item.onClick ? (
                  <button onClick={item.onClick} className="w-full text-left">
                    {content}
                  </button>
                ) : (
                  <Link to={item.path!}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
   
  );
};

export default Sidebar;
