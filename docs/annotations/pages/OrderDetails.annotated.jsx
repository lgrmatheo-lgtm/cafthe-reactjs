// Fichier annote automatiquement pour revision junior: src\pages\OrderDetails.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file OrderDetails.jsx
 * @file OrderDetails.jsx
// Ligne 3: Execute cette instruction: * Role: Detail d une commande.
 * Role: Detail d une commande.
// Ligne 4: Execute cette instruction: * Comment c est fait: Recharge une commande depuis son id et propose des actions (recommande, retour compte).
 * Comment c est fait: Recharge une commande depuis son id et propose des actions (recommande, retour compte).
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useContext } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import { useNavigate, useParams } from "react-router-dom";
// Ligne 9: Importe un module necessaire au composant ou a sa logique.
import { getDiscountedPrice } from "../utils/discounts.js";
// Ligne 10: Importe un module necessaire au composant ou a sa logique.
import { CartContext } from "../context/cartContext.jsx";
// Ligne 11: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 12: Declare une variable locale utilisee par le composant.
const OrderDetails = () => {
// Ligne 13: Declare une variable locale utilisee par le composant.
    const navigate = useNavigate();
// Ligne 14: Declare une variable locale utilisee par le composant.
    const { id } = useParams();
// Ligne 15: Declare une variable locale utilisee par le composant.
    const { replaceCart } = useContext(CartContext);
// Ligne 16: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 17: Declare une variable locale utilisee par le composant.
    let order = null;
// Ligne 18: Ouvre un bloc de code ou une structure de donnees.
    try {
// Ligne 19: Declare une variable locale utilisee par le composant.
        const raw = localStorage.getItem("cafthe_orders");
// Ligne 20: Applique une condition pour brancher le flux d execution.
        if (raw) {
// Ligne 21: Declare une variable locale utilisee par le composant.
            const orders = JSON.parse(raw);
// Ligne 22: Effectue une affectation ou initialise une valeur.
            order = orders.find((item) => String(item.id) === String(id));
// Ligne 23: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 24: Ouvre un bloc de code ou une structure de donnees.
    } catch {
// Ligne 25: Effectue une affectation ou initialise une valeur.
        order = null;
// Ligne 26: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 27: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 28: Applique une condition pour brancher le flux d execution.
    if (!order) {
// Ligne 29: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 30: Ouvre un element JSX qui compose l interface utilisateur.
            <main className="order-details-page">
// Ligne 31: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="checkout-empty">
// Ligne 32: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Commande introuvable</h2>
// Ligne 33: Ouvre un element JSX qui compose l interface utilisateur.
                    <button type="button" onClick={() => navigate("/profil")}>Retour au compte</button>
// Ligne 34: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 35: Ferme un element JSX dans l arborescence du rendu.
            </main>
// Ligne 36: Execute cette instruction: );
        );
// Ligne 37: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 38: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 39: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 40: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="order-details-page">
// Ligne 41: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="breadcrumb">Accueil / Mon compte / Commande {order.id}</div>
// Ligne 42: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="order-details-card">
// Ligne 43: Ouvre un element JSX qui compose l interface utilisateur.
                <div>
// Ligne 44: Ouvre un element JSX qui compose l interface utilisateur.
                    <h1>Commande {order.id}</h1>
// Ligne 45: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>Statut : {order.status}</p>
// Ligne 46: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>Date : {order.date}</p>
// Ligne 47: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 48: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="order-details-items">
// Ligne 49: Parcourt une collection pour generer une liste d elements.
                    {order.items.map((item) => (
// Ligne 50: Ouvre un element JSX qui compose l interface utilisateur.
                        <div key={item.key ?? item.id} className="summary-item">
// Ligne 51: Declare un element JSX auto-fermante (sans enfants).
                            <img src={item.image} alt={item.name} />
// Ligne 52: Ouvre un element JSX qui compose l interface utilisateur.
                            <div>
// Ligne 53: Ouvre un element JSX qui compose l interface utilisateur.
                                <div>{item.name}</div>
// Ligne 54: Ouvre un element JSX qui compose l interface utilisateur.
                                <span>Qté: {item.quantity}</span>
// Ligne 55: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 56: Ouvre un element JSX qui compose l interface utilisateur.
                            <strong>{(getDiscountedPrice(item.price, item.id) * item.quantity).toFixed(2)} €</strong>
// Ligne 57: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 58: Execute cette instruction: ))}
                    ))}
// Ligne 59: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 60: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="summary-row"><span>Sous-total</span><span>{order.subtotal.toFixed(2)} €</span></div>
// Ligne 61: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="summary-row"><span>Livraison</span><span>{order.shipping.toFixed(2)} €</span></div>
// Ligne 62: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="summary-total"><span>Total TTC</span><span>{order.total.toFixed(2)} €</span></div>
// Ligne 63: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="confirm-actions">
// Ligne 64: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 65: Effectue une affectation ou initialise une valeur.
                        type="button"
// Ligne 66: Effectue une affectation ou initialise une valeur.
                        className="primary"
// Ligne 67: Declare une fonction (handler, utilitaire ou composant).
                        onClick={() => {
// Ligne 68: Execute cette instruction: replaceCart(order.items);
                            replaceCart(order.items);
// Ligne 69: Declenche une navigation vers une autre route de l application.
                            navigate("/panier");
// Ligne 70: Ferme un bloc de code ou une structure de donnees.
                        }}
// Ligne 71: Execute cette instruction: >
                    >
// Ligne 72: Execute cette instruction: Commander à l'identique
                        Commander à l'identique
// Ligne 73: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 74: Ouvre un element JSX qui compose l interface utilisateur.
                    <button type="button" className="ghost" onClick={() => navigate("/profil")}>
// Ligne 75: Execute cette instruction: Retour à mon compte
                        Retour à mon compte
// Ligne 76: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 77: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 78: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 79: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 80: Execute cette instruction: );
    );
// Ligne 81: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 82: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 83: Expose ce composant comme export par defaut du fichier.
export default OrderDetails;
// Ligne 84: Ligne vide pour aerer le code et separer les blocs logiques.
