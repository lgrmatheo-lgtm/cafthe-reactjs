import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";
import CheckoutTunnel from "../components/CheckoutTunnel.jsx";
import CheckoutSummary from "../components/CheckoutSummary.jsx";
import "../styles/CheckoutLivraison.css";

const DELIVERY_MODE_KEY = "cafthe_delivery_mode";

const getStoredDeliveryMode = () => {
    if (typeof window === "undefined") return "standard";
    return sessionStorage.getItem(DELIVERY_MODE_KEY) || "standard";
};

const CheckoutLivraison = () => {
    const navigate = useNavigate();
    const { items, totalItems, totalPrice } = useContext(CartContext);
    const [deliveryMode, setDeliveryMode] = useState(getStoredDeliveryMode);

    useEffect(() => {
        document.title = "Livraison | CafThe";
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        sessionStorage.setItem(DELIVERY_MODE_KEY, deliveryMode);
    }, [deliveryMode]);

    if (items.length === 0) {
        return (
            <main className="checkout-page">
                <div className="breadcrumb">Accueil / Panier / Livraison</div>
                <h1>Livraison</h1>
                <CheckoutTunnel activeStep={2} />
                <div className="checkout-empty">
                    <h2>Votre panier est vide</h2>
                    <p>Ajoutez des produits pour continuer le tunnel d'achat.</p>
                    <button type="button" onClick={() => navigate("/catalogue")}>
                        Voir le catalogue
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <div className="breadcrumb">Accueil / Panier / Livraison</div>
            <h1>Livraison</h1>
            <CheckoutTunnel activeStep={2} />

            <div className="checkout-layout">
                <section className="checkout-card">
                    <h2>Mode de livraison</h2>
                    <div className="delivery-modes">
                        <button
                            type="button"
                            className={deliveryMode === "standard" ? "active" : ""}
                            onClick={() => setDeliveryMode("standard")}
                        >
                            <strong>Standard</strong>
                            <span>2-4 jours ouvrés</span>
                        </button>
                        <button
                            type="button"
                            className={deliveryMode === "express" ? "active" : ""}
                            onClick={() => setDeliveryMode("express")}
                        >
                            <strong>Express</strong>
                            <span>24-48h</span>
                        </button>
                        <button
                            type="button"
                            className={deliveryMode === "pickup" ? "active" : ""}
                            onClick={() => setDeliveryMode("pickup")}
                        >
                            <strong>Point relais</strong>
                            <span>Retrait gratuit</span>
                        </button>
                    </div>
                    {deliveryMode === "pickup" && (
                        <div className="pickup-note">
                            Retrait disponible sous 48h dans le point relais de votre choix.
                        </div>
                    )}

                    <div className="address-form">
                        <h3>Adresse de livraison</h3>
                        <label>
                            Nom complet
                            <input type="text" placeholder="Nom et prenom" />
                        </label>
                        <label>
                            Adresse
                            <input type="text" placeholder="Numero et rue" />
                        </label>
                        <label>
                            Code postal
                            <input type="text" placeholder="Code postal" />
                        </label>
                        <label>
                            Ville
                            <input type="text" placeholder="Ville" />
                        </label>
                        <label>
                            Telephone
                            <input type="tel" placeholder="Numero de telephone" />
                        </label>
                    </div>

                    <div className="checkout-actions">
                        <button type="button" className="ghost" onClick={() => navigate("/panier")}>
                            Retour au panier
                        </button>
                        <button type="button" className="primary" onClick={() => navigate("/checkout/paiement")}>
                            Passer au paiement
                        </button>
                    </div>
                </section>

                <CheckoutSummary
                    items={items}
                    totalItems={totalItems}
                    totalPrice={totalPrice}
                    deliveryMode={deliveryMode}
                />
            </div>
        </main>
    );
};

export default CheckoutLivraison;



