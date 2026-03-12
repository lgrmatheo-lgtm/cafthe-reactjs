/**
 * @file MentionsLegales.jsx
 * Role: Page Mentions legales.
 * Comment c est fait: Parametre InfoPage avec les obligations legales de publication.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import InfoPage from "../components/InfoPage.jsx";
import "../styles/MentionsLegales.css";

const MentionsLegales = () => {
    return (
        <InfoPage
            tag="Informations"
            title="Mentions légales"
            lead="Informations légales et éditoriales du site CafThé."
            actions={[
                { label: "Contact", to: "/contact", variant: "primary" },
                { label: "Confidentialité", to: "/privacy", variant: "ghost-dark" },
            ]}
            sections={[
                {
                    title: "Éditeur du site",
                    text: "CafThé, marque dédiée aux thés et cafés d'exception.",
                    items: ["Direction de publication", "Coordonnées", "SIRET sur demande"],
                },
                {
                    title: "Hébergement",
                    text: "Infrastructure sécurisée et performante.",
                    items: ["Serveurs européens", "Disponibilité 24/7", "Sauvegardes régulières"],
                },
                {
                    title: "Propriété intellectuelle",
                    text: "L'ensemble du contenu est protégé.",
                    items: ["Textes, images, logos", "Reproduction interdite", "Marques déposées"],
                },
            ]}
        />
    );
};

export default MentionsLegales;



