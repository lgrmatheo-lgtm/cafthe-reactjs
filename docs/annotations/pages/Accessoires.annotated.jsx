// Fichier annote automatiquement pour revision junior: src\pages\Accessoires.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Accessoires.jsx
 * @file Accessoires.jsx
// Ligne 3: Execute cette instruction: * Role: Page categorie Accessoires.
 * Role: Page categorie Accessoires.
// Ligne 4: Execute cette instruction: * Comment c est fait: Parametre InfoPage avec un contenu dedie accessoires.
 * Comment c est fait: Parametre InfoPage avec un contenu dedie accessoires.
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
const Accessoires = () => {
// Ligne 11: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 12: Ouvre un element JSX qui compose l interface utilisateur.
        <InfoPage
// Ligne 13: Effectue une affectation ou initialise une valeur.
            tag="Produits"
// Ligne 14: Effectue une affectation ou initialise une valeur.
            title="Accessoires"
// Ligne 15: Effectue une affectation ou initialise une valeur.
            lead="Tout pour préparer, infuser et conserver vos crus avec précision."
// Ligne 16: Ouvre un bloc de code ou une structure de donnees.
            actions={[
// Ligne 17: Execute cette instruction: { label: "Voir les accessoires", to: "/catalogue", variant: "primary" },
                { label: "Voir les accessoires", to: "/catalogue", variant: "primary" },
// Ligne 18: Execute cette instruction: { label: "Demander conseil", to: "/contact", variant: "ghost-dark" },
                { label: "Demander conseil", to: "/contact", variant: "ghost-dark" },
// Ligne 19: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 20: Ouvre un bloc de code ou une structure de donnees.
            sections={[
// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 22: Execute cette instruction: title: "Infusion",
                    title: "Infusion",
// Ligne 23: Execute cette instruction: text: "Les essentiels pour un thé parfaitement infusé.",
                    text: "Les essentiels pour un thé parfaitement infusé.",
// Ligne 24: Execute cette instruction: items: ["Théières en verre", "Filtres en inox", "Thermomètres"],
                    items: ["Théières en verre", "Filtres en inox", "Thermomètres"],
// Ligne 25: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 26: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 27: Execute cette instruction: title: "Café",
                    title: "Café",
// Ligne 28: Execute cette instruction: text: "Des outils fiables pour toutes les méthodes.",
                    text: "Des outils fiables pour toutes les méthodes.",
// Ligne 29: Execute cette instruction: items: ["Moulins manuels", "Presse française", "Balance de précision"],
                    items: ["Moulins manuels", "Presse française", "Balance de précision"],
// Ligne 30: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 31: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 32: Execute cette instruction: title: "Conservation",
                    title: "Conservation",
// Ligne 33: Execute cette instruction: text: "Gardez les arômes intacts plus longtemps.",
                    text: "Gardez les arômes intacts plus longtemps.",
// Ligne 34: Execute cette instruction: items: ["Boîtes hermétiques", "Cuillères doseuses", "Poches fraîcheur"],
                    items: ["Boîtes hermétiques", "Cuillères doseuses", "Poches fraîcheur"],
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
export default Accessoires;
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.
