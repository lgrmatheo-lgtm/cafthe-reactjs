// Fichier annote automatiquement pour revision junior: src\pages\Terms.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Terms.jsx
 * @file Terms.jsx
// Ligne 3: Execute cette instruction: * Role: Page Conditions generales.
 * Role: Page Conditions generales.
// Ligne 4: Execute cette instruction: * Comment c est fait: Parametre InfoPage avec CGU/CGV et clauses contractuelles.
 * Comment c est fait: Parametre InfoPage avec CGU/CGV et clauses contractuelles.
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
const Terms = () => {
// Ligne 11: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 12: Ouvre un element JSX qui compose l interface utilisateur.
        <InfoPage
// Ligne 13: Effectue une affectation ou initialise une valeur.
            tag="Conditions"
// Ligne 14: Effectue une affectation ou initialise une valeur.
            title="Terms"
// Ligne 15: Effectue une affectation ou initialise une valeur.
            lead="Conditions générales d'utilisation et de vente de CafThé."
// Ligne 16: Ouvre un bloc de code ou une structure de donnees.
            actions={[
// Ligne 17: Execute cette instruction: { label: "Contact", to: "/contact", variant: "primary" },
                { label: "Contact", to: "/contact", variant: "primary" },
// Ligne 18: Execute cette instruction: { label: "Confidentialité", to: "/privacy", variant: "ghost-dark" },
                { label: "Confidentialité", to: "/privacy", variant: "ghost-dark" },
// Ligne 19: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 20: Ouvre un bloc de code ou une structure de donnees.
            sections={[
// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 22: Execute cette instruction: title: "Commandes",
                    title: "Commandes",
// Ligne 23: Execute cette instruction: text: "Chaque commande est confirmée par email.",
                    text: "Chaque commande est confirmée par email.",
// Ligne 24: Execute cette instruction: items: ["Disponibilité des stocks", "Confirmation immédiate", "Suivi en ligne"],
                    items: ["Disponibilité des stocks", "Confirmation immédiate", "Suivi en ligne"],
// Ligne 25: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 26: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 27: Execute cette instruction: title: "Prix & paiement",
                    title: "Prix & paiement",
// Ligne 28: Execute cette instruction: text: "Des prix affichés en toute transparence.",
                    text: "Des prix affichés en toute transparence.",
// Ligne 29: Execute cette instruction: items: ["Taxes incluses", "Paiement sécurisé", "Facture disponible"],
                    items: ["Taxes incluses", "Paiement sécurisé", "Facture disponible"],
// Ligne 30: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 31: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 32: Execute cette instruction: title: "Responsabilités",
                    title: "Responsabilités",
// Ligne 33: Execute cette instruction: text: "Nous veillons à la qualité et au service.",
                    text: "Nous veillons à la qualité et au service.",
// Ligne 34: Execute cette instruction: items: ["Service client dédié", "Limites de responsabilité", "Traitement des litiges"],
                    items: ["Service client dédié", "Limites de responsabilité", "Traitement des litiges"],
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
export default Terms;
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.
