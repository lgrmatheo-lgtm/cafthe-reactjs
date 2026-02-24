/**
 * @file Terms.jsx
 * Role: Page Conditions generales.
 * Comment c est fait: Parametre InfoPage avec CGU/CGV et clauses contractuelles.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import InfoPage from "../components/InfoPage.jsx";

const Terms = () => {
    return (
        <InfoPage
            tag="Conditions"
            title="Terms"
            lead="Conditions générales d'utilisation et de vente de CafThé."
            actions={[
                { label: "Contact", to: "/contact", variant: "primary" },
                { label: "Confidentialité", to: "/privacy", variant: "ghost-dark" },
            ]}
            sections={[
                {
                    title: "Commandes",
                    text: "Chaque commande est confirmée par email.",
                    items: ["Disponibilité des stocks", "Confirmation immédiate", "Suivi en ligne"],
                },
                {
                    title: "Prix & paiement",
                    text: "Des prix affichés en toute transparence.",
                    items: ["Taxes incluses", "Paiement sécurisé", "Facture disponible"],
                },
                {
                    title: "Responsabilités",
                    text: "Nous veillons à la qualité et au service.",
                    items: ["Service client dédié", "Limites de responsabilité", "Traitement des litiges"],
                },
            ]}
        />
    );
};

export default Terms;
