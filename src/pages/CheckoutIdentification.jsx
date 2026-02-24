/**
 * @file CheckoutIdentification.jsx
 * Role: Etape 1 du tunnel d achat.
 * Comment c est fait: Valide identification et stocke les infos de progression dans sessionStorage.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";
import { getDiscountedPrice } from "../utils/discounts.js";
import { getShippingCost } from "../utils/shipping.js";

const CheckoutIdentification = () => {
    const navigate = useNavigate();
    const { items, totalPrice, totalItems } = useContext(CartContext);
    const [email, setEmail] = useState(
        sessionStorage.getItem("checkout_email") || ""
    );
    const shippingMethod = sessionStorage.getItem("shippingMethod") || "standard";

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
                    <p>Ajoutez des produits avant de passer commande.</p>
                    <button type="button" onClick={() => navigate("/catalogue")}>
                        Voir le catalogue
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <div className="breadcrumb">Accueil / Panier / Commande</div>
            <div className="checkout-steps">
                <div className="step active">1</div>
                <div className="step">2</div>
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
                    <h2>Identification</h2>
                    <div className="checkout-switch">
                        <Link to="/login">Je me connecte</Link>
                        <Link to="/inscription" className="ghost">Je crée un compte</Link>
                    </div>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (email.trim()) {
                                sessionStorage.setItem("checkout_email", email.trim());
                            }
                            navigate("/commande/livraison");
                        }}
                    >
                        <label>
                            Email
                            <input
                                type="email"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Mot de passe
                            <input type="password" placeholder="••••••••" required />
                        </label>
                        <button type="submit" className="primary">Continuer</button>
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
                                    {(getDiscountedPrice(item.price, item.id) * item.quantity).toFixed(2)} €
                                </strong>
                            </div>
                        ))}
                    </div>
                    <div className="summary-row">
                        <span>Sous-total</span>
                        <span>{totalPrice.toFixed(2)} €</span>
                    </div>
                    <div className="summary-row">
                        <span>Livraison {shippingMethod === "pickup" ? "(retrait magasin)" : ""}</span>
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

export default CheckoutIdentification;
