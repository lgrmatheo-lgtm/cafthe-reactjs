// Fichier annote automatiquement pour revision junior: src\pages\CheckoutIdentification.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file CheckoutIdentification.jsx
 * @file CheckoutIdentification.jsx
// Ligne 3: Execute cette instruction: * Role: Etape 1 du tunnel d achat.
 * Role: Etape 1 du tunnel d achat.
// Ligne 4: Execute cette instruction: * Comment c est fait: Valide identification et stocke les infos de progression dans sessionStorage.
 * Comment c est fait: Valide identification et stocke les infos de progression dans sessionStorage.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useContext, useMemo, useState } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import { Link, useNavigate } from "react-router-dom";
// Ligne 9: Importe un module necessaire au composant ou a sa logique.
import { CartContext } from "../context/cartContext.jsx";
// Ligne 10: Importe un module necessaire au composant ou a sa logique.
import { getDiscountedPrice } from "../utils/discounts.js";
// Ligne 11: Importe un module necessaire au composant ou a sa logique.
import { getShippingCost } from "../utils/shipping.js";
// Ligne 12: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 13: Declare une variable locale utilisee par le composant.
const CheckoutIdentification = () => {
// Ligne 14: Declare une variable locale utilisee par le composant.
    const navigate = useNavigate();
// Ligne 15: Declare une variable locale utilisee par le composant.
    const { items, totalPrice, totalItems } = useContext(CartContext);
// Ligne 16: Declare une variable locale utilisee par le composant.
    const [email, setEmail] = useState(
// Ligne 17: Execute cette instruction: sessionStorage.getItem("checkout_email") || ""
        sessionStorage.getItem("checkout_email") || ""
// Ligne 18: Execute cette instruction: );
    );
// Ligne 19: Declare une variable locale utilisee par le composant.
    const shippingMethod = sessionStorage.getItem("shippingMethod") || "standard";
// Ligne 20: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 21: Declare une variable locale utilisee par le composant.
    const shipping = useMemo(
// Ligne 22: Effectue une affectation ou initialise une valeur.
        () => getShippingCost(totalItems, shippingMethod),
// Ligne 23: Execute cette instruction: [totalItems, shippingMethod]
        [totalItems, shippingMethod]
// Ligne 24: Execute cette instruction: );
    );
// Ligne 25: Declare une variable locale utilisee par le composant.
    const total = useMemo(
// Ligne 26: Effectue une affectation ou initialise une valeur.
        () => totalPrice + (items.length ? shipping : 0),
// Ligne 27: Execute cette instruction: [totalPrice, items.length, shipping]
        [totalPrice, items.length, shipping]
// Ligne 28: Execute cette instruction: );
    );
// Ligne 29: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 30: Applique une condition pour brancher le flux d execution.
    if (items.length === 0) {
// Ligne 31: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 32: Ouvre un element JSX qui compose l interface utilisateur.
            <main className="checkout-page">
// Ligne 33: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="checkout-empty">
// Ligne 34: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Votre panier est vide</h2>
// Ligne 35: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>Ajoutez des produits avant de passer commande.</p>
// Ligne 36: Ouvre un element JSX qui compose l interface utilisateur.
                    <button type="button" onClick={() => navigate("/catalogue")}>
// Ligne 37: Execute cette instruction: Voir le catalogue
                        Voir le catalogue
// Ligne 38: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 39: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 40: Ferme un element JSX dans l arborescence du rendu.
            </main>
// Ligne 41: Execute cette instruction: );
        );
// Ligne 42: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 43: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 44: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 45: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="checkout-page">
// Ligne 46: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="breadcrumb">Accueil / Panier / Commande</div>
// Ligne 47: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="checkout-steps">
// Ligne 48: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step active">1</div>
// Ligne 49: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step">2</div>
// Ligne 50: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step">3</div>
// Ligne 51: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step">4</div>
// Ligne 52: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 53: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="checkout-step-labels">
// Ligne 54: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Identification</span>
// Ligne 55: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Livraison</span>
// Ligne 56: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Paiement</span>
// Ligne 57: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Confirmation</span>
// Ligne 58: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 59: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 60: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="checkout-layout">
// Ligne 61: Ouvre un element JSX qui compose l interface utilisateur.
                <section className="checkout-card">
// Ligne 62: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Identification</h2>
// Ligne 63: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="checkout-switch">
// Ligne 64: Ouvre un element JSX qui compose l interface utilisateur.
                        <Link to="/login">Je me connecte</Link>
// Ligne 65: Ouvre un element JSX qui compose l interface utilisateur.
                        <Link to="/inscription" className="ghost">Je crée un compte</Link>
// Ligne 66: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 67: Ouvre un element JSX qui compose l interface utilisateur.
                    <form
// Ligne 68: Declare une fonction (handler, utilitaire ou composant).
                        onSubmit={(event) => {
// Ligne 69: Execute cette instruction: event.preventDefault();
                            event.preventDefault();
// Ligne 70: Applique une condition pour brancher le flux d execution.
                            if (email.trim()) {
// Ligne 71: Execute cette instruction: sessionStorage.setItem("checkout_email", email.trim());
                                sessionStorage.setItem("checkout_email", email.trim());
// Ligne 72: Ferme un bloc de code ou une structure de donnees.
                            }
// Ligne 73: Declenche une navigation vers une autre route de l application.
                            navigate("/commande/livraison");
// Ligne 74: Ferme un bloc de code ou une structure de donnees.
                        }}
// Ligne 75: Execute cette instruction: >
                    >
// Ligne 76: Ouvre un element JSX qui compose l interface utilisateur.
                        <label>
// Ligne 77: Execute cette instruction: Email
                            Email
// Ligne 78: Ouvre un element JSX qui compose l interface utilisateur.
                            <input
// Ligne 79: Effectue une affectation ou initialise une valeur.
                                type="email"
// Ligne 80: Effectue une affectation ou initialise une valeur.
                                placeholder="votre@email.com"
// Ligne 81: Effectue une affectation ou initialise une valeur.
                                value={email}
// Ligne 82: Associe une reaction a la modification d un champ de formulaire.
                                onChange={(event) => setEmail(event.target.value)}
// Ligne 83: Execute cette instruction: required
                                required
// Ligne 84: Execute cette instruction: />
                            />
// Ligne 85: Ferme un element JSX dans l arborescence du rendu.
                        </label>
// Ligne 86: Ouvre un element JSX qui compose l interface utilisateur.
                        <label>
// Ligne 87: Execute cette instruction: Mot de passe
                            Mot de passe
// Ligne 88: Declare un element JSX auto-fermante (sans enfants).
                            <input type="password" placeholder="••••••••" required />
// Ligne 89: Ferme un element JSX dans l arborescence du rendu.
                        </label>
// Ligne 90: Ouvre un element JSX qui compose l interface utilisateur.
                        <button type="submit" className="primary">Continuer</button>
// Ligne 91: Ferme un element JSX dans l arborescence du rendu.
                    </form>
// Ligne 92: Ferme un element JSX dans l arborescence du rendu.
                </section>
// Ligne 93: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 94: Ouvre un element JSX qui compose l interface utilisateur.
                <aside className="checkout-summary">
// Ligne 95: Ouvre un element JSX qui compose l interface utilisateur.
                    <h3>Récapitulatif</h3>
// Ligne 96: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-items">
// Ligne 97: Parcourt une collection pour generer une liste d elements.
                        {items.map((item) => (
// Ligne 98: Ouvre un element JSX qui compose l interface utilisateur.
                            <div key={item.key ?? item.id} className="summary-item">
// Ligne 99: Declare un element JSX auto-fermante (sans enfants).
                                <img src={item.image} alt={item.name} />
// Ligne 100: Ouvre un element JSX qui compose l interface utilisateur.
                                <div>
// Ligne 101: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div>{item.name}</div>
// Ligne 102: Ouvre un element JSX qui compose l interface utilisateur.
                                    <span>Qté: {item.quantity}</span>
// Ligne 103: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 104: Ouvre un element JSX qui compose l interface utilisateur.
                                <strong>
// Ligne 105: Execute cette instruction: {(getDiscountedPrice(item.price, item.id) * item.quantity).toFixed(2)} €
                                    {(getDiscountedPrice(item.price, item.id) * item.quantity).toFixed(2)} €
// Ligne 106: Ferme un element JSX dans l arborescence du rendu.
                                </strong>
// Ligne 107: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 108: Execute cette instruction: ))}
                        ))}
// Ligne 109: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 110: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-row">
// Ligne 111: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Sous-total</span>
// Ligne 112: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{totalPrice.toFixed(2)} €</span>
// Ligne 113: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 114: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-row">
// Ligne 115: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Livraison {shippingMethod === "pickup" ? "(retrait magasin)" : ""}</span>
// Ligne 116: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{shipping.toFixed(2)} €</span>
// Ligne 117: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 118: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-total">
// Ligne 119: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Total TTC</span>
// Ligne 120: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{total.toFixed(2)} €</span>
// Ligne 121: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 122: Ferme un element JSX dans l arborescence du rendu.
                </aside>
// Ligne 123: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 124: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 125: Execute cette instruction: );
    );
// Ligne 126: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 127: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 128: Expose ce composant comme export par defaut du fichier.
export default CheckoutIdentification;
// Ligne 129: Ligne vide pour aerer le code et separer les blocs logiques.
