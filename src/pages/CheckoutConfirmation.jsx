import React, { useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";
import CheckoutTunnel from "../components/CheckoutTunnel.jsx";
import CheckoutSummary from "../components/CheckoutSummary.jsx";
import "../styles/CheckoutConfirmation.css";

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

const CheckoutConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { items, totalItems, totalPrice } = useContext(CartContext);
    const deliveryMode = getStoredDeliveryMode();
    const orderIdFromState = location.state?.orderId;
    const lastOrderId = typeof window === "undefined" ? null : sessionStorage.getItem(LAST_ORDER_KEY);
    const resolvedOrderId = orderIdFromState || lastOrderId;

    const order = useMemo(() => {
        if (!resolvedOrderId) return null;
        const orders = loadOrders();
        return orders.find((entry) => String(entry.id) === String(resolvedOrderId)) || null;
    }, [resolvedOrderId]);

    const displayItems = order?.items ?? items;
    const displayTotalItems = order
        ? order.items.reduce((sum, entry) => sum + Number(entry.quantity ?? 0), 0)
        : totalItems;
    const displaySubtotal = order?.subtotal ?? totalPrice;
    const displayDeliveryMode = order?.deliveryMode ?? deliveryMode;

    useEffect(() => {
        document.title = "Confirmation | CafThe";
    }, []);

    if (!order && items.length === 0) {
        return (
            <main className="checkout-page">
                <div className="breadcrumb">Accueil / Panier / Confirmation</div>
                <h1>Confirmation</h1>
                <CheckoutTunnel activeStep={4} />
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
            <div className="breadcrumb">Accueil / Panier / Confirmation</div>
            <h1>Confirmation</h1>
            <CheckoutTunnel activeStep={4} />

            <div className="checkout-layout">
                <section className="checkout-card confirm-card">
                    <div className="confirm-icon">✓</div>
                    <h2>Commande confirmee</h2>
                    <p>Merci pour votre achat. Votre commande est en preparation.</p>
                    <div className="confirm-mail">
                        Un email de confirmation a ete envoye a votre adresse.
                    </div>
                    {order && (
                        <p>Numero de commande : {order.id}</p>
                    )}
                    <div className="confirm-actions">
                        <button type="button" className="primary" onClick={() => navigate("/")}>
                            Retour a l'accueil
                        </button>
                        <button type="button" className="ghost" onClick={() => navigate("/profil")}>
                            Voir mon compte
                        </button>
                    </div>
                </section>

                <CheckoutSummary
                    items={displayItems}
                    totalItems={displayTotalItems}
                    totalPrice={displaySubtotal}
                    deliveryMode={displayDeliveryMode}
                    shippingOverride={typeof order?.shipping === "number" ? order.shipping : null}
                    totalOverride={typeof order?.total === "number" ? order.total : null}
                />
            </div>
        </main>
    );
};

export default CheckoutConfirmation;



