/**
 * @file OrderDetails.jsx
 * Role: Detail d une commande.
 * Comment c est fait: Recharge une commande depuis son id et propose des actions (recommande, retour compte).
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDiscountedPrice } from "../utils/discounts.js";
import { CartContext } from "../context/cartContext.jsx";
import "../styles/OrderDetails.css";

const OrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { replaceCart } = useContext(CartContext);

    let order = null;
    try {
        const raw = localStorage.getItem("cafthe_orders");
        if (raw) {
            const orders = JSON.parse(raw);
            order = orders.find((item) => String(item.id) === String(id));
        }
    } catch {
        order = null;
    }

    if (!order) {
        return (
            <main className="order-details-page">
                <div className="checkout-empty">
                    <h2>Commande introuvable</h2>
                    <button type="button" onClick={() => navigate("/profil")}>Retour au compte</button>
                </div>
            </main>
        );
    }

    return (
        <main className="order-details-page">
            <div className="breadcrumb">Accueil / Mon compte / Commande {order.id}</div>
            <div className="order-details-card">
                <div>
                    <h1>Commande {order.id}</h1>
                    <p>Statut : {order.status}</p>
                    <p>Date : {order.date}</p>
                </div>
                <div className="order-details-items">
                    {order.items.map((item) => (
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
                <div className="summary-row"><span>Sous-total</span><span>{order.subtotal.toFixed(2)} €</span></div>
                <div className="summary-row"><span>Livraison</span><span>{order.shipping.toFixed(2)} €</span></div>
                <div className="summary-total"><span>Total TTC</span><span>{order.total.toFixed(2)} €</span></div>
                <div className="confirm-actions">
                    <button
                        type="button"
                        className="primary"
                        onClick={() => {
                            replaceCart(order.items);
                            navigate("/panier");
                        }}
                    >
                        Commander à l'identique
                    </button>
                    <button type="button" className="ghost" onClick={() => navigate("/profil")}>
                        Retour à mon compte
                    </button>
                </div>
            </div>
        </main>
    );
};

export default OrderDetails;



