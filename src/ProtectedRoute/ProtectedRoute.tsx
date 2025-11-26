import type { AuthContextType } from "../services/types";
import { useAuth } from "@/store/AuthContext/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loginData, isLoading }: AuthContextType = useAuth();

  // Show a loader while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // If user NOT logged in → block browser back button
  if (!loginData?.token) {
    useEffect(() => {
      // Prevent navigating back to protected pages
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
    }, []);

    return <Navigate to="/login" replace />;
  }

  // If logged in → allow access normally
  return <>{children}</>;
}
