// Fichier annote automatiquement pour revision junior: src\pages\LivraisonRetours.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file LivraisonRetours.jsx
 * @file LivraisonRetours.jsx
// Ligne 3: Execute cette instruction: * Role: Page Livraison et retours.
 * Role: Page Livraison et retours.
// Ligne 4: Execute cette instruction: * Comment c est fait: Parametre InfoPage avec les regles logistiques et SAV.
 * Comment c est fait: Parametre InfoPage avec les regles logistiques et SAV.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import InfoPage from "../components/InfoPage.jsx";
// Ligne 9: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 10: Declare une variable locale utilisee par le composant.
const LivraisonRetours = () => {
// Ligne 11: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 12: Ouvre un element JSX qui compose l interface utilisateur.
        <InfoPage
// Ligne 13: Effectue une affectation ou initialise une valeur.
            tag="Aide"
// Ligne 14: Effectue une affectation ou initialise une valeur.
            title="Livraison & Retours"
// Ligne 15: Effectue une affectation ou initialise une valeur.
            lead="Des expéditions rapides, un suivi clair et des retours simples."
// Ligne 16: Ouvre un bloc de code ou une structure de donnees.
            actions={[
// Ligne 17: Execute cette instruction: { label: "Suivre ma commande", to: "/profil", variant: "primary" },
                { label: "Suivre ma commande", to: "/profil", variant: "primary" },
// Ligne 18: Execute cette instruction: { label: "Contacter le support", to: "/contact", variant: "ghost-dark" },
                { label: "Contacter le support", to: "/contact", variant: "ghost-dark" },
// Ligne 19: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 20: Ouvre un bloc de code ou une structure de donnees.
            sections={[
// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 22: Execute cette instruction: title: "Délais & zones",
                    title: "Délais & zones",
// Ligne 23: Execute cette instruction: text: "Expédition sous 24-48h ouvrées en France métropolitaine.",
                    text: "Expédition sous 24-48h ouvrées en France métropolitaine.",
// Ligne 24: Execute cette instruction: items: ["Livraison standard 2-4 jours", "Suivi colis inclus", "Europe sur demande"],
                    items: ["Livraison standard 2-4 jours", "Suivi colis inclus", "Europe sur demande"],
// Ligne 25: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 26: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 27: Execute cette instruction: title: "Frais de livraison",
                    title: "Frais de livraison",
// Ligne 28: Execute cette instruction: text: "Des tarifs transparents pour chaque panier.",
                    text: "Des tarifs transparents pour chaque panier.",
// Ligne 29: Execute cette instruction: items: ["Offerte dès 50 €", "Tarif fixe en dessous", "Relais et domicile"],
                    items: ["Offerte dès 50 €", "Tarif fixe en dessous", "Relais et domicile"],
// Ligne 30: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 31: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 32: Execute cette instruction: title: "Retours & échanges",
                    title: "Retours & échanges",
// Ligne 33: Execute cette instruction: text: "Vous avez 14 jours pour changer d'avis.",
                    text: "Vous avez 14 jours pour changer d'avis.",
// Ligne 34: Execute cette instruction: items: ["Produit non ouvert", "Échange possible", "Remboursement rapide"],
                    items: ["Produit non ouvert", "Échange possible", "Remboursement rapide"],
// Ligne 35: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 36: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 37: Execute cette instruction: />
        />
// Ligne 38: Execute cette instruction: );
    );
// Ligne 39: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 40: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 41: Expose ce composant comme export par defaut du fichier.
export default LivraisonRetours;
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.
