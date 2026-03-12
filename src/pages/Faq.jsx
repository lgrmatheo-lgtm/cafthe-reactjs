/**
 * @file Faq.jsx
 * Role: Page FAQ.
 * Comment c est fait: Parametre InfoPage avec les questions/reponses frequentes.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import InfoPage from "../components/InfoPage.jsx";
import "../styles/Faq.css";

const Faq = () => {
    return (
        <InfoPage
            tag="Aide"
            title="FAQ"
            lead="Les réponses aux questions les plus fréquentes."
            actions={[
                { label: "Nous contacter", to: "/contact", variant: "primary" },
                { label: "Voir le catalogue", to: "/catalogue", variant: "ghost-dark" },
            ]}
            sections={[
                {
                    title: "Commande",
                    text: "Comment passer commande et modifier votre panier.",
                    items: ["Ajoutez vos produits au panier", "Validez en 3 étapes", "Confirmation par email"],
                },
                {
                    title: "Livraison",
                    text: "Délais, suivi et informations de transport.",
                    items: ["Suivi disponible dans votre compte", "Adresse modifiable avant expédition", "Livraison offerte dès 50 €"],
                },
                {
                    title: "Paiement",
                    text: "Des options sécurisées pour régler vos achats.",
                    items: ["Carte bancaire", "Paiement sécurisé", "Facture disponible"],
                },
                {
                    title: "Compte",
                    text: "Gérez vos informations et vos commandes.",
                    items: ["Historique des achats", "Adresses enregistrées", "Support client"],
                },
            ]}
        />
    );
};

export default Faq;



