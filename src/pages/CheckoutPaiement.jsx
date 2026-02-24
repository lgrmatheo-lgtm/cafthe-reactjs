/**
 * @file CheckoutPaiement.jsx
 * Role: Etape 3 du tunnel d achat.
 * Comment c est fait: Collecte le mode de paiement puis confirme les informations avant creation de commande.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";
import { getDiscountedPrice } from "../utils/discounts.js";
import { getShippingCost } from "../utils/shipping.js";

const CheckoutPaiement = () => {
    const navigate = useNavigate();
    const { items, totalPrice, totalItems } = useContext(CartContext);
    const deliveryMode = sessionStorage.getItem("deliveryMode") || "home";
    const shippingMethod = sessionStorage.getItem("shippingMethod") || "standard";
    const [method, setMethod] = useState(
        deliveryMode === "pickup" ? "later" : "card"
    );
    const shipping = useMemo(
        () => getShippingCost(totalItems, shippingMethod),
        [totalItems, shippingMethod]
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const now = new Date();
        const checkoutEmail = sessionStorage.getItem("checkout_email") || "";
        const order = {
            id: `#CM${now.getFullYear()}-${Date.now().toString().slice(-5)}`,
            date: now.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
            createdAt: now.toISOString(),
            status: "En attente",
            items,
            subtotal: totalPrice,
            shipping,
            total,
            deliveryMode,
            shippingMethod,
            paymentMethod: method,
            clientEmail: checkoutEmail,
            emailSentAt: now.toISOString(),
        };

        sessionStorage.setItem("last_order", JSON.stringify(order));
        navigate("/commande/confirmation");
    };

    const canUseDeferred = deliveryMode === "pickup";

    return (
        <main className="checkout-page">
            <div className="breadcrumb">Accueil / Panier / Commande</div>
            <div className="checkout-steps">
                <div className="step done">✓</div>
                <div className="step done">✓</div>
                <div className="step active">3</div>
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
                    <h2>Paiement</h2>
                    <div className="payment-methods">
                        <button
                            type="button"
                            className={method === "card" ? "active" : ""}
                            onClick={() => setMethod("card")}
                        >
                            Carte bancaire
                        </button>
                        <button
                            type="button"
                            className={method === "paypal" ? "active" : ""}
                            onClick={() => setMethod("paypal")}
                        >
                            PayPal
                        </button>
                        {canUseDeferred && (
                            <button
                                type="button"
                                className={method === "later" ? "active" : ""}
                                onClick={() => setMethod("later")}
                            >
                                Paiement différé en magasin
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        {method !== "later" ? (
                            <>
                                <div className="form-row">
                                    <label>
                                        Numéro de carte
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="form-row">
                                    <label>
                                        Date d'expiration
                                        <input type="text" placeholder="MM/AA" required />
                                    </label>
                                    <label>
                                        CVV
                                        <input type="text" placeholder="123" required />
                                    </label>
                                </div>
                            </>
                        ) : (
                            <div className="pickup-note">
                                Le paiement sera effectué en caisse lors du retrait.
                            </div>
                        )}
                        <div className="checkout-actions">
                            <button
                                type="button"
                                className="ghost"
                                onClick={() => navigate("/commande/livraison")}
                            >
                                Retour
                            </button>
                            <button type="submit" className="primary">
                                {method === "later" ? "Valider ma commande" : "Valider le paiement"}
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

export default CheckoutPaiement;
