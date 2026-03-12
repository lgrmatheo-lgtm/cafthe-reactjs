/**
 * @file ThesOrigine.jsx
 * Role: Page categorie Thes d origine.
 * Comment c est fait: Parametre InfoPage avec un contenu dedie thes.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React from "react";
import InfoPage from "../components/InfoPage.jsx";
import "../styles/ThesOrigine.css";

const ThesOrigine = () => {
    return (
        <InfoPage
            tag="Produits"
            title="Thés d'origine"
            lead="Des crus mono-origine sélectionnés pour leur caractère et leur fraîcheur, du jardin à votre tasse."
            actions={[
                { label: "Voir le catalogue", to: "/catalogue", variant: "primary" },
                { label: "Nous contacter", to: "/contact", variant: "ghost-dark" },
            ]}
            sections={[
                {
                    title: "Sélections par terroir",
                    text: "Des jardins emblématiques d'Asie et d'Afrique, sourcés en direct.",
                    items: ["Darjeeling, Assam, Nilgiri", "Uji, Shizuoka, Yunnan", "Ceylan, Kenya, Rwanda"],
                },
                {
                    title: "Profils aromatiques",
                    text: "Notes florales, végétales ou maltées selon l'infusion.",
                    items: ["Verts délicats et frais", "Noirs ronds et cacaotés", "Oolongs complexes"],
                },
                {
                    title: "Formats disponibles",
                    text: "Pour la dégustation ou le quotidien.",
                    items: ["Sachets grand format", "Vrac premium", "Coffrets découverte"],
                },
            ]}
        />
    );
};

export default ThesOrigine;



