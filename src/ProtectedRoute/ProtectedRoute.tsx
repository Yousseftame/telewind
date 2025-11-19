import type { AuthContextType } from "../services/types";
import { useAuth } from "@/store/AuthContext/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

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

  // Check if user is authenticated
  if (loginData?.token) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
}
