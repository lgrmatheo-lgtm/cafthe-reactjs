// Fichier annote automatiquement pour revision junior: src\pages\CheckoutLivraison.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file CheckoutLivraison.jsx
 * @file CheckoutLivraison.jsx
// Ligne 3: Execute cette instruction: * Role: Etape 2 du tunnel d achat.
 * Role: Etape 2 du tunnel d achat.
// Ligne 4: Execute cette instruction: * Comment c est fait: Gere mode de livraison/retrait, adresse et impact sur les frais de livraison.
 * Comment c est fait: Gere mode de livraison/retrait, adresse et impact sur les frais de livraison.
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
const stores = [
// Ligne 14: Execute cette instruction: "CafThé Paris Opéra",
    "CafThé Paris Opéra",
// Ligne 15: Execute cette instruction: "CafThé Lyon Bellecour",
    "CafThé Lyon Bellecour",
// Ligne 16: Execute cette instruction: "CafThé Bordeaux Centre",
    "CafThé Bordeaux Centre",
// Ligne 17: Ferme un bloc de code ou une structure de donnees.
];
// Ligne 18: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 19: Declare une variable locale utilisee par le composant.
const CheckoutLivraison = () => {
// Ligne 20: Declare une variable locale utilisee par le composant.
    const navigate = useNavigate();
// Ligne 21: Declare une variable locale utilisee par le composant.
    const { items, totalPrice, totalItems } = useContext(CartContext);
// Ligne 22: Declare une variable locale utilisee par le composant.
    const [deliveryMode, setDeliveryMode] = useState(
// Ligne 23: Execute cette instruction: sessionStorage.getItem("deliveryMode") || "home"
        sessionStorage.getItem("deliveryMode") || "home"
// Ligne 24: Execute cette instruction: );
    );
// Ligne 25: Declare une variable locale utilisee par le composant.
    const [method, setMethod] = useState(
// Ligne 26: Execute cette instruction: sessionStorage.getItem("shippingMethod") || "standard"
        sessionStorage.getItem("shippingMethod") || "standard"
// Ligne 27: Execute cette instruction: );
    );
// Ligne 28: Declare une variable locale utilisee par le composant.
    const [pickupStore, setPickupStore] = useState(
// Ligne 29: Execute cette instruction: sessionStorage.getItem("pickupStore") || stores[0]
        sessionStorage.getItem("pickupStore") || stores[0]
// Ligne 30: Execute cette instruction: );
    );
// Ligne 31: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 32: Declare une variable locale utilisee par le composant.
    const effectiveMethod = deliveryMode === "pickup" ? "pickup" : method;
// Ligne 33: Declare une variable locale utilisee par le composant.
    const shipping = useMemo(
// Ligne 34: Effectue une affectation ou initialise une valeur.
        () => getShippingCost(totalItems, effectiveMethod),
// Ligne 35: Execute cette instruction: [totalItems, effectiveMethod]
        [totalItems, effectiveMethod]
// Ligne 36: Execute cette instruction: );
    );
// Ligne 37: Declare une variable locale utilisee par le composant.
    const total = useMemo(
// Ligne 38: Effectue une affectation ou initialise une valeur.
        () => totalPrice + (items.length ? shipping : 0),
// Ligne 39: Execute cette instruction: [totalPrice, items.length, shipping]
        [totalPrice, items.length, shipping]
// Ligne 40: Execute cette instruction: );
    );
// Ligne 41: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 42: Applique une condition pour brancher le flux d execution.
    if (items.length === 0) {
// Ligne 43: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 44: Ouvre un element JSX qui compose l interface utilisateur.
            <main className="checkout-page">
// Ligne 45: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="checkout-empty">
// Ligne 46: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Votre panier est vide</h2>
// Ligne 47: Ouvre un element JSX qui compose l interface utilisateur.
                    <button type="button" onClick={() => navigate("/catalogue")}>
// Ligne 48: Execute cette instruction: Voir le catalogue
                        Voir le catalogue
// Ligne 49: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 50: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 51: Ferme un element JSX dans l arborescence du rendu.
            </main>
// Ligne 52: Execute cette instruction: );
        );
// Ligne 53: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 54: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 55: Declare une variable locale utilisee par le composant.
    const handleContinue = (event) => {
// Ligne 56: Execute cette instruction: event.preventDefault();
        event.preventDefault();
// Ligne 57: Execute cette instruction: sessionStorage.setItem("deliveryMode", deliveryMode);
        sessionStorage.setItem("deliveryMode", deliveryMode);
// Ligne 58: Execute cette instruction: sessionStorage.setItem("shippingMethod", effectiveMethod);
        sessionStorage.setItem("shippingMethod", effectiveMethod);
// Ligne 59: Execute cette instruction: sessionStorage.setItem("pickupStore", pickupStore);
        sessionStorage.setItem("pickupStore", pickupStore);
// Ligne 60: Declenche une navigation vers une autre route de l application.
        navigate("/commande/paiement");
// Ligne 61: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 62: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 63: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 64: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="checkout-page">
// Ligne 65: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="breadcrumb">Accueil / Panier / Commande</div>
// Ligne 66: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="checkout-steps">
// Ligne 67: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step done">✓</div>
// Ligne 68: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step active">2</div>
// Ligne 69: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step">3</div>
// Ligne 70: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step">4</div>
// Ligne 71: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 72: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="checkout-step-labels">
// Ligne 73: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Identification</span>
// Ligne 74: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Livraison</span>
// Ligne 75: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Paiement</span>
// Ligne 76: Ouvre un element JSX qui compose l interface utilisateur.
                <span>Confirmation</span>
// Ligne 77: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 78: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 79: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="checkout-layout">
// Ligne 80: Ouvre un element JSX qui compose l interface utilisateur.
                <section className="checkout-card">
// Ligne 81: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Livraison</h2>
// Ligne 82: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 83: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="delivery-modes">
// Ligne 84: Ouvre un element JSX qui compose l interface utilisateur.
                        <button
// Ligne 85: Effectue une affectation ou initialise une valeur.
                            type="button"
// Ligne 86: Effectue une affectation ou initialise une valeur.
                            className={deliveryMode === "home" ? "active" : ""}
// Ligne 87: Associe une action JavaScript a un clic utilisateur.
                            onClick={() => setDeliveryMode("home")}
// Ligne 88: Execute cette instruction: >
                        >
// Ligne 89: Ouvre un element JSX qui compose l interface utilisateur.
                            <strong>Livraison à domicile</strong>
// Ligne 90: Ouvre un element JSX qui compose l interface utilisateur.
                            <span>Adresse + transporteur</span>
// Ligne 91: Ferme un element JSX dans l arborescence du rendu.
                        </button>
// Ligne 92: Ouvre un element JSX qui compose l interface utilisateur.
                        <button
// Ligne 93: Effectue une affectation ou initialise une valeur.
                            type="button"
// Ligne 94: Effectue une affectation ou initialise une valeur.
                            className={deliveryMode === "pickup" ? "active" : ""}
// Ligne 95: Associe une action JavaScript a un clic utilisateur.
                            onClick={() => setDeliveryMode("pickup")}
// Ligne 96: Execute cette instruction: >
                        >
// Ligne 97: Ouvre un element JSX qui compose l interface utilisateur.
                            <strong>Retrait en magasin</strong>
// Ligne 98: Ouvre un element JSX qui compose l interface utilisateur.
                            <span>Sans frais de livraison</span>
// Ligne 99: Ferme un element JSX dans l arborescence du rendu.
                        </button>
// Ligne 100: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 101: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 102: Ouvre un element JSX qui compose l interface utilisateur.
                    <form onSubmit={handleContinue}>
// Ligne 103: Effectue une affectation ou initialise une valeur.
                        {deliveryMode === "home" ? (
// Ligne 104: Ouvre un element JSX qui compose l interface utilisateur.
                            <>
// Ligne 105: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="form-row">
// Ligne 106: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 107: Execute cette instruction: Prénom
                                        Prénom
// Ligne 108: Declare un element JSX auto-fermante (sans enfants).
                                        <input type="text" defaultValue="Mathéo" required />
// Ligne 109: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 110: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 111: Execute cette instruction: Nom
                                        Nom
// Ligne 112: Declare un element JSX auto-fermante (sans enfants).
                                        <input type="text" defaultValue="Lagier" required />
// Ligne 113: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 114: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 115: Ouvre un element JSX qui compose l interface utilisateur.
                                <label>
// Ligne 116: Execute cette instruction: Adresse
                                    Adresse
// Ligne 117: Ouvre un element JSX qui compose l interface utilisateur.
                                    <input
// Ligne 118: Effectue une affectation ou initialise une valeur.
                                        type="text"
// Ligne 119: Effectue une affectation ou initialise une valeur.
                                        defaultValue="123 Rue de la République"
// Ligne 120: Execute cette instruction: required
                                        required
// Ligne 121: Execute cette instruction: />
                                    />
// Ligne 122: Ferme un element JSX dans l arborescence du rendu.
                                </label>
// Ligne 123: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="form-row">
// Ligne 124: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 125: Execute cette instruction: Code postal
                                        Code postal
// Ligne 126: Declare un element JSX auto-fermante (sans enfants).
                                        <input type="text" defaultValue="75001" required />
// Ligne 127: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 128: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 129: Execute cette instruction: Ville
                                        Ville
// Ligne 130: Declare un element JSX auto-fermante (sans enfants).
                                        <input type="text" defaultValue="Paris" required />
// Ligne 131: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 132: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 133: Ouvre un element JSX qui compose l interface utilisateur.
                                <label>
// Ligne 134: Execute cette instruction: Téléphone
                                    Téléphone
// Ligne 135: Declare un element JSX auto-fermante (sans enfants).
                                    <input type="tel" defaultValue="+33 7 67 59 35 84" required />
// Ligne 136: Ferme un element JSX dans l arborescence du rendu.
                                </label>
// Ligne 137: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 138: Ouvre un element JSX qui compose l interface utilisateur.
                                <h3>Transporteur et délai</h3>
// Ligne 139: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="shipping-options">
// Ligne 140: Ouvre un element JSX qui compose l interface utilisateur.
                                    <button
// Ligne 141: Effectue une affectation ou initialise une valeur.
                                        type="button"
// Ligne 142: Effectue une affectation ou initialise une valeur.
                                        className={method === "standard" ? "active" : ""}
// Ligne 143: Associe une action JavaScript a un clic utilisateur.
                                        onClick={() => setMethod("standard")}
// Ligne 144: Execute cette instruction: >
                                    >
// Ligne 145: Ouvre un element JSX qui compose l interface utilisateur.
                                        <div>
// Ligne 146: Ouvre un element JSX qui compose l interface utilisateur.
                                            <strong>Colissimo Standard</strong>
// Ligne 147: Ouvre un element JSX qui compose l interface utilisateur.
                                            <span>3-5 jours ouvrés</span>
// Ligne 148: Ferme un element JSX dans l arborescence du rendu.
                                        </div>
// Ligne 149: Ouvre un element JSX qui compose l interface utilisateur.
                                        <span>
// Ligne 150: Execute cette instruction: {getShippingCost(totalItems, "standard").toFixed(2)} €
                                            {getShippingCost(totalItems, "standard").toFixed(2)} €
// Ligne 151: Ferme un element JSX dans l arborescence du rendu.
                                        </span>
// Ligne 152: Ferme un element JSX dans l arborescence du rendu.
                                    </button>
// Ligne 153: Ouvre un element JSX qui compose l interface utilisateur.
                                    <button
// Ligne 154: Effectue une affectation ou initialise une valeur.
                                        type="button"
// Ligne 155: Effectue une affectation ou initialise une valeur.
                                        className={method === "express" ? "active" : ""}
// Ligne 156: Associe une action JavaScript a un clic utilisateur.
                                        onClick={() => setMethod("express")}
// Ligne 157: Execute cette instruction: >
                                    >
// Ligne 158: Ouvre un element JSX qui compose l interface utilisateur.
                                        <div>
// Ligne 159: Ouvre un element JSX qui compose l interface utilisateur.
                                            <strong>Chronopost Express</strong>
// Ligne 160: Ouvre un element JSX qui compose l interface utilisateur.
                                            <span>24-48h</span>
// Ligne 161: Ferme un element JSX dans l arborescence du rendu.
                                        </div>
// Ligne 162: Ouvre un element JSX qui compose l interface utilisateur.
                                        <span>
// Ligne 163: Execute cette instruction: {getShippingCost(totalItems, "express").toFixed(2)} €
                                            {getShippingCost(totalItems, "express").toFixed(2)} €
// Ligne 164: Ferme un element JSX dans l arborescence du rendu.
                                        </span>
// Ligne 165: Ferme un element JSX dans l arborescence du rendu.
                                    </button>
// Ligne 166: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 167: Ferme un element JSX dans l arborescence du rendu.
                            </>
// Ligne 168: Execute cette instruction: ) : (
                        ) : (
// Ligne 169: Ouvre un element JSX qui compose l interface utilisateur.
                            <>
// Ligne 170: Ouvre un element JSX qui compose l interface utilisateur.
                                <label>
// Ligne 171: Execute cette instruction: Choix du magasin
                                    Choix du magasin
// Ligne 172: Ouvre un element JSX qui compose l interface utilisateur.
                                    <select
// Ligne 173: Effectue une affectation ou initialise une valeur.
                                        value={pickupStore}
// Ligne 174: Associe une reaction a la modification d un champ de formulaire.
                                        onChange={(event) => setPickupStore(event.target.value)}
// Ligne 175: Execute cette instruction: >
                                    >
// Ligne 176: Parcourt une collection pour generer une liste d elements.
                                        {stores.map((store) => (
// Ligne 177: Ouvre un element JSX qui compose l interface utilisateur.
                                            <option key={store} value={store}>
// Ligne 178: Execute cette instruction: {store}
                                                {store}
// Ligne 179: Ferme un element JSX dans l arborescence du rendu.
                                            </option>
// Ligne 180: Execute cette instruction: ))}
                                        ))}
// Ligne 181: Ferme un element JSX dans l arborescence du rendu.
                                    </select>
// Ligne 182: Ferme un element JSX dans l arborescence du rendu.
                                </label>
// Ligne 183: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="pickup-note">
// Ligne 184: Execute cette instruction: Retrait sous 2h ouvrées après validation. Paiement différé
                                    Retrait sous 2h ouvrées après validation. Paiement différé
// Ligne 185: Execute cette instruction: possible en caisse.
                                    possible en caisse.
// Ligne 186: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 187: Ferme un element JSX dans l arborescence du rendu.
                            </>
// Ligne 188: Execute cette instruction: )}
                        )}
// Ligne 189: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 190: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="checkout-actions">
// Ligne 191: Ouvre un element JSX qui compose l interface utilisateur.
                            <button
// Ligne 192: Effectue une affectation ou initialise une valeur.
                                type="button"
// Ligne 193: Effectue une affectation ou initialise une valeur.
                                className="ghost"
// Ligne 194: Associe une action JavaScript a un clic utilisateur.
                                onClick={() => navigate("/commande/identification")}
// Ligne 195: Execute cette instruction: >
                            >
// Ligne 196: Execute cette instruction: Retour
                                Retour
// Ligne 197: Ferme un element JSX dans l arborescence du rendu.
                            </button>
// Ligne 198: Ouvre un element JSX qui compose l interface utilisateur.
                            <button type="submit" className="primary">
// Ligne 199: Execute cette instruction: Continuer
                                Continuer
// Ligne 200: Ferme un element JSX dans l arborescence du rendu.
                            </button>
// Ligne 201: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 202: Ferme un element JSX dans l arborescence du rendu.
                    </form>
// Ligne 203: Ferme un element JSX dans l arborescence du rendu.
                </section>
// Ligne 204: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 205: Ouvre un element JSX qui compose l interface utilisateur.
                <aside className="checkout-summary">
// Ligne 206: Ouvre un element JSX qui compose l interface utilisateur.
                    <h3>Récapitulatif</h3>
// Ligne 207: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-items">
// Ligne 208: Parcourt une collection pour generer une liste d elements.
                        {items.map((item) => (
// Ligne 209: Ouvre un element JSX qui compose l interface utilisateur.
                            <div key={item.key ?? item.id} className="summary-item">
// Ligne 210: Declare un element JSX auto-fermante (sans enfants).
                                <img src={item.image} alt={item.name} />
// Ligne 211: Ouvre un element JSX qui compose l interface utilisateur.
                                <div>
// Ligne 212: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div>{item.name}</div>
// Ligne 213: Ouvre un element JSX qui compose l interface utilisateur.
                                    <span>Qté: {item.quantity}</span>
// Ligne 214: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 215: Ouvre un element JSX qui compose l interface utilisateur.
                                <strong>
// Ligne 216: Execute cette instruction: {(
                                    {(
// Ligne 217: Execute cette instruction: getDiscountedPrice(item.price, item.id) * item.quantity
                                        getDiscountedPrice(item.price, item.id) * item.quantity
// Ligne 218: Execute cette instruction: ).toFixed(2)}{" "}
                                    ).toFixed(2)}{" "}
// Ligne 219: Execute cette instruction: €
                                    €
// Ligne 220: Ferme un element JSX dans l arborescence du rendu.
                                </strong>
// Ligne 221: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 222: Execute cette instruction: ))}
                        ))}
// Ligne 223: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 224: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-row">
// Ligne 225: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Sous-total</span>
// Ligne 226: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{totalPrice.toFixed(2)} €</span>
// Ligne 227: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 228: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-row">
// Ligne 229: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Livraison</span>
// Ligne 230: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{shipping.toFixed(2)} €</span>
// Ligne 231: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 232: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-total">
// Ligne 233: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>Total TTC</span>
// Ligne 234: Ouvre un element JSX qui compose l interface utilisateur.
                        <span>{total.toFixed(2)} €</span>
// Ligne 235: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 236: Ferme un element JSX dans l arborescence du rendu.
                </aside>
// Ligne 237: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 238: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 239: Execute cette instruction: );
    );
// Ligne 240: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 241: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 242: Expose ce composant comme export par defaut du fichier.
export default CheckoutLivraison;
// Ligne 243: Ligne vide pour aerer le code et separer les blocs logiques.
