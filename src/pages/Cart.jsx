/**
 * @file Cart.jsx
 * Role: Panier utilisateur.
 * Comment c est fait: Affiche les lignes panier, applique code promo et calcule le total final.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../context/authContext.jsx";
import { CartContext } from "../context/cartContext.jsx";
import { getDiscountedPrice, getDiscountPercent } from "../utils/discounts.js";
import { getShippingCost } from "../utils/shipping.js";

const Cart = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const { items, addItem, decreaseItem, removeItem, totalPrice, totalItems } = useContext(CartContext);
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(null);

    const subtotal = useMemo(() => totalPrice, [totalPrice]);
    const shipping = useMemo(() => getShippingCost(totalItems, "standard"), [totalItems]);
    const discount = promoApplied ? promoApplied.amount : 0;
    const total = Math.max(0, subtotal + shipping - discount);

    const handleApplyPromo = (event) => {
        event.preventDefault();
        const normalized = promoCode.trim().toUpperCase();
        if (!normalized) {
            setPromoApplied(null);
            return;
        }
        if (normalized === "CAFTHE10") {
            const amount = subtotal * 0.1;
            setPromoApplied({ code: normalized, amount });
            return;
        }
        setPromoApplied({ code: normalized, amount: 0, invalid: true });
    };

    return (
        <main className="cart-page">
            <Helmet>
                <title>Mon panier | CafThe</title>
                <meta
                    name="description"
                    content="Consultez et modifiez votre panier CafThe."
                />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="breadcrumb">Accueil / Panier</div>
            <h1>Mon panier ({items.length} articles)</h1>

            <div className="cart-layout">
                <section className="cart-items">
                    {items.length === 0 ? (
                        <div className="cart-empty-state">
                            <h2>Votre panier est vide</h2>
                            <p>Ajoutez des produits depuis notre catalogue.</p>
                            <button type="button" onClick={() => navigate("/catalogue")}>
                                Voir le catalogue
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <article key={item.key ?? item.id} className="cart-item-card">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.variant ? `Poids: ${item.variant}` : "Unité"}</p>
                                    <div className="cart-qty">
                                        <button type="button" onClick={() => decreaseItem(item.key ?? item.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button type="button" onClick={() => addItem(item)}>+</button>
                                    </div>
                                </div>
                                <div className="cart-item-price">
                                    <button
                                        type="button"
                                        className="remove"
                                        onClick={() => {
                                            if (window.confirm("Supprimer cet article ?")) {
                                                removeItem(item.key ?? item.id);
                                            }
                                        }}
                                        aria-label="Supprimer"
                                    >
                                        ✕
                                    </button>
                                    <div className="price-unit">
                                        {getDiscountPercent(item.id) > 0 && (
                                            <span className="price-old">{item.price.toFixed(2)} €</span>
                                        )}
                                        <span className="price-new">
                                            {getDiscountedPrice(item.price, item.id).toFixed(2)} € / unité
                                        </span>
                                    </div>
                                    <div className="price-total">
                                        {(getDiscountedPrice(item.price, item.id) * item.quantity).toFixed(2)} €
                                    </div>
                                </div>
                            </article>
                        ))
                    )}

                    <form className="promo-card" onSubmit={handleApplyPromo}>
                        <label>Code promo</label>
                        <div className="promo-row">
                            <input
                                type="text"
                                placeholder="Entrez votre code"
                                value={promoCode}
                                onChange={(event) => setPromoCode(event.target.value)}
                            />
                            <button type="submit">Appliquer</button>
                        </div>
                        {promoApplied?.invalid && (
                            <span className="promo-error">Code non valide.</span>
                        )}
                        {promoApplied && !promoApplied.invalid && (
                            <span className="promo-success">
                                Code {promoApplied.code} appliqué (-{discount.toFixed(2)} €)
                            </span>
                        )}
                    </form>
                </section>

                <aside className="cart-summary">
                    <h2>Récapitulatif</h2>
                    <div className="summary-row">
                        <span>Sous-total</span>
                        <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="summary-row">
                        <span>Livraison</span>
                        <span>{shipping.toFixed(2)} €</span>
                    </div>
                    {discount > 0 && (
                        <div className="summary-row">
                            <span>Remise</span>
                            <span>-{discount.toFixed(2)} €</span>
                        </div>
                    )}
                    <div className="summary-total">
                        <span>Total TTC</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>
                    {isAuthenticated ? (
                        <button
                            type="button"
                            className="checkout"
                            onClick={() => navigate("/profil")}
                        >
                            Voir mon compte
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="checkout"
                                onClick={() => navigate("/login")}
                            >
                                Se connecter
                            </button>
                            <button type="button" className="continue" onClick={() => navigate("/inscription")}>
                                Créer un compte
                            </button>
                        </>
                    )}
                    <button type="button" className="continue" onClick={() => navigate("/catalogue")}>
                        Continuer mes achats
                    </button>
                    <ul>
                        <li>Connexion requise pour commander</li>
                        <li>Support client disponible</li>
                        <li>Retour gratuit sous 30 jours</li>
                    </ul>
                </aside>
            </div>
        </main>
    );
};

export default Cart;
