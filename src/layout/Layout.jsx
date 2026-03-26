import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Layout = () => {
    return (
        <div className="app-shell">
            <Navbar />
            <div className="app-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
