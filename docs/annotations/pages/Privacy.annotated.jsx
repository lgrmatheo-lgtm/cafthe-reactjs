// Fichier annote automatiquement pour revision junior: src\pages\Privacy.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Privacy.jsx
 * @file Privacy.jsx
// Ligne 3: Execute cette instruction: * Role: Page Politique de confidentialite.
 * Role: Page Politique de confidentialite.
// Ligne 4: Execute cette instruction: * Comment c est fait: Parametre InfoPage avec la politique de donnees personnelles.
 * Comment c est fait: Parametre InfoPage avec la politique de donnees personnelles.
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
const Privacy = () => {
// Ligne 11: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 12: Ouvre un element JSX qui compose l interface utilisateur.
        <InfoPage
// Ligne 13: Effectue une affectation ou initialise une valeur.
            tag="Confidentialité"
// Ligne 14: Effectue une affectation ou initialise une valeur.
            title="Privacy"
// Ligne 15: Effectue une affectation ou initialise une valeur.
            lead="Votre confiance compte : transparence sur l'usage des données personnelles."
// Ligne 16: Ouvre un bloc de code ou une structure de donnees.
            actions={[
// Ligne 17: Execute cette instruction: { label: "Nous contacter", to: "/contact", variant: "primary" },
                { label: "Nous contacter", to: "/contact", variant: "primary" },
// Ligne 18: Execute cette instruction: { label: "Mentions légales", to: "/mentions-legales", variant: "ghost-dark" },
                { label: "Mentions légales", to: "/mentions-legales", variant: "ghost-dark" },
// Ligne 19: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 20: Ouvre un bloc de code ou une structure de donnees.
            sections={[
// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 22: Execute cette instruction: title: "Données collectées",
                    title: "Données collectées",
// Ligne 23: Execute cette instruction: text: "Uniquement ce qui est nécessaire à votre expérience.",
                    text: "Uniquement ce qui est nécessaire à votre expérience.",
// Ligne 24: Execute cette instruction: items: ["Informations de compte", "Données de commande", "Préférences"],
                    items: ["Informations de compte", "Données de commande", "Préférences"],
// Ligne 25: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 26: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 27: Execute cette instruction: title: "Utilisation",
                    title: "Utilisation",
// Ligne 28: Execute cette instruction: text: "Pour gérer les commandes, améliorer le service et communiquer.",
                    text: "Pour gérer les commandes, améliorer le service et communiquer.",
// Ligne 29: Execute cette instruction: items: ["Traitement des achats", "Suivi livraison", "Offres personnalisées"],
                    items: ["Traitement des achats", "Suivi livraison", "Offres personnalisées"],
// Ligne 30: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 31: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 32: Execute cette instruction: title: "Vos droits",
                    title: "Vos droits",
// Ligne 33: Execute cette instruction: text: "Vous gardez le contrôle sur vos informations.",
                    text: "Vous gardez le contrôle sur vos informations.",
// Ligne 34: Execute cette instruction: items: ["Accès et rectification", "Suppression sur demande", "Opposition marketing"],
                    items: ["Accès et rectification", "Suppression sur demande", "Opposition marketing"],
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
export default Privacy;
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.
