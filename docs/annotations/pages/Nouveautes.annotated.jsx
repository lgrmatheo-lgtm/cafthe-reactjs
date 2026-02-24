// Fichier annote automatiquement pour revision junior: src\pages\Nouveautes.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Nouveautes.jsx
 * @file Nouveautes.jsx
// Ligne 3: Execute cette instruction: * Role: Page Nouveautes.
 * Role: Page Nouveautes.
// Ligne 4: Execute cette instruction: * Comment c est fait: Parametre InfoPage avec les nouveaux produits/offres.
 * Comment c est fait: Parametre InfoPage avec les nouveaux produits/offres.
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
const Nouveautes = () => {
// Ligne 11: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 12: Ouvre un element JSX qui compose l interface utilisateur.
        <InfoPage
// Ligne 13: Effectue une affectation ou initialise une valeur.
            tag="Sélections"
// Ligne 14: Effectue une affectation ou initialise une valeur.
            title="Nouveautés"
// Ligne 15: Effectue une affectation ou initialise une valeur.
            lead="Les dernières arrivées, micro-lots et éditions limitées du moment."
// Ligne 16: Ouvre un bloc de code ou une structure de donnees.
            actions={[
// Ligne 17: Execute cette instruction: { label: "Voir les nouveautés", to: "/catalogue", variant: "primary" },
                { label: "Voir les nouveautés", to: "/catalogue", variant: "primary" },
// Ligne 18: Execute cette instruction: { label: "S'inscrire aux alertes", to: "/contact", variant: "ghost-dark" },
                { label: "S'inscrire aux alertes", to: "/contact", variant: "ghost-dark" },
// Ligne 19: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 20: Ouvre un bloc de code ou une structure de donnees.
            sections={[
// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 22: Execute cette instruction: title: "Nouveaux crus",
                    title: "Nouveaux crus",
// Ligne 23: Execute cette instruction: text: "Des récoltes fraîches sélectionnées chaque saison.",
                    text: "Des récoltes fraîches sélectionnées chaque saison.",
// Ligne 24: Execute cette instruction: items: ["Micro-lots saisonniers", "Récoltes du mois", "Séries limitées"],
                    items: ["Micro-lots saisonniers", "Récoltes du mois", "Séries limitées"],
// Ligne 25: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 26: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 27: Execute cette instruction: title: "Coffrets",
                    title: "Coffrets",
// Ligne 28: Execute cette instruction: text: "Des assortiments pensés pour la découverte.",
                    text: "Des assortiments pensés pour la découverte.",
// Ligne 29: Execute cette instruction: items: ["Dégustations guidées", "Mix thé & café", "Idées cadeaux"],
                    items: ["Dégustations guidées", "Mix thé & café", "Idées cadeaux"],
// Ligne 30: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 31: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 32: Execute cette instruction: title: "Recommandations",
                    title: "Recommandations",
// Ligne 33: Execute cette instruction: text: "Le meilleur des baristas et de la communauté.",
                    text: "Le meilleur des baristas et de la communauté.",
// Ligne 34: Execute cette instruction: items: ["Sélection des baristas", "Meilleures ventes", "Favoris clients"],
                    items: ["Sélection des baristas", "Meilleures ventes", "Favoris clients"],
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
export default Nouveautes;
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.
