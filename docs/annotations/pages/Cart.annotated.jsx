// Fichier annote automatiquement pour revision junior: src\pages\Cart.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Cart.jsx
 * @file Cart.jsx
// Ligne 3: Execute cette instruction: * Role: Panier avant commande.
 * Role: Panier avant commande.
// Ligne 4: Execute cette instruction: * Comment c est fait: Affiche les lignes panier, applique code promo, calcule le total final et prepare le checkout.
 * Comment c est fait: Affiche les lignes panier, applique code promo, calcule le total final et prepare le checkout.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useContext, useMemo, useState } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import { Link, useNavigate } from "react-router-dom";
// Ligne 9: Importe un module necessaire au composant ou a sa logique.
import { Helmet } from "react-helmet-async";
// Ligne 10: Importe un module necessaire au composant ou a sa logique.
import { CartContext } from "../context/cartContext.jsx";
// Ligne 11: Importe un module necessaire au composant ou a sa logique.
import { getDiscountedPrice, getDiscountPercent } from "../utils/discounts.js";
// Ligne 12: Importe un module necessaire au composant ou a sa logique.
import { getShippingCost } from "../utils/shipping.js";
// Ligne 13: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 14: Declare une variable locale utilisee par le composant.
const Cart = () => {
// Ligne 15: Declare une variable locale utilisee par le composant.
    const navigate = useNavigate();
// Ligne 16: Declare une variable locale utilisee par le composant.
    const { items, addItem, decreaseItem, removeItem, totalPrice, totalItems } = useContext(CartContext);
// Ligne 17: Declare une variable locale utilisee par le composant.
    const [promoCode, setPromoCode] = useState("");
// Ligne 18: Declare une variable locale utilisee par le composant.
    const [promoApplied, setPromoApplied] = useState(null);
// Ligne 19: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 20: Declare une variable locale utilisee par le composant.
    const subtotal = useMemo(() => totalPrice, [totalPrice]);
// Ligne 21: Declare une variable locale utilisee par le composant.
    const shipping = useMemo(() => getShippingCost(totalItems, "standard"), [totalItems]);
// Ligne 22: Declare une variable locale utilisee par le composant.
    const discount = promoApplied ? promoApplied.amount : 0;
// Ligne 23: Declare une variable locale utilisee par le composant.
    const total = Math.max(0, subtotal + shipping - discount);
// Ligne 24: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 25: Declare une variable locale utilisee par le composant.
    const handleApplyPromo = (event) => {
// Ligne 26: Execute cette instruction: event.preventDefault();
        event.preventDefault();
// Ligne 27: Declare une variable locale utilisee par le composant.
        const normalized = promoCode.trim().toUpperCase();
// Ligne 28: Applique une condition pour brancher le flux d execution.
        if (!normalized) {
// Ligne 29: Execute cette instruction: setPromoApplied(null);
            setPromoApplied(null);
// Ligne 30: Execute cette instruction: return;
            return;
// Ligne 31: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 32: Applique une condition pour brancher le flux d execution.
        if (normalized === "CAFTHE10") {
// Ligne 33: Declare une variable locale utilisee par le composant.
            const amount = subtotal * 0.1;
// Ligne 34: Execute cette instruction: setPromoApplied({ code: normalized, amount });
            setPromoApplied({ code: normalized, amount });
// Ligne 35: Execute cette instruction: return;
            return;
// Ligne 36: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 37: Execute cette instruction: setPromoApplied({ code: normalized, amount: 0, invalid: true });
        setPromoApplied({ code: normalized, amount: 0, invalid: true });
// Ligne 38: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 39: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 40: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 41: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="cart-page">
// Ligne 42: Ouvre un element JSX qui compose l interface utilisateur.
            <Helmet>
// Ligne 43: Ouvre un element JSX qui compose l interface utilisateur.
                <title>Mon panier | CafThe</title>
// Ligne 44: Ouvre un element JSX qui compose l interface utilisateur.
                <meta
// Ligne 45: Effectue une affectation ou initialise une valeur.
                    name="description"
// Ligne 46: Effectue une affectation ou initialise une valeur.
                    content="Consultez et modifiez votre panier CafThe avant de passer commande."
// Ligne 47: Execute cette instruction: />
                />
// Ligne 48: Declare un element JSX auto-fermante (sans enfants).
                <meta name="robots" content="noindex, nofollow" />
// Ligne 49: Ferme un element JSX dans l arborescence du rendu.
            </Helmet>
// Ligne 50: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="breadcrumb">Accueil / Panier</div>
// Ligne 51: Ouvre un element JSX qui compose l interface utilisateur.
            <h1>Mon panier ({items.length} articles)</h1>
// Ligne 52: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 53: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="cart-layout">
// Ligne 54: Ouvre un element JSX qui compose l interface utilisateur.
                <section className="cart-items">
// Ligne 55: Effectue une affectation ou initialise une valeur.
                    {items.length === 0 ? (
// Ligne 56: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="cart-empty-state">
// Ligne 57: Ouvre un element JSX qui compose l interface utilisateur.
                            <h2>Votre panier est vide</h2>
// Ligne 58: Ouvre un element JSX qui compose l interface utilisateur.
                            <p>Ajoutez des produits depuis notre catalogue.</p>
// Ligne 59: Ouvre un element JSX qui compose l interface utilisateur.
                            <button type="button" onClick={() => navigate("/catalogue")}>
// Ligne 60: Execute cette instruction: Voir le catalogue
                                Voir le catalogue
// Ligne 61: Ferme un element JSX dans l arborescence du rendu.
                            </button>
// Ligne 62: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 63: Execute cette instruction: ) : (
                    ) : (
// Ligne 64: Parcourt une collection pour generer une liste d elements.
                        items.map((item) => (
// Ligne 65: Ouvre un element JSX qui compose l interface utilisateur.
                            <article key={item.key ?? item.id} className="cart-item-card">
// Ligne 66: Declare un element JSX auto-fermante (sans enfants).
                                <img src={item.image} alt={item.name} />
// Ligne 67: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="cart-item-info">
// Ligne 68: Ouvre un element JSX qui compose l interface utilisateur.
                                    <h3>{item.name}</h3>
// Ligne 69: Ouvre un element JSX qui compose l interface utilisateur.
                                    <p>{item.variant ? `Poids: ${item.variant}` : "Unité"}</p>
// Ligne 70: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div className="cart-qty">
// Ligne 71: Ouvre un element JSX qui compose l interface utilisateur.
                                        <button type="button" onClick={() => decreaseItem(item.key ?? item.id)}>-</button>
// Ligne 72: Ouvre un element JSX qui compose l interface utilisateur.
                                        <span>{item.quantity}</span>
// Ligne 73: Ouvre un element JSX qui compose l interface utilisateur.
                                        <button type="button" onClick={() => addItem(item)}>+</button>
// Ligne 74: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 75: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 76: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="cart-item-price">
// Ligne 77: Ouvre un element JSX qui compose l interface utilisateur.
                                    <button
// Ligne 78: Effectue une affectation ou initialise une valeur.
                                        type="button"
// Ligne 79: Effectue une affectation ou initialise une valeur.
                                        className="remove"
// Ligne 80: Declare une fonction (handler, utilitaire ou composant).
                                        onClick={() => {
// Ligne 81: Applique une condition pour brancher le flux d execution.
                                            if (window.confirm("Supprimer cet article ?")) {
// Ligne 82: Execute cette instruction: removeItem(item.key ?? item.id);
                                                removeItem(item.key ?? item.id);
// Ligne 83: Ferme un bloc de code ou une structure de donnees.
                                            }
// Ligne 84: Ferme un bloc de code ou une structure de donnees.
                                        }}
// Ligne 85: Effectue une affectation ou initialise une valeur.
                                        aria-label="Supprimer"
// Ligne 86: Execute cette instruction: >
                                    >
// Ligne 87: Execute cette instruction: ✕
                                        ✕
// Ligne 88: Ferme un element JSX dans l arborescence du rendu.
                                    </button>
// Ligne 89: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div className="price-unit">
// Ligne 90: Execute cette instruction: {getDiscountPercent(item.id) > 0 && (
                                        {getDiscountPercent(item.id) > 0 && (
// Ligne 91: Ouvre un element JSX qui compose l interface utilisateur.
                                            <span className="price-old">{item.price.toFixed(2)} €</span>
// Ligne 92: Execute cette instruction: )}
                                        )}
// Ligne 93: Ouvre un element JSX qui compose l interface utilisateur.
                                        <span className="price-new">
// Ligne 94: Execute cette instruction: {getDiscountedPrice(item.price, item.id).toFixed(2)} € / unité
                                            {getDiscountedPrice(item.price, item.id).toFixed(2)} € / unité
// Ligne 95: Ferme un element JSX dans l arborescence du rendu.
                                        </span>
// Ligne 96: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 97: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div className="price-total">
// Ligne 98: Execute cette instruction: {(getDiscountedPrice(item.price, item.id) * item.quantity).toFixed(2)} €
                                        {(getDiscountedPrice(item.price, item.id) * item.quantity).toFixed(2)} €
// Ligne 99: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 100: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 101: Ferme un element JSX dans l arborescence du rendu.
                            </article>
// Ligne 102: Execute cette instruction: ))
                        ))
// Ligne 103: Execute cette instruction: )}
                    )}
// Ligne 104: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 105: Ouvre un element JSX qui compose l interface utilisateur.
                    <form className="promo-card" onSubmit={handleApplyPromo}>
// Ligne 106: Ouvre un element JSX qui compose l interface utilisateur.
                        <label>Code promo</label>
// Ligne 107: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="promo-row">
// Ligne 108: Ouvre un element JSX qui compose l interface utilisateur.
                            <input
// Ligne 109: Effectue une affectation ou initialise une valeur.
                                type="text"
// Ligne 110: Effectue une affectation ou initialise une valeur.
                                placeholder="Entrez votre code"
// Ligne 111: Effectue une affectation ou initialise une valeur.
                                value={promoCode}
// Ligne 112: Associe une reaction a la modification d un champ de formulaire.
                                onChange={(event) => setPromoCode(event.target.value)}
// Ligne 113: Execute cette instruction: />
                            />
// Ligne 114: Ouvre un element JSX qui compose l interface utilisateur.
                            <button type="submit">Appliquer</button>
// Ligne 115: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 116: Execute cette instruction: {promoApplied?.invalid && (
                        {promoApplied?.invalid && (
// Ligne 117: Ouvre un element JSX qui compose l interface utilisateur.
                            <span className="promo-error">Code non valide.</span>
// Ligne 118: Execute cette instruction: )}
                        )}
// Ligne 119: Execute cette instruction: {promoApplied && !promoApplied.invalid && (
                        {promoApplied && !promoApplied.invalid && (
// Ligne 120: Ouvre un element JSX qui compose l interface utilisateur.
                            <span className="promo-success">
// Ligne 121: Execute cette instruction: Code {promoApplied.code} appliqué (-{discount.toFixed(2)} €)
                                Code {promoApplied.code} appliqué (-{discount.toFixed(2)} €)
// Ligne 122: Ferme un element JSX dans l arborescence du rendu.
                            </span>
// Ligne 123: Execute cette instruction: )}
                        )}
// Ligne 124: Ferme un element JSX dans l arborescence du rendu.
                    </form>
// Ligne 125: Ferme un element JSX dans l arborescence du rendu.
                </section>
// Ligne 126: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 127: Ouvre un element JSX qui compose l interface utilisateur.
                <aside className="cart-summary">
// Ligne 128: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Récapitulatif</h2>
// Ligne 129: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-row">
// Ligne 130: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Sous-total</span>
// Ligne 131: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{subtotal.toFixed(2)} €</span>
// Ligne 132: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 133: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-row">
// Ligne 134: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Livraison</span>
// Ligne 135: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{shipping.toFixed(2)} €</span>
// Ligne 136: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 137: Execute cette instruction: {discount > 0 && (
                    {discount > 0 && (
// Ligne 138: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="summary-row">
// Ligne 139: Ouvre un element JSX qui compose l interface utilisateur.
                            <span>Remise</span>
// Ligne 140: Ouvre un element JSX qui compose l interface utilisateur.
                            <span>-{discount.toFixed(2)} €</span>
// Ligne 141: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 142: Execute cette instruction: )}
                    )}
// Ligne 143: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-total">
// Ligne 144: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Total TTC</span>
// Ligne 145: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{total.toFixed(2)} €</span>
// Ligne 146: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 147: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 148: Effectue une affectation ou initialise une valeur.
                        type="button"
// Ligne 149: Effectue une affectation ou initialise une valeur.
                        className="checkout"
// Ligne 150: Associe une action JavaScript a un clic utilisateur.
                        onClick={() => navigate("/commande/identification")}
// Ligne 151: Execute cette instruction: >
                    >
// Ligne 152: Execute cette instruction: Passer la commande
                        Passer la commande
// Ligne 153: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 154: Ouvre un element JSX qui compose l interface utilisateur.
                    <button type="button" className="continue" onClick={() => navigate("/catalogue")}>
// Ligne 155: Execute cette instruction: Continuer mes achats
                        Continuer mes achats
// Ligne 156: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 157: Ouvre un element JSX qui compose l interface utilisateur.
                    <ul>
// Ligne 158: Ouvre un element JSX qui compose l interface utilisateur.
                        <li>Paiement 100% sécurisé</li>
// Ligne 159: Ouvre un element JSX qui compose l interface utilisateur.
                        <li>Livraison rapide</li>
// Ligne 160: Ouvre un element JSX qui compose l interface utilisateur.
                        <li>Retour gratuit sous 30 jours</li>
// Ligne 161: Ferme un element JSX dans l arborescence du rendu.
                    </ul>
// Ligne 162: Ferme un element JSX dans l arborescence du rendu.
                </aside>
// Ligne 163: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 164: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 165: Execute cette instruction: );
    );
// Ligne 166: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 167: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 168: Expose ce composant comme export par defaut du fichier.
export default Cart;
// Ligne 169: Ligne vide pour aerer le code et separer les blocs logiques.
