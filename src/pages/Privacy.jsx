/**
 * @file Privacy.jsx
 * Role: Page Politique de confidentialite.
 * Comment c est fait: Parametre InfoPage avec la politique de donnees personnelles.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import InfoPage from "../components/InfoPage.jsx";
import "../styles/Privacy.css";

const Privacy = () => {
    return (
        <InfoPage
            tag="Confidentialité"
            title="Privacy"
            lead="Votre confiance compte : transparence sur l'usage des données personnelles."
            actions={[
                { label: "Nous contacter", to: "/contact", variant: "primary" },
                { label: "Mentions légales", to: "/mentions-legales", variant: "ghost-dark" },
            ]}
            sections={[
                {
                    title: "Données collectées",
                    text: "Uniquement ce qui est nécessaire à votre expérience.",
                    items: ["Informations de compte", "Données de commande", "Préférences"],
                },
                {
                    title: "Utilisation",
                    text: "Pour gérer les commandes, améliorer le service et communiquer.",
                    items: ["Traitement des achats", "Suivi livraison", "Offres personnalisées"],
                },
                {
                    title: "Vos droits",
                    text: "Vous gardez le contrôle sur vos informations.",
                    items: ["Accès et rectification", "Suppression sur demande", "Opposition marketing"],
                },
            ]}
        />
    );
};

export default Privacy;



