// Fichier annote automatiquement pour revision junior: src\pages\CheckoutConfirmation.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file CheckoutConfirmation.jsx
 * @file CheckoutConfirmation.jsx
// Ligne 3: Execute cette instruction: * Role: Etape 4 du tunnel d achat.
 * Role: Etape 4 du tunnel d achat.
// Ligne 4: Execute cette instruction: * Comment c est fait: Finalise, enregistre la commande et nettoie le panier pour cloturer le parcours.
 * Comment c est fait: Finalise, enregistre la commande et nettoie le panier pour cloturer le parcours.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useContext, useEffect, useMemo, useState } from "react";
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
const CheckoutConfirmation = () => {
// Ligne 14: Declare une variable locale utilisee par le composant.
    const navigate = useNavigate();
// Ligne 15: Declare une variable locale utilisee par le composant.
    const { items, totalPrice, totalItems, clear } = useContext(CartContext);
// Ligne 16: Declare une variable locale utilisee par le composant.
    const [order, setOrder] = useState(null);
// Ligne 17: Declare une variable locale utilisee par le composant.
    const shippingMethod = sessionStorage.getItem("shippingMethod") || "standard";
// Ligne 18: Declare une variable locale utilisee par le composant.
    const shipping = useMemo(() => getShippingCost(totalItems, shippingMethod), [totalItems, shippingMethod]);
// Ligne 19: Declare une variable locale utilisee par le composant.
    const total = useMemo(() => totalPrice + (items.length ? shipping : 0), [totalPrice, items.length, shipping]);
// Ligne 20: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 21: Declare une fonction (handler, utilitaire ou composant).
    useEffect(() => {
// Ligne 22: Declare une variable locale utilisee par le composant.
        const raw = sessionStorage.getItem("last_order");
// Ligne 23: Applique une condition pour brancher le flux d execution.
        if (!raw) return;
// Ligne 24: Declare une variable locale utilisee par le composant.
        const parsed = JSON.parse(raw);
// Ligne 25: Execute cette instruction: setOrder(parsed);
        setOrder(parsed);
// Ligne 26: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 27: Declare une variable locale utilisee par le composant.
        const ordersRaw = localStorage.getItem("cafthe_orders");
// Ligne 28: Declare une variable locale utilisee par le composant.
        const orders = ordersRaw ? JSON.parse(ordersRaw) : [];
// Ligne 29: Declare une variable locale utilisee par le composant.
        const exists = orders.some((item) => String(item.id) === String(parsed.id));
// Ligne 30: Applique une condition pour brancher le flux d execution.
        if (!exists) {
// Ligne 31: Declare une variable locale utilisee par le composant.
            const next = [parsed, ...orders];
// Ligne 32: Lit ou ecrit des donnees persistantes dans le navigateur.
            localStorage.setItem("cafthe_orders", JSON.stringify(next));
// Ligne 33: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 34: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 35: Declare une variable locale utilisee par le composant.
        const mailRaw = localStorage.getItem("cafthe_emails");
// Ligne 36: Declare une variable locale utilisee par le composant.
        const sentMails = mailRaw ? JSON.parse(mailRaw) : [];
// Ligne 37: Declare une variable locale utilisee par le composant.
        const alreadySent = sentMails.some((mail) => mail.orderId === parsed.id);
// Ligne 38: Applique une condition pour brancher le flux d execution.
        if (!alreadySent) {
// Ligne 39: Declare une variable locale utilisee par le composant.
            const nextEmails = [
// Ligne 40: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 41: Execute cette instruction: orderId: parsed.id,
                    orderId: parsed.id,
// Ligne 42: Execute cette instruction: subject: `Confirmation de commande ${parsed.id}`,
                    subject: `Confirmation de commande ${parsed.id}`,
// Ligne 43: Execute cette instruction: sentAt: parsed.emailSentAt ?? new Date().toISOString(),
                    sentAt: parsed.emailSentAt ?? new Date().toISOString(),
// Ligne 44: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 45: Execute cette instruction: ...sentMails,
                ...sentMails,
// Ligne 46: Ferme un bloc de code ou une structure de donnees.
            ];
// Ligne 47: Lit ou ecrit des donnees persistantes dans le navigateur.
            localStorage.setItem("cafthe_emails", JSON.stringify(nextEmails));
// Ligne 48: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 49: Ferme un bloc de code ou une structure de donnees.
    }, []);
// Ligne 50: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 51: Declare une variable locale utilisee par le composant.
    const handleGoAccount = () => {
// Ligne 52: Execute cette instruction: clear();
        clear();
// Ligne 53: Declenche une navigation vers une autre route de l application.
        navigate("/profil");
// Ligne 54: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 55: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 56: Declare une variable locale utilisee par le composant.
    const handleGoHome = () => {
// Ligne 57: Execute cette instruction: clear();
        clear();
// Ligne 58: Declenche une navigation vers une autre route de l application.
        navigate("/");
// Ligne 59: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 60: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 61: Applique une condition pour brancher le flux d execution.
    if (items.length === 0 && !order) {
// Ligne 62: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 63: Ouvre un element JSX qui compose l interface utilisateur.
            <main className="checkout-page">
// Ligne 64: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="checkout-empty">
// Ligne 65: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Commande confirmée</h2>
// Ligne 66: Ouvre un element JSX qui compose l interface utilisateur.
                    <button type="button" onClick={() => navigate("/")}>Retour à l'accueil</button>
// Ligne 67: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 68: Ferme un element JSX dans l arborescence du rendu.
            </main>
// Ligne 69: Execute cette instruction: );
        );
// Ligne 70: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 71: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 72: Declare une variable locale utilisee par le composant.
    const displayItems = order?.items ?? items;
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
                <div className="step done">✓</div>
// Ligne 81: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="step active">4</div>
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
                <section className="checkout-card confirm-card">
// Ligne 92: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="confirm-icon">✓</div>
// Ligne 93: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Commande confirmée !</h2>
// Ligne 94: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>Merci pour votre commande.</p>
// Ligne 95: Ouvre un element JSX qui compose l interface utilisateur.
                    <strong>Numéro de commande : {order?.id ?? "#CM2026-00142"}</strong>
// Ligne 96: Ouvre un element JSX qui compose l interface utilisateur.
                    <p className="confirm-mail">
// Ligne 97: Execute cette instruction: Un email de confirmation a été envoyé automatiquement.
                        Un email de confirmation a été envoyé automatiquement.
// Ligne 98: Ferme un element JSX dans l arborescence du rendu.
                    </p>
// Ligne 99: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="confirm-actions">
// Ligne 100: Ouvre un element JSX qui compose l interface utilisateur.
                        <button type="button" className="primary" onClick={handleGoAccount}>Voir mes commandes</button>
// Ligne 101: Ouvre un element JSX qui compose l interface utilisateur.
                        <button type="button" className="ghost" onClick={handleGoHome}>Retour à l'accueil</button>
// Ligne 102: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 103: Ferme un element JSX dans l arborescence du rendu.
                </section>
// Ligne 104: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 105: Ouvre un element JSX qui compose l interface utilisateur.
                <aside className="checkout-summary">
// Ligne 106: Ouvre un element JSX qui compose l interface utilisateur.
                    <h3>Récapitulatif</h3>
// Ligne 107: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-items">
// Ligne 108: Parcourt une collection pour generer une liste d elements.
                        {displayItems.map((item) => (
// Ligne 109: Ouvre un element JSX qui compose l interface utilisateur.
                            <div key={item.key ?? item.id} className="summary-item">
// Ligne 110: Declare un element JSX auto-fermante (sans enfants).
                                <img src={item.image} alt={item.name} />
// Ligne 111: Ouvre un element JSX qui compose l interface utilisateur.
                                <div>
// Ligne 112: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div>{item.name}</div>
// Ligne 113: Ouvre un element JSX qui compose l interface utilisateur.
                                    <span>Qté: {item.quantity}</span>
// Ligne 114: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 115: Ouvre un element JSX qui compose l interface utilisateur.
                                <strong>{(getDiscountedPrice(item.price, item.id) * item.quantity).toFixed(2)} €</strong>
// Ligne 116: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 117: Execute cette instruction: ))}
                        ))}
// Ligne 118: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 119: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-row"><span>Sous-total</span><span>{(order?.subtotal ?? totalPrice).toFixed(2)} €</span></div>
// Ligne 120: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-row"><span>Livraison</span><span>{(order?.shipping ?? shipping).toFixed(2)} €</span></div>
// Ligne 121: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="summary-total"><span>Total TTC</span><span>{(order?.total ?? total).toFixed(2)} €</span></div>
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
export default CheckoutConfirmation;
// Ligne 129: Ligne vide pour aerer le code et separer les blocs logiques.
