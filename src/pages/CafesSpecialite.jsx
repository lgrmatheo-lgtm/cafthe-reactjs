/**
 * @file CafesSpecialite.jsx
 * Role: Page categorie Cafes de specialite.
 * Comment c est fait: Parametre InfoPage avec un contenu dedie cafes.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import InfoPage from "../components/InfoPage.jsx";
import "../styles/CafesSpecialite.css";

const CafesSpecialite = () => {
    return (
        <InfoPage
            tag="Produits"
            title="Cafés de spécialité"
            lead="Des grains de spécialité torréfiés avec précision pour révéler chaque terroir."
            actions={[
                { label: "Découvrir le catalogue", to: "/catalogue", variant: "primary" },
                { label: "Conseil barista", to: "/contact", variant: "ghost-dark" },
            ]}
            sections={[
                {
                    title: "Torréfaction douce",
                    text: "Petits lots et profils sur mesure pour espresso et méthodes douces.",
                    items: ["Torréfié à la commande", "Profil espresso / filtre", "Traçabilité complète"],
                },
                {
                    title: "Origines & variétés",
                    text: "Une sélection de fermes engagées et de variétés reconnues.",
                    items: ["Éthiopie, Colombie, Brésil", "Bourbon, Geisha, Caturra", "Score SCA 84+"],
                },
                {
                    title: "Préparations",
                    text: "Du grain entier à la mouture précise.",
                    items: ["Grain ou moulu", "Espresso, V60, presse", "Abonnements mensuels"],
                },
            ]}
        />
    );
};

export default CafesSpecialite;



