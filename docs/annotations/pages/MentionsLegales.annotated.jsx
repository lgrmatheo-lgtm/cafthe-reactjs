// Fichier annote automatiquement pour revision junior: src\pages\MentionsLegales.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file MentionsLegales.jsx
 * @file MentionsLegales.jsx
// Ligne 3: Execute cette instruction: * Role: Page Mentions legales.
 * Role: Page Mentions legales.
// Ligne 4: Execute cette instruction: * Comment c est fait: Parametre InfoPage avec les obligations legales de publication.
 * Comment c est fait: Parametre InfoPage avec les obligations legales de publication.
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
const MentionsLegales = () => {
// Ligne 11: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 12: Ouvre un element JSX qui compose l interface utilisateur.
        <InfoPage
// Ligne 13: Effectue une affectation ou initialise une valeur.
            tag="Informations"
// Ligne 14: Effectue une affectation ou initialise une valeur.
            title="Mentions légales"
// Ligne 15: Effectue une affectation ou initialise une valeur.
            lead="Informations légales et éditoriales du site CafThé."
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
// Ligne 22: Execute cette instruction: title: "Éditeur du site",
                    title: "Éditeur du site",
// Ligne 23: Execute cette instruction: text: "CafThé, marque dédiée aux thés et cafés d'exception.",
                    text: "CafThé, marque dédiée aux thés et cafés d'exception.",
// Ligne 24: Execute cette instruction: items: ["Direction de publication", "Coordonnées", "SIRET sur demande"],
                    items: ["Direction de publication", "Coordonnées", "SIRET sur demande"],
// Ligne 25: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 26: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 27: Execute cette instruction: title: "Hébergement",
                    title: "Hébergement",
// Ligne 28: Execute cette instruction: text: "Infrastructure sécurisée et performante.",
                    text: "Infrastructure sécurisée et performante.",
// Ligne 29: Execute cette instruction: items: ["Serveurs européens", "Disponibilité 24/7", "Sauvegardes régulières"],
                    items: ["Serveurs européens", "Disponibilité 24/7", "Sauvegardes régulières"],
// Ligne 30: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 31: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 32: Execute cette instruction: title: "Propriété intellectuelle",
                    title: "Propriété intellectuelle",
// Ligne 33: Execute cette instruction: text: "L'ensemble du contenu est protégé.",
                    text: "L'ensemble du contenu est protégé.",
// Ligne 34: Execute cette instruction: items: ["Textes, images, logos", "Reproduction interdite", "Marques déposées"],
                    items: ["Textes, images, logos", "Reproduction interdite", "Marques déposées"],
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
export default MentionsLegales;
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.
