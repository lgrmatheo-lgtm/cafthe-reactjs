// Fichier annote automatiquement pour revision junior: src\pages\Contact.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Contact.jsx
 * @file Contact.jsx
// Ligne 3: Execute cette instruction: * Role: Page Contact.
 * Role: Page Contact.
// Ligne 4: Execute cette instruction: * Comment c est fait: Parametre InfoPage avec les canaux de contact et horaires.
 * Comment c est fait: Parametre InfoPage avec les canaux de contact et horaires.
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
const Contact = () => {
// Ligne 11: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 12: Ouvre un element JSX qui compose l interface utilisateur.
        <InfoPage
// Ligne 13: Effectue une affectation ou initialise une valeur.
            tag="Aide"
// Ligne 14: Effectue une affectation ou initialise une valeur.
            title="Contact"
// Ligne 15: Effectue une affectation ou initialise une valeur.
            lead="Besoin d'aide ou d'un conseil personnalisé ? Notre équipe vous répond rapidement."
// Ligne 16: Ouvre un bloc de code ou une structure de donnees.
            actions={[
// Ligne 17: Execute cette instruction: { label: "Se connecter", to: "/login", variant: "primary" },
                { label: "Se connecter", to: "/login", variant: "primary" },
// Ligne 18: Execute cette instruction: { label: "Voir la FAQ", to: "/faq", variant: "ghost-dark" },
                { label: "Voir la FAQ", to: "/faq", variant: "ghost-dark" },
// Ligne 19: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 20: Ouvre un bloc de code ou une structure de donnees.
            sections={[
// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 22: Execute cette instruction: title: "Service client",
                    title: "Service client",
// Ligne 23: Execute cette instruction: text: "Du lundi au vendredi, 9h-18h.",
                    text: "Du lundi au vendredi, 9h-18h.",
// Ligne 24: Execute cette instruction: items: ["contact@cafthe.fr", "Réponse sous 24h", "Assistance commande"],
                    items: ["contact@cafthe.fr", "Réponse sous 24h", "Assistance commande"],
// Ligne 25: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 26: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 27: Execute cette instruction: title: "Partenariats",
                    title: "Partenariats",
// Ligne 28: Execute cette instruction: text: "Cafés, hôtels, bureaux et événements.",
                    text: "Cafés, hôtels, bureaux et événements.",
// Ligne 29: Execute cette instruction: items: ["Sélections sur mesure", "Offres B2B", "Démonstrations"],
                    items: ["Sélections sur mesure", "Offres B2B", "Démonstrations"],
// Ligne 30: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 31: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 32: Execute cette instruction: title: "Presse & influence",
                    title: "Presse & influence",
// Ligne 33: Execute cette instruction: text: "Demandes médias et collaborations.",
                    text: "Demandes médias et collaborations.",
// Ligne 34: Execute cette instruction: items: ["Kit presse", "Échantillons", "Interviews"],
                    items: ["Kit presse", "Échantillons", "Interviews"],
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
export default Contact;
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.
