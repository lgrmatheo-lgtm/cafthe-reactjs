/**
 * @file Accessoires.jsx
 * Role: Page categorie Accessoires.
 * Comment c est fait: Parametre InfoPage avec un contenu dedie accessoires.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import InfoPage from "../components/InfoPage.jsx";
import "../styles/Accessoires.css";

const Accessoires = () => {
    return (
        <InfoPage
            tag="Produits"
            title="Accessoires"
            lead="Tout pour préparer, infuser et conserver vos crus avec précision."
            actions={[
                { label: "Voir les accessoires", to: "/catalogue", variant: "primary" },
                { label: "Demander conseil", to: "/contact", variant: "ghost-dark" },
            ]}
            sections={[
                {
                    title: "Infusion",
                    text: "Les essentiels pour un thé parfaitement infusé.",
                    items: ["Théières en verre", "Filtres en inox", "Thermomètres"],
                },
                {
                    title: "Café",
                    text: "Des outils fiables pour toutes les méthodes.",
                    items: ["Moulins manuels", "Presse française", "Balance de précision"],
                },
                {
                    title: "Conservation",
                    text: "Gardez les arômes intacts plus longtemps.",
                    items: ["Boîtes hermétiques", "Cuillères doseuses", "Poches fraîcheur"],
                },
            ]}
        />
    );
};

export default Accessoires;



