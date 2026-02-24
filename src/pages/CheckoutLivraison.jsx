/**
 * @file CheckoutLivraison.jsx
 * Role: Etape 2 du tunnel d achat.
 * Comment c est fait: Gere mode de livraison/retrait, adresse et impact sur les frais de livraison.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";
import { getDiscountedPrice } from "../utils/discounts.js";
import { getShippingCost } from "../utils/shipping.js";

const stores = [
    "CafThé Paris Opéra",
    "CafThé Lyon Bellecour",
    "CafThé Bordeaux Centre",
];

const CheckoutLivraison = () => {
    const navigate = useNavigate();
    const { items, totalPrice, totalItems } = useContext(CartContext);
    const [deliveryMode, setDeliveryMode] = useState(
        sessionStorage.getItem("deliveryMode") || "home"
    );
    const [method, setMethod] = useState(
        sessionStorage.getItem("shippingMethod") || "standard"
    );
    const [pickupStore, setPickupStore] = useState(
        sessionStorage.getItem("pickupStore") || stores[0]
    );

    const effectiveMethod = deliveryMode === "pickup" ? "pickup" : method;
    const shipping = useMemo(
        () => getShippingCost(totalItems, effectiveMethod),
        [totalItems, effectiveMethod]
    );
    const total = useMemo(
        () => totalPrice + (items.length ? shipping : 0),
        [totalPrice, items.length, shipping]
    );

    if (items.length === 0) {
        return (
            <main className="checkout-page">
                <div className="checkout-empty">
                    <h2>Votre panier est vide</h2>
                    <button type="button" onClick={() => navigate("/catalogue")}>
                        Voir le catalogue
                    </button>
                </div>
            </main>
        );
    }

    const handleContinue = (event) => {
        event.preventDefault();
        sessionStorage.setItem("deliveryMode", deliveryMode);
        sessionStorage.setItem("shippingMethod", effectiveMethod);
        sessionStorage.setItem("pickupStore", pickupStore);
        navigate("/commande/paiement");
    };

    return (
        <main className="checkout-page">
            <div className="breadcrumb">Accueil / Panier / Commande</div>
            <div className="checkout-steps">
                <div className="step done">✓</div>
                <div className="step active">2</div>
                <div className="step">3</div>
                <div className="step">4</div>
            </div>
            <div className="checkout-step-labels">
                <span>Identification</span>
                <span>Livraison</span>
                <span>Paiement</span>
                <span>Confirmation</span>
            </div>

            <div className="checkout-layout">
                <section className="checkout-card">
                    <h2>Livraison</h2>

                    <div className="delivery-modes">
                        <button
                            type="button"
                            className={deliveryMode === "home" ? "active" : ""}
                            onClick={() => setDeliveryMode("home")}
                        >
                            <strong>Livraison à domicile</strong>
                            <span>Adresse + transporteur</span>
                        </button>
                        <button
                            type="button"
                            className={deliveryMode === "pickup" ? "active" : ""}
                            onClick={() => setDeliveryMode("pickup")}
                        >
                            <strong>Retrait en magasin</strong>
                            <span>Sans frais de livraison</span>
                        </button>
                    </div>

                    <form onSubmit={handleContinue}>
                        {deliveryMode === "home" ? (
                            <>
                                <div className="form-row">
                                    <label>
                                        Prénom
                                        <input type="text" defaultValue="Mathéo" required />
                                    </label>
                                    <label>
                                        Nom
                                        <input type="text" defaultValue="Lagier" required />
                                    </label>
                                </div>
                                <label>
                                    Adresse
                                    <input
                                        type="text"
                                        defaultValue="123 Rue de la République"
                                        required
                                    />
                                </label>
                                <div className="form-row">
                                    <label>
                                        Code postal
                                        <input type="text" defaultValue="75001" required />
                                    </label>
                                    <label>
                                        Ville
                                        <input type="text" defaultValue="Paris" required />
                                    </label>
                                </div>
                                <label>
                                    Téléphone
                                    <input type="tel" defaultValue="+33 7 67 59 35 84" required />
                                </label>

                                <h3>Transporteur et délai</h3>
                                <div className="shipping-options">
                                    <button
                                        type="button"
                                        className={method === "standard" ? "active" : ""}
                                        onClick={() => setMethod("standard")}
                                    >
                                        <div>
                                            <strong>Colissimo Standard</strong>
                                            <span>3-5 jours ouvrés</span>
                                        </div>
                                        <span>
                                            {getShippingCost(totalItems, "standard").toFixed(2)} €
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className={method === "express" ? "active" : ""}
                                        onClick={() => setMethod("express")}
                                    >
                                        <div>
                                            <strong>Chronopost Express</strong>
                                            <span>24-48h</span>
                                        </div>
                                        <span>
                                            {getShippingCost(totalItems, "express").toFixed(2)} €
                                        </span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <label>
                                    Choix du magasin
                                    <select
                                        value={pickupStore}
                                        onChange={(event) => setPickupStore(event.target.value)}
                                    >
                                        {stores.map((store) => (
                                            <option key={store} value={store}>
                                                {store}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <div className="pickup-note">
                                    Retrait sous 2h ouvrées après validation. Paiement différé
                                    possible en caisse.
                                </div>
                            </>
                        )}

                        <div className="checkout-actions">
                            <button
                                type="button"
                                className="ghost"
                                onClick={() => navigate("/commande/identification")}
                            >
                                Retour
                            </button>
                            <button type="submit" className="primary">
                                Continuer
                            </button>
                        </div>
                    </form>
                </section>

                <aside className="checkout-summary">
                    <h3>Récapitulatif</h3>
                    <div className="summary-items">
                        {items.map((item) => (
                            <div key={item.key ?? item.id} className="summary-item">
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <div>{item.name}</div>
                                    <span>Qté: {item.quantity}</span>
                                </div>
                                <strong>
                                    {(
                                        getDiscountedPrice(item.price, item.id) * item.quantity
                                    ).toFixed(2)}{" "}
                                    €
                                </strong>
                            </div>
                        ))}
                    </div>
                    <div className="summary-row">
                        <span>Sous-total</span>
                        <span>{totalPrice.toFixed(2)} €</span>
                    </div>
                    <div className="summary-row">
                        <span>Livraison</span>
                        <span>{shipping.toFixed(2)} €</span>
                    </div>
                    <div className="summary-total">
                        <span>Total TTC</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default CheckoutLivraison;
