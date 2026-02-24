// Fichier annote automatiquement pour revision junior: src\pages\CheckoutPaiement.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file CheckoutPaiement.jsx
 * @file CheckoutPaiement.jsx
// Ligne 3: Execute cette instruction: * Role: Etape 3 du tunnel d achat.
 * Role: Etape 3 du tunnel d achat.
// Ligne 4: Execute cette instruction: * Comment c est fait: Collecte le mode de paiement puis confirme les informations avant creation de commande.
 * Comment c est fait: Collecte le mode de paiement puis confirme les informations avant creation de commande.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useContext, useMemo, useState } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import { useNavigate } from "react-router-dom";
// Ligne 9: Importe un module necessaire au composant ou a sa logique.
import { CartContext } from "../context/cartContext.jsx";
// Ligne 10: Importe un module necessaire au composant ou a sa logique.
import { getDiscountedPrice } from "../utils/discounts.js";
// Ligne 11: Importe un module necessaire au composant ou a sa logique.
import { getShippingCost } from "../utils/shipping.js";
// Ligne 12: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 13: Declare une variable locale utilisee par le composant.
const CheckoutPaiement = () => {
// Ligne 14: Declare une variable locale utilisee par le composant.
    const navigate = useNavigate();
// Ligne 15: Declare une variable locale utilisee par le composant.
    const { items, totalPrice, totalItems } = useContext(CartContext);
// Ligne 16: Declare une variable locale utilisee par le composant.
    const deliveryMode = sessionStorage.getItem("deliveryMode") || "home";
// Ligne 17: Declare une variable locale utilisee par le composant.
    const shippingMethod = sessionStorage.getItem("shippingMethod") || "standard";
// Ligne 18: Declare une variable locale utilisee par le composant.
    const [method, setMethod] = useState(
// Ligne 19: Effectue une affectation ou initialise une valeur.
        deliveryMode === "pickup" ? "later" : "card"
// Ligne 20: Execute cette instruction: );
    );
// Ligne 21: Declare une variable locale utilisee par le composant.
    const shipping = useMemo(
// Ligne 22: Effectue une affectation ou initialise une valeur.
        () => getShippingCost(totalItems, shippingMethod),
// Ligne 23: Execute cette instruction: [totalItems, shippingMethod]
        [totalItems, shippingMethod]
// Ligne 24: Execute cette instruction: );
    );
// Ligne 25: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 26: Declare une variable locale utilisee par le composant.
    const total = useMemo(
// Ligne 27: Effectue une affectation ou initialise une valeur.
        () => totalPrice + (items.length ? shipping : 0),
// Ligne 28: Execute cette instruction: [totalPrice, items.length, shipping]
        [totalPrice, items.length, shipping]
// Ligne 29: Execute cette instruction: );
    );
// Ligne 30: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 31: Applique une condition pour brancher le flux d execution.
    if (items.length === 0) {
// Ligne 32: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 33: Ouvre un element JSX qui compose l interface utilisateur.
            <main className="checkout-page">
// Ligne 34: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="checkout-empty">
// Ligne 35: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Votre panier est vide</h2>
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

// Ligne 44: Declare une variable locale utilisee par le composant.
    const handleSubmit = (event) => {
// Ligne 45: Execute cette instruction: event.preventDefault();
        event.preventDefault();
// Ligne 46: Declare une variable locale utilisee par le composant.
        const now = new Date();
// Ligne 47: Declare une variable locale utilisee par le composant.
        const checkoutEmail = sessionStorage.getItem("checkout_email") || "";
// Ligne 48: Declare une variable locale utilisee par le composant.
        const order = {
// Ligne 49: Execute cette instruction: id: `#CM${now.getFullYear()}-${Date.now().toString().slice(-5)}`,
            id: `#CM${now.getFullYear()}-${Date.now().toString().slice(-5)}`,
// Ligne 50: Ouvre un bloc de code ou une structure de donnees.
            date: now.toLocaleDateString("fr-FR", {
// Ligne 51: Execute cette instruction: day: "2-digit",
                day: "2-digit",
// Ligne 52: Execute cette instruction: month: "short",
                month: "short",
// Ligne 53: Execute cette instruction: year: "numeric",
                year: "numeric",
// Ligne 54: Ferme un bloc de code ou une structure de donnees.
            }),
// Ligne 55: Execute cette instruction: createdAt: now.toISOString(),
            createdAt: now.toISOString(),
// Ligne 56: Execute cette instruction: status: "En attente",
            status: "En attente",
// Ligne 57: Execute cette instruction: items,
            items,
// Ligne 58: Execute cette instruction: subtotal: totalPrice,
            subtotal: totalPrice,
// Ligne 59: Execute cette instruction: shipping,
            shipping,
// Ligne 60: Execute cette instruction: total,
            total,
// Ligne 61: Execute cette instruction: deliveryMode,
            deliveryMode,
// Ligne 62: Execute cette instruction: shippingMethod,
            shippingMethod,
// Ligne 63: Execute cette instruction: paymentMethod: method,
            paymentMethod: method,
// Ligne 64: Execute cette instruction: clientEmail: checkoutEmail,
            clientEmail: checkoutEmail,
// Ligne 65: Execute cette instruction: emailSentAt: now.toISOString(),
            emailSentAt: now.toISOString(),
// Ligne 66: Ferme un bloc de code ou une structure de donnees.
        };
// Ligne 67: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 68: Convertit une valeur JavaScript en chaine JSON stockable.
        sessionStorage.setItem("last_order", JSON.stringify(order));
// Ligne 69: Declenche une navigation vers une autre route de l application.
        navigate("/commande/confirmation");
// Ligne 70: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 71: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 72: Declare une variable locale utilisee par le composant.
    const canUseDeferred = deliveryMode === "pickup";
// Ligne 73: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 74: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 75: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="checkout-page">
// Ligne 76: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="breadcrumb">Accueil / Panier / Commande</div>
// Ligne 77: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="checkout-steps">
// Ligne 78: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step done">✓</div>
// Ligne 79: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step done">✓</div>
// Ligne 80: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step active">3</div>
// Ligne 81: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step">4</div>
// Ligne 82: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 83: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="checkout-step-labels">
// Ligne 84: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Identification</span>
// Ligne 85: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Livraison</span>
// Ligne 86: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Paiement</span>
// Ligne 87: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Confirmation</span>
// Ligne 88: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 89: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 90: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="checkout-layout">
// Ligne 91: Ouvre un element JSX qui compose l interface utilisateur.
                <section className="checkout-card">
// Ligne 92: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Paiement</h2>
// Ligne 93: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="payment-methods">
// Ligne 94: Ouvre un element JSX qui compose l interface utilisateur.
                        <button
// Ligne 95: Effectue une affectation ou initialise une valeur.
                            type="button"
// Ligne 96: Effectue une affectation ou initialise une valeur.
                            className={method === "card" ? "active" : ""}
// Ligne 97: Associe une action JavaScript a un clic utilisateur.
                            onClick={() => setMethod("card")}
// Ligne 98: Execute cette instruction: >
                        >
// Ligne 99: Execute cette instruction: Carte bancaire
                            Carte bancaire
// Ligne 100: Ferme un element JSX dans l arborescence du rendu.
                        </button>
// Ligne 101: Ouvre un element JSX qui compose l interface utilisateur.
                        <button
// Ligne 102: Effectue une affectation ou initialise une valeur.
                            type="button"
// Ligne 103: Effectue une affectation ou initialise une valeur.
                            className={method === "paypal" ? "active" : ""}
// Ligne 104: Associe une action JavaScript a un clic utilisateur.
                            onClick={() => setMethod("paypal")}
// Ligne 105: Execute cette instruction: >
                        >
// Ligne 106: Execute cette instruction: PayPal
                            PayPal
// Ligne 107: Ferme un element JSX dans l arborescence du rendu.
                        </button>
// Ligne 108: Execute cette instruction: {canUseDeferred && (
                        {canUseDeferred && (
// Ligne 109: Ouvre un element JSX qui compose l interface utilisateur.
                            <button
// Ligne 110: Effectue une affectation ou initialise une valeur.
                                type="button"
// Ligne 111: Effectue une affectation ou initialise une valeur.
                                className={method === "later" ? "active" : ""}
// Ligne 112: Associe une action JavaScript a un clic utilisateur.
                                onClick={() => setMethod("later")}
// Ligne 113: Execute cette instruction: >
                            >
// Ligne 114: Execute cette instruction: Paiement différé en magasin
                                Paiement différé en magasin
// Ligne 115: Ferme un element JSX dans l arborescence du rendu.
                            </button>
// Ligne 116: Execute cette instruction: )}
                        )}
// Ligne 117: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 118: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 119: Ouvre un element JSX qui compose l interface utilisateur.
                    <form onSubmit={handleSubmit}>
// Ligne 120: Effectue une affectation ou initialise une valeur.
                        {method !== "later" ? (
// Ligne 121: Ouvre un element JSX qui compose l interface utilisateur.
                            <>
// Ligne 122: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="form-row">
// Ligne 123: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 124: Execute cette instruction: Numéro de carte
                                        Numéro de carte
// Ligne 125: Ouvre un element JSX qui compose l interface utilisateur.
                                        <input
// Ligne 126: Effectue une affectation ou initialise une valeur.
                                            type="text"
// Ligne 127: Effectue une affectation ou initialise une valeur.
                                            placeholder="1234 5678 9012 3456"
// Ligne 128: Execute cette instruction: required
                                            required
// Ligne 129: Execute cette instruction: />
                                        />
// Ligne 130: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 131: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 132: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="form-row">
// Ligne 133: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 134: Execute cette instruction: Date d'expiration
                                        Date d'expiration
// Ligne 135: Declare un element JSX auto-fermante (sans enfants).
                                        <input type="text" placeholder="MM/AA" required />
// Ligne 136: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 137: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 138: Execute cette instruction: CVV
                                        CVV
// Ligne 139: Declare un element JSX auto-fermante (sans enfants).
                                        <input type="text" placeholder="123" required />
// Ligne 140: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 141: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 142: Ferme un element JSX dans l arborescence du rendu.
                            </>
// Ligne 143: Execute cette instruction: ) : (
                        ) : (
// Ligne 144: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="pickup-note">
// Ligne 145: Execute cette instruction: Le paiement sera effectué en caisse lors du retrait.
                                Le paiement sera effectué en caisse lors du retrait.
// Ligne 146: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 147: Execute cette instruction: )}
                        )}
// Ligne 148: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="checkout-actions">
// Ligne 149: Ouvre un element JSX qui compose l interface utilisateur.
                            <button
// Ligne 150: Effectue une affectation ou initialise une valeur.
                                type="button"
// Ligne 151: Effectue une affectation ou initialise une valeur.
                                className="ghost"
// Ligne 152: Associe une action JavaScript a un clic utilisateur.
                                onClick={() => navigate("/commande/livraison")}
// Ligne 153: Execute cette instruction: >
                            >
// Ligne 154: Execute cette instruction: Retour
                                Retour
// Ligne 155: Ferme un element JSX dans l arborescence du rendu.
                            </button>
// Ligne 156: Ouvre un element JSX qui compose l interface utilisateur.
                            <button type="submit" className="primary">
// Ligne 157: Effectue une affectation ou initialise une valeur.
                                {method === "later" ? "Valider ma commande" : "Valider le paiement"}
// Ligne 158: Ferme un element JSX dans l arborescence du rendu.
                            </button>
// Ligne 159: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 160: Ferme un element JSX dans l arborescence du rendu.
                    </form>
// Ligne 161: Ferme un element JSX dans l arborescence du rendu.
                </section>
// Ligne 162: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 163: Ouvre un element JSX qui compose l interface utilisateur.
                <aside className="checkout-summary">
// Ligne 164: Ouvre un element JSX qui compose l interface utilisateur.
                    <h3>Récapitulatif</h3>
// Ligne 165: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-items">
// Ligne 166: Parcourt une collection pour generer une liste d elements.
                        {items.map((item) => (
// Ligne 167: Ouvre un element JSX qui compose l interface utilisateur.
                            <div key={item.key ?? item.id} className="summary-item">
// Ligne 168: Declare un element JSX auto-fermante (sans enfants).
                                <img src={item.image} alt={item.name} />
// Ligne 169: Ouvre un element JSX qui compose l interface utilisateur.
                                <div>
// Ligne 170: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div>{item.name}</div>
// Ligne 171: Ouvre un element JSX qui compose l interface utilisateur.
                                    <span>Qté: {item.quantity}</span>
// Ligne 172: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 173: Ouvre un element JSX qui compose l interface utilisateur.
                                <strong>
// Ligne 174: Execute cette instruction: {(
                                    {(
// Ligne 175: Execute cette instruction: getDiscountedPrice(item.price, item.id) * item.quantity
                                        getDiscountedPrice(item.price, item.id) * item.quantity
// Ligne 176: Execute cette instruction: ).toFixed(2)}{" "}
                                    ).toFixed(2)}{" "}
// Ligne 177: Execute cette instruction: €
                                    €
// Ligne 178: Ferme un element JSX dans l arborescence du rendu.
                                </strong>
// Ligne 179: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 180: Execute cette instruction: ))}
                        ))}
// Ligne 181: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 182: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-row">
// Ligne 183: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Sous-total</span>
// Ligne 184: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{totalPrice.toFixed(2)} €</span>
// Ligne 185: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 186: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-row">
// Ligne 187: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Livraison</span>
// Ligne 188: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{shipping.toFixed(2)} €</span>
// Ligne 189: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 190: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-total">
// Ligne 191: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Total TTC</span>
// Ligne 192: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{total.toFixed(2)} €</span>
// Ligne 193: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 194: Ferme un element JSX dans l arborescence du rendu.
                </aside>
// Ligne 195: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 196: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 197: Execute cette instruction: );
    );
// Ligne 198: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 199: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 200: Expose ce composant comme export par defaut du fichier.
export default CheckoutPaiement;
// Ligne 201: Ligne vide pour aerer le code et separer les blocs logiques.
