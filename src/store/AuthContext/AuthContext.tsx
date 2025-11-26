/* eslint-disable react-refresh/only-export-components */
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  AuthContextType,
  AuthTokenData,
  FullUserDataType,
} from "../../services/types";
import { ADMIN_URL } from "../../services/apiEndpoints";
import { axiosInstance } from "../../services/axiosInstance";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
const [loginData, setLoginData] = useState<AuthTokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fullUserData, setFullUserData] = useState<FullUserDataType | null>(
    null
  );


  const saveLoginData = () => {
  const token = localStorage.getItem("token");
  if (token) {

    setLoginData({ token });
  } else {
    setLoginData(null);
  }
  setIsLoading(false);
};



  // const getCurrentUser = async () => {
  //   try {
  //     const res = await axiosInstance.get(ADMIN_URL.GET_CURRENT_USER);
  //     setFullUserData(res.data);
  //     // // console.log("userData", res.data);
  //   } catch (err) {
  //     console.error("Failed to fetch user data", err);
  //   }
  // };

 useEffect(() => {
  const initAuth = async () => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setLoginData(null);
      setFullUserData(null);
      setIsLoading(false);
      return;
    }

    try {
      setLoginData({ token }); 

      // const res = await axiosInstance.get(ADMIN_URL.GET_CURRENT_USER);
      // setFullUserData(res.data);

    } catch (err) {
      console.error("Auth init failed", err);
      localStorage.removeItem("token");
      setLoginData(null);
      setFullUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  initAuth();
}, []);





  const logOutUser = () => {
    localStorage.removeItem("token");
    saveLoginData();
    setFullUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loginData,
        setLoginData,
        saveLoginData,
        isLoading,
        setFullUserData,
        fullUserData,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
