// Fichier annote automatiquement pour revision junior: src\pages\CafesSpecialite.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file CafesSpecialite.jsx
 * @file CafesSpecialite.jsx
// Ligne 3: Execute cette instruction: * Role: Page categorie Cafes de specialite.
 * Role: Page categorie Cafes de specialite.
// Ligne 4: Execute cette instruction: * Comment c est fait: Parametre InfoPage avec un contenu dedie cafes.
 * Comment c est fait: Parametre InfoPage avec un contenu dedie cafes.
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
const CafesSpecialite = () => {
// Ligne 11: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 12: Ouvre un element JSX qui compose l interface utilisateur.
        <InfoPage
// Ligne 13: Effectue une affectation ou initialise une valeur.
            tag="Produits"
// Ligne 14: Effectue une affectation ou initialise une valeur.
            title="Cafés de spécialité"
// Ligne 15: Effectue une affectation ou initialise une valeur.
            lead="Des grains de spécialité torréfiés avec précision pour révéler chaque terroir."
// Ligne 16: Ouvre un bloc de code ou une structure de donnees.
            actions={[
// Ligne 17: Execute cette instruction: { label: "Découvrir le catalogue", to: "/catalogue", variant: "primary" },
                { label: "Découvrir le catalogue", to: "/catalogue", variant: "primary" },
// Ligne 18: Execute cette instruction: { label: "Conseil barista", to: "/contact", variant: "ghost-dark" },
                { label: "Conseil barista", to: "/contact", variant: "ghost-dark" },
// Ligne 19: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 20: Ouvre un bloc de code ou une structure de donnees.
            sections={[
// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 22: Execute cette instruction: title: "Torréfaction douce",
                    title: "Torréfaction douce",
// Ligne 23: Execute cette instruction: text: "Petits lots et profils sur mesure pour espresso et méthodes douces.",
                    text: "Petits lots et profils sur mesure pour espresso et méthodes douces.",
// Ligne 24: Execute cette instruction: items: ["Torréfié à la commande", "Profil espresso / filtre", "Traçabilité complète"],
                    items: ["Torréfié à la commande", "Profil espresso / filtre", "Traçabilité complète"],
// Ligne 25: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 26: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 27: Execute cette instruction: title: "Origines & variétés",
                    title: "Origines & variétés",
// Ligne 28: Execute cette instruction: text: "Une sélection de fermes engagées et de variétés reconnues.",
                    text: "Une sélection de fermes engagées et de variétés reconnues.",
// Ligne 29: Execute cette instruction: items: ["Éthiopie, Colombie, Brésil", "Bourbon, Geisha, Caturra", "Score SCA 84+"],
                    items: ["Éthiopie, Colombie, Brésil", "Bourbon, Geisha, Caturra", "Score SCA 84+"],
// Ligne 30: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 31: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 32: Execute cette instruction: title: "Préparations",
                    title: "Préparations",
// Ligne 33: Execute cette instruction: text: "Du grain entier à la mouture précise.",
                    text: "Du grain entier à la mouture précise.",
// Ligne 34: Execute cette instruction: items: ["Grain ou moulu", "Espresso, V60, presse", "Abonnements mensuels"],
                    items: ["Grain ou moulu", "Espresso, V60, presse", "Abonnements mensuels"],
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
export default CafesSpecialite;
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.
