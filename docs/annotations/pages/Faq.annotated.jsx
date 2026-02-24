// Fichier annote automatiquement pour revision junior: src\pages\Faq.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Faq.jsx
 * @file Faq.jsx
// Ligne 3: Execute cette instruction: * Role: Page FAQ.
 * Role: Page FAQ.
// Ligne 4: Execute cette instruction: * Comment c est fait: Parametre InfoPage avec les questions/reponses frequentes.
 * Comment c est fait: Parametre InfoPage avec les questions/reponses frequentes.
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
const Faq = () => {
// Ligne 11: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 12: Ouvre un element JSX qui compose l interface utilisateur.
        <InfoPage
// Ligne 13: Effectue une affectation ou initialise une valeur.
            tag="Aide"
// Ligne 14: Effectue une affectation ou initialise une valeur.
            title="FAQ"
// Ligne 15: Effectue une affectation ou initialise une valeur.
            lead="Les réponses aux questions les plus fréquentes."
// Ligne 16: Ouvre un bloc de code ou une structure de donnees.
            actions={[
// Ligne 17: Execute cette instruction: { label: "Nous contacter", to: "/contact", variant: "primary" },
                { label: "Nous contacter", to: "/contact", variant: "primary" },
// Ligne 18: Execute cette instruction: { label: "Voir le catalogue", to: "/catalogue", variant: "ghost-dark" },
                { label: "Voir le catalogue", to: "/catalogue", variant: "ghost-dark" },
// Ligne 19: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 20: Ouvre un bloc de code ou une structure de donnees.
            sections={[
// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 22: Execute cette instruction: title: "Commande",
                    title: "Commande",
// Ligne 23: Execute cette instruction: text: "Comment passer commande et modifier votre panier.",
                    text: "Comment passer commande et modifier votre panier.",
// Ligne 24: Execute cette instruction: items: ["Ajoutez vos produits au panier", "Validez en 3 étapes", "Confirmation par email"],
                    items: ["Ajoutez vos produits au panier", "Validez en 3 étapes", "Confirmation par email"],
// Ligne 25: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 26: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 27: Execute cette instruction: title: "Livraison",
                    title: "Livraison",
// Ligne 28: Execute cette instruction: text: "Délais, suivi et informations de transport.",
                    text: "Délais, suivi et informations de transport.",
// Ligne 29: Execute cette instruction: items: ["Suivi disponible dans votre compte", "Adresse modifiable avant expédition", "Livraison offerte dès 50 €"],
                    items: ["Suivi disponible dans votre compte", "Adresse modifiable avant expédition", "Livraison offerte dès 50 €"],
// Ligne 30: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 31: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 32: Execute cette instruction: title: "Paiement",
                    title: "Paiement",
// Ligne 33: Execute cette instruction: text: "Des options sécurisées pour régler vos achats.",
                    text: "Des options sécurisées pour régler vos achats.",
// Ligne 34: Execute cette instruction: items: ["Carte bancaire", "Paiement sécurisé", "Facture disponible"],
                    items: ["Carte bancaire", "Paiement sécurisé", "Facture disponible"],
// Ligne 35: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 36: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 37: Execute cette instruction: title: "Compte",
                    title: "Compte",
// Ligne 38: Execute cette instruction: text: "Gérez vos informations et vos commandes.",
                    text: "Gérez vos informations et vos commandes.",
// Ligne 39: Execute cette instruction: items: ["Historique des achats", "Adresses enregistrées", "Support client"],
                    items: ["Historique des achats", "Adresses enregistrées", "Support client"],
// Ligne 40: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 41: Ferme un bloc de code ou une structure de donnees.
            ]}
// Ligne 42: Execute cette instruction: />
        />
// Ligne 43: Execute cette instruction: );
    );
// Ligne 44: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 45: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 46: Expose ce composant comme export par defaut du fichier.
export default Faq;
// Ligne 47: Ligne vide pour aerer le code et separer les blocs logiques.
