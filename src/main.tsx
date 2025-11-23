import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./store/AuthContext/AuthContext.tsx";
import './i18n'; // Import i18n configuration

createRoot(document.getElementById("root")!).render(

<AuthProvider>

<App />
</AuthProvider>
    
);
