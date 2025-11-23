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
  Handshake,
  UserPen,
  ShieldCheck,
  Barcode,
  Target,
  ChartColumnStacked,
  Globe,
} from "lucide-react";
import { AuthContextType } from "@/services/types";
import { useAuth } from "@/store/AuthContext/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const { logOutUser }: AuthContextType = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // For active state

  const logOut = () => {
    logOutUser();
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const goToWebsite = () => {
    logOutUser();
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15246A",
      cancelButtonColor: "#8B0000",
      confirmButtonText: "Logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          didClose: () => {
            logOut();
          },
        });
      }
    });
  };

  const menuItems: MenuItem[] = [
    { label: "Products", icon: <Target size={20} />, path: "/adminProduct" },
    { label: "Industries", icon: <Grid size={20} />, path: "/adminindustries" },
    { label: "Category", icon: <ChartColumnStacked size={20} />, path: "/AdminCate" },
    { label: "Events", icon: <Layers size={20} />, path: "/adminEvents" },
    { label: "Partners", icon: <Handshake size={20} />, path: "/AdminPartner" },
    { label: "Certifications", icon: <ShieldCheck size={20} />, path: "/certifications" },
    { label: "Contacts", icon: <UserPen size={20} />, path: "/Contacts" },
    { label: "Logout", icon: <LogOut size={20} />, onClick: handleLogout },
  ];

  const isActive = (path?: string) => path && location.pathname === path;

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#011449] text-white flex flex-col transition-all duration-300 overflow-hidden z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo / Brand Area */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/30">
              D
            </div>
            <span className="font-semibold text-lg tracking-wide">Dashboard</span>
          </div>
        )}
        {collapsed && (
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center font-bold text-lg mx-auto shadow-lg shadow-indigo-500/30">
            D
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <div className="flex justify-end px-3 py-4 flex-shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Section Label */}
      {!collapsed && (
        <div className="px-5 mb-2 flex-shrink-0">
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
            Menu
          </span>
        </div>
      )}

      {/* Menu Items */}
      <ul className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.filter(item => !item.onClick).map((item) => {
          const active = isActive(item.path);
          
          const content = (
            <div
              className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 group
                ${active 
                  ? "bg-indigo-500/20 text-white border-l-4 border-indigo-400 ml-0" 
                  : "hover:bg-white/5 text-white/70 hover:text-white"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <span className={`flex justify-center items-center w-8 h-8 rounded-lg transition-all
                ${active ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-white/5 group-hover:bg-white/10"}
              `}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
              {/* Active indicator dot for collapsed state */}
              {collapsed && active && (
                <div className="absolute right-2 w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
              )}
            </div>
          );

          return (
            <li key={item.label} className="relative">
              <Link to={item.path!}>{content}</Link>
              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                  {item.label}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Divider */}
      <div className="mx-4 border-t border-white/10 flex-shrink-0"></div>

      {/* Bottom Actions */}
      <div className="p-3 mb-4 space-y-1 flex-shrink-0">
        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 group
            text-white/70 hover:text-red-400 hover:bg-red-500/10
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <span className="flex justify-center items-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-red-500/20 transition-all">
            <LogOut size={20} />
          </span>
          {!collapsed && (
            <span className="ml-3 text-sm font-medium">Logout</span>
          )}
        </button>

       <button
          onClick={goToWebsite}
          className={`flex items-center w-full p-3 rounded-xl transition-all duration-200 group
            text-white/70 hover:text-green-400 hover:bg-green-500/10
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <span className="flex justify-center items-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-green-500/20 transition-all">
            <Globe size={20} />
          </span>
          {!collapsed && (
            <div className="ml-3 text-left">
              <span className="text-sm font-medium block">Website</span>
              <span className="text-xs text-white/40 group-hover:text-green-400/60">Exit to main site</span>
            </div>
          )}
        </button>
      </div>

      {/* User Profile Section (Optional) */}
      {!collapsed && (
        <div className="p-4 mx-3 mb-4 bg-white/5 rounded-2xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-white/50 truncate">admin@example.com</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;