import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import Cart from "./pages/Cart.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import CheckoutLivraison from "./pages/CheckoutLivraison.jsx";
import CheckoutPaiement from "./pages/CheckoutPaiement.jsx";
import CheckoutConfirmation from "./pages/CheckoutConfirmation.jsx";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import ThesOrigine from "./pages/ThesOrigine.jsx";
import CafesSpecialite from "./pages/CafesSpecialite.jsx";
import Accessoires from "./pages/Accessoires.jsx";
import Nouveautes from "./pages/Nouveautes.jsx";
import LivraisonRetours from "./pages/LivraisonRetours.jsx";
import Faq from "./pages/Faq.jsx";
import Contact from "./pages/Contact.jsx";
import MentionsLegales from "./pages/MentionsLegales.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import {AuthProvider} from "./context/authContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { SearchProvider } from "./context/searchContext.jsx";


function App() {
    return (

        <AuthProvider>
            <CartProvider>
                <SearchProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="catalogue" element={<Catalogue />} />
                                <Route path="thes-origine" element={<ThesOrigine />} />
                                <Route path="cafes-specialite" element={<CafesSpecialite />} />
                                <Route path="accessoires" element={<Accessoires />} />
                                <Route path="nouveautes" element={<Nouveautes />} />
                                <Route path="livraison-retours" element={<LivraisonRetours />} />
                                <Route path="faq" element={<Faq />} />
                                <Route path="contact" element={<Contact />} />
                                <Route path="mentions-legales" element={<MentionsLegales />} />
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="privacy" element={<Privacy />} />
                                <Route path="terms" element={<Terms />} />
                                <Route path="produit/:id" element={<ProductDetails />} />
                                <Route path="login" element={<Login />} />
                                <Route path="inscription" element={<Register />} />
                                <Route path="profil" element={<Account />} />
                                <Route path="panier" element={<Cart />} />
                                <Route path="checkout" element={<Navigate to="/checkout/livraison" replace />} />
                                <Route path="checkout/livraison" element={<CheckoutLivraison />} />
                                <Route path="checkout/paiement" element={<CheckoutPaiement />} />
                                <Route path="checkout/confirmation" element={<CheckoutConfirmation />} />
                                <Route path="profil/commande/:id" element={<OrderDetails />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </SearchProvider>
            </CartProvider>
        </AuthProvider>
    )
}

export default App
