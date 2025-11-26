import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { NavLink } from '@/components/NavLink';
import ScrollToTop from '@/components/ScrollToTop';
import React from 'react'
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
         <ScrollToTop />
       <Navigation />
        <Outlet />
        <Footer/>
    </div>
  )
}
