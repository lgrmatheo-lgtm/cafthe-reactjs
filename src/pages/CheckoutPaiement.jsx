import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { CartContext } from "../context/cartContext.jsx";
import CheckoutTunnel from "../components/CheckoutTunnel.jsx";
import CheckoutSummary from "../components/CheckoutSummary.jsx";
import { getShippingCost } from "../utils/shipping.js";
import "../styles/CheckoutPaiement.css";

const DELIVERY_MODE_KEY = "cafthe_delivery_mode";
const ORDERS_STORAGE_KEY = "cafthe_orders";
const LAST_ORDER_KEY = "cafthe_last_order_id";

const getStoredDeliveryMode = () => {
    if (typeof window === "undefined") return "standard";
    return sessionStorage.getItem(DELIVERY_MODE_KEY) || "standard";
};

const loadOrders = () => {
    try {
        const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch {
        return [];
    }
};

const CheckoutPaiement = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { items, totalItems, totalPrice, clear } = useContext(CartContext);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const deliveryMode = getStoredDeliveryMode();

    useEffect(() => {
        document.title = "Paiement | CafThe";
    }, []);

    const handleConfirmPayment = () => {
        if (isCreatingOrder || items.length === 0) return;
        setIsCreatingOrder(true);

        try {
            const now = new Date();
            const orderId = `WEB-${now.getTime()}`;
            const shipping = getShippingCost(totalItems, deliveryMode);
            const subtotal = totalPrice;
            const total = Math.max(0, subtotal + shipping);

            const order = {
                id: orderId,
                date: now.toLocaleDateString("fr-FR"),
                status: "En attente",
                items: items.map((item) => ({ ...item })),
                subtotal,
                shipping,
                total,
                clientEmail: user?.email ?? "",
                createdAt: now.toISOString(),
                deliveryMode,
                paymentMethod,
            };

            const next = [order, ...loadOrders()];
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
            sessionStorage.setItem(LAST_ORDER_KEY, orderId);
            clear();
            navigate("/checkout/confirmation", { state: { orderId } });
        } catch (error) {
            console.error("Erreur creation commande:", error);
            setIsCreatingOrder(false);
        }
    };

    if (items.length === 0) {
        return (
            <main className="checkout-page">
                <div className="breadcrumb">Accueil / Panier / Paiement</div>
                <h1>Paiement</h1>
                <CheckoutTunnel activeStep={3} />
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
            <div className="breadcrumb">Accueil / Panier / Paiement</div>
            <h1>Paiement</h1>
            <CheckoutTunnel activeStep={3} />

            <div className="checkout-layout">
                <section className="checkout-card">
                    <h2>Methode de paiement</h2>
                    <div className="payment-methods">
                        <button
                            type="button"
                            className={paymentMethod === "card" ? "active" : ""}
                            onClick={() => setPaymentMethod("card")}
                        >
                            Carte bancaire
                        </button>
                        <button
                            type="button"
                            className={paymentMethod === "paypal" ? "active" : ""}
                            onClick={() => setPaymentMethod("paypal")}
                        >
                            PayPal
                        </button>
                        <button
                            type="button"
                            className={paymentMethod === "apple" ? "active" : ""}
                            onClick={() => setPaymentMethod("apple")}
                        >
                            Apple Pay
                        </button>
                    </div>

                    <form>
                        <input type="text" placeholder="Nom sur la carte" />
                        <input type="text" placeholder="Numero de carte" />
                        <div className="checkout-switch">
                            <input type="text" placeholder="MM/AA" />
                            <input type="text" placeholder="CVC" />
                        </div>
                    </form>

                    <div className="checkout-actions">
                        <button type="button" className="ghost" onClick={() => navigate("/checkout/livraison")}>
                            Retour livraison
                        </button>
                        <button
                            type="button"
                            className="primary"
                            onClick={handleConfirmPayment}
                            disabled={isCreatingOrder}
                        >
                            Confirmer le paiement
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

export default CheckoutPaiement;



