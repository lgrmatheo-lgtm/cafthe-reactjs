/**
 * @file Contact.jsx
 * Role: Page Contact.
 * Comment c est fait: Parametre InfoPage avec les canaux de contact et horaires.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import InfoPage from "../components/InfoPage.jsx";

const Contact = () => {
    return (
        <InfoPage
            tag="Aide"
            title="Contact"
            lead="Besoin d'aide ou d'un conseil personnalisé ? Notre équipe vous répond rapidement."
            actions={[
                { label: "Se connecter", to: "/login", variant: "primary" },
                { label: "Voir la FAQ", to: "/faq", variant: "ghost-dark" },
            ]}
            sections={[
                {
                    title: "Service client",
                    text: "Du lundi au vendredi, 9h-18h.",
                    items: ["contact@cafthe.fr", "Réponse sous 24h", "Assistance commande"],
                },
                {
                    title: "Partenariats",
                    text: "Cafés, hôtels, bureaux et événements.",
                    items: ["Sélections sur mesure", "Offres B2B", "Démonstrations"],
                },
                {
                    title: "Presse & influence",
                    text: "Demandes médias et collaborations.",
                    items: ["Kit presse", "Échantillons", "Interviews"],
                },
            ]}
        />
    );
};

export default Contact;
