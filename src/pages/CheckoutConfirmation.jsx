/**
 * @file CheckoutConfirmation.jsx
 * Role: Etape 4 du tunnel d achat.
 * Comment c est fait: Finalise, enregistre la commande et nettoie le panier pour cloturer le parcours.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";
import { getDiscountedPrice } from "../utils/discounts.js";
import { getShippingCost } from "../utils/shipping.js";

const CheckoutConfirmation = () => {
    const navigate = useNavigate();
    const { items, totalPrice, totalItems, clear } = useContext(CartContext);
    const [order, setOrder] = useState(null);
    const shippingMethod = sessionStorage.getItem("shippingMethod") || "standard";
    const shipping = useMemo(() => getShippingCost(totalItems, shippingMethod), [totalItems, shippingMethod]);
    const total = useMemo(() => totalPrice + (items.length ? shipping : 0), [totalPrice, items.length, shipping]);

    useEffect(() => {
        const raw = sessionStorage.getItem("last_order");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        setOrder(parsed);

        const ordersRaw = localStorage.getItem("cafthe_orders");
        const orders = ordersRaw ? JSON.parse(ordersRaw) : [];
        const exists = orders.some((item) => String(item.id) === String(parsed.id));
        if (!exists) {
            const next = [parsed, ...orders];
            localStorage.setItem("cafthe_orders", JSON.stringify(next));
        }

        const mailRaw = localStorage.getItem("cafthe_emails");
        const sentMails = mailRaw ? JSON.parse(mailRaw) : [];
        const alreadySent = sentMails.some((mail) => mail.orderId === parsed.id);
        if (!alreadySent) {
            const nextEmails = [
                {
                    orderId: parsed.id,
                    subject: `Confirmation de commande ${parsed.id}`,
                    sentAt: parsed.emailSentAt ?? new Date().toISOString(),
                },
                ...sentMails,
            ];
            localStorage.setItem("cafthe_emails", JSON.stringify(nextEmails));
        }
    }, []);

    const handleGoAccount = () => {
        clear();
        navigate("/profil");
    };

    const handleGoHome = () => {
        clear();
        navigate("/");
    };

    if (items.length === 0 && !order) {
        return (
            <main className="checkout-page">
                <div className="checkout-empty">
                    <h2>Commande confirmée</h2>
                    <button type="button" onClick={() => navigate("/")}>Retour à l'accueil</button>
                </div>
            </main>
        );
    }

    const displayItems = order?.items ?? items;

    return (
        <main className="checkout-page">
            <div className="breadcrumb">Accueil / Panier / Commande</div>
            <div className="checkout-steps">
                <div className="step done">✓</div>
                <div className="step done">✓</div>
                <div className="step done">✓</div>
                <div className="step active">4</div>
            </div>
            <div className="checkout-step-labels">
                <span>Identification</span>
                <span>Livraison</span>
                <span>Paiement</span>
                <span>Confirmation</span>
            </div>

            <div className="checkout-layout">
                <section className="checkout-card confirm-card">
                    <div className="confirm-icon">✓</div>
                    <h2>Commande confirmée !</h2>
                    <p>Merci pour votre commande.</p>
                    <strong>Numéro de commande : {order?.id ?? "#CM2026-00142"}</strong>
                    <p className="confirm-mail">
                        Un email de confirmation a été envoyé automatiquement.
                    </p>
                    <div className="confirm-actions">
                        <button type="button" className="primary" onClick={handleGoAccount}>Voir mes commandes</button>
                        <button type="button" className="ghost" onClick={handleGoHome}>Retour à l'accueil</button>
                    </div>
                </section>

                <aside className="checkout-summary">
                    <h3>Récapitulatif</h3>
                    <div className="summary-items">
                        {displayItems.map((item) => (
                            <div key={item.key ?? item.id} className="summary-item">
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <div>{item.name}</div>
                                    <span>Qté: {item.quantity}</span>
                                </div>
                                <strong>{(getDiscountedPrice(item.price, item.id) * item.quantity).toFixed(2)} €</strong>
                            </div>
                        ))}
                    </div>
                    <div className="summary-row"><span>Sous-total</span><span>{(order?.subtotal ?? totalPrice).toFixed(2)} €</span></div>
                    <div className="summary-row"><span>Livraison</span><span>{(order?.shipping ?? shipping).toFixed(2)} €</span></div>
                    <div className="summary-total"><span>Total TTC</span><span>{(order?.total ?? total).toFixed(2)} €</span></div>
                </aside>
            </div>
        </main>
    );
};

export default CheckoutConfirmation;
