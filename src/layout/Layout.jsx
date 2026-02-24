/**
 * @file Layout.jsx
 * Role: Template commun de page.
 * Comment c est fait: Assemble SEO global, barre de navigation, contenu courant (Outlet) et footer dans un shell unique.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import RouteSeo from "../components/RouteSeo.jsx";

/*
Structure
- Navbar
- Outlet
- Footer
*/

const Layout = () => {
    return (
        <div className="app-shell">
            <RouteSeo />
            <Navbar />
            <div className="app-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
