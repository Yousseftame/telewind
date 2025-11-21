import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Products from "./pages/Products";
import Industries from "./pages/Industries";
import CaseStudies from "./pages/CaseStudies";
import Events from "./pages/Events";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.tsx";
import AdminProduct from "./pages/admin/AdminProduct/AdminProduct.tsx";
import AdminIndustries from "./pages/admin/AdminIndustries/AdminIndustries.tsx";
import AdminStudies from "./pages/admin/AdminStudies/AdminStudies.tsx";
import AdminEvents from "./pages/admin/AdminEvents/AdminEvents.tsx";
import AdminPartner from "./pages/admin/AdminPartner/AdminPartner.tsx";
import AdminCate from "./pages/admin/AdminCate/AdminCate.tsx";
import Contacts from "./pages/admin/contacts/Contacts.tsx";
import Certifications from "./pages/admin/Certifications/Certifications.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      <BrowserRouter>
        <Routes>
         

          {/* PUBLIC WEBSITE LAYOUT */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/industries" element={<Industries />} />
            {/* <Route path="/case-studies" element={<CaseStudies />} /> */}
            <Route path="/events" element={<Events />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* AUTH PAGES */}
          <Route path="/login" element={<Login />} />

          {/* DASHBOARD (AFTER LOGIN) */}
          <Route element={<DashboardLayout />}>
            {/* <Route path="/dashboard" element={
              <ProtectedRoute>
              <Dashboard/>
              </ProtectedRoute> } 
              /> */}
               <Route path="/adminProduct" element={<ProtectedRoute><AdminProduct /> </ProtectedRoute>} />
               <Route path="/adminindustries" element={<ProtectedRoute><AdminIndustries /></ProtectedRoute>} />
               {/* <Route path="/adminStudies" element={<ProtectedRoute><AdminStudies /></ProtectedRoute>} /> */}
               <Route path="/AdminCate" element={<AdminCate />} />
               <Route path="/adminEvents" element={<AdminEvents />} />
               <Route path="/adminPartner" element={<ProtectedRoute><AdminPartner /></ProtectedRoute>} />
               <Route path="/certifications" element={<ProtectedRoute><Certifications /></ProtectedRoute>} />
               <Route path="/Contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />

            
          </Route>

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
