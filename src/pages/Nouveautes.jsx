/**
 * @file Nouveautes.jsx
 * Role: Page Nouveautes.
 * Comment c est fait: Parametre InfoPage avec les nouveaux produits/offres.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import InfoPage from "../components/InfoPage.jsx";
import "../styles/Nouveautes.css";

const Nouveautes = () => {
    return (
        <InfoPage
            tag="Sélections"
            title="Nouveautés"
            lead="Les dernières arrivées, micro-lots et éditions limitées du moment."
            actions={[
                { label: "Voir les nouveautés", to: "/catalogue", variant: "primary" },
                { label: "S'inscrire aux alertes", to: "/contact", variant: "ghost-dark" },
            ]}
            sections={[
                {
                    title: "Nouveaux crus",
                    text: "Des récoltes fraîches sélectionnées chaque saison.",
                    items: ["Micro-lots saisonniers", "Récoltes du mois", "Séries limitées"],
                },
                {
                    title: "Coffrets",
                    text: "Des assortiments pensés pour la découverte.",
                    items: ["Dégustations guidées", "Mix thé & café", "Idées cadeaux"],
                },
                {
                    title: "Recommandations",
                    text: "Le meilleur des baristas et de la communauté.",
                    items: ["Sélection des baristas", "Meilleures ventes", "Favoris clients"],
                },
            ]}
        />
    );
};

export default Nouveautes;



