// Fichier annote automatiquement pour revision junior: src\pages\ThesOrigine.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file ThesOrigine.jsx
 * @file ThesOrigine.jsx
// Ligne 3: Execute cette instruction: * Role: Page categorie Thes d origine.
 * Role: Page categorie Thes d origine.
// Ligne 4: Execute cette instruction: * Comment c est fait: Parametre InfoPage avec un contenu dedie thes.
 * Comment c est fait: Parametre InfoPage avec un contenu dedie thes.
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
const ThesOrigine = () => {
// Ligne 11: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 12: Ouvre un element JSX qui compose l interface utilisateur.
        <InfoPage
// Ligne 13: Effectue une affectation ou initialise une valeur.
            tag="Produits"
// Ligne 14: Effectue une affectation ou initialise une valeur.
            title="Thés d'origine"
// Ligne 15: Effectue une affectation ou initialise une valeur.
            lead="Des crus mono-origine sélectionnés pour leur caractère et leur fraîcheur, du jardin à votre tasse."
// Ligne 16: Ouvre un bloc de code ou une structure de donnees.
            actions={[
// Ligne 17: Execute cette instruction: { label: "Voir le catalogue", to: "/catalogue", variant: "primary" },
                { label: "Voir le catalogue", to: "/catalogue", variant: "primary" },
// Ligne 18: Execute cette instruction: { label: "Nous contacter", to: "/contact", variant: "ghost-dark" },
                { label: "Nous contacter", to: "/contact", variant: "ghost-dark" },
// Ligne 19: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 20: Ouvre un bloc de code ou une structure de donnees.
            sections={[
// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 22: Execute cette instruction: title: "Sélections par terroir",
                    title: "Sélections par terroir",
// Ligne 23: Execute cette instruction: text: "Des jardins emblématiques d'Asie et d'Afrique, sourcés en direct.",
                    text: "Des jardins emblématiques d'Asie et d'Afrique, sourcés en direct.",
// Ligne 24: Execute cette instruction: items: ["Darjeeling, Assam, Nilgiri", "Uji, Shizuoka, Yunnan", "Ceylan, Kenya, Rwanda"],
                    items: ["Darjeeling, Assam, Nilgiri", "Uji, Shizuoka, Yunnan", "Ceylan, Kenya, Rwanda"],
// Ligne 25: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 26: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 27: Execute cette instruction: title: "Profils aromatiques",
                    title: "Profils aromatiques",
// Ligne 28: Execute cette instruction: text: "Notes florales, végétales ou maltées selon l'infusion.",
                    text: "Notes florales, végétales ou maltées selon l'infusion.",
// Ligne 29: Execute cette instruction: items: ["Verts délicats et frais", "Noirs ronds et cacaotés", "Oolongs complexes"],
                    items: ["Verts délicats et frais", "Noirs ronds et cacaotés", "Oolongs complexes"],
// Ligne 30: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 31: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 32: Execute cette instruction: title: "Formats disponibles",
                    title: "Formats disponibles",
// Ligne 33: Execute cette instruction: text: "Pour la dégustation ou le quotidien.",
                    text: "Pour la dégustation ou le quotidien.",
// Ligne 34: Execute cette instruction: items: ["Sachets grand format", "Vrac premium", "Coffrets découverte"],
                    items: ["Sachets grand format", "Vrac premium", "Coffrets découverte"],
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
export default ThesOrigine;
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.
