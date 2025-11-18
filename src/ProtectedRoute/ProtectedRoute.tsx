import type { AuthContextType } from "../services/types";
import { useAuth } from "@/store/AuthContext/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loginData, isLoading }: AuthContextType = useAuth();

  // Show a full-screen loader while checking auth
 

  if (localStorage.getItem("token" )   ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login"  />;
  }
}
