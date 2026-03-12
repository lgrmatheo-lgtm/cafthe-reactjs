
import React from "react";
import InfoPage from "../components/InfoPage.jsx";
import "../styles/LivraisonRetours.css";

const LivraisonRetours = () => {
    return (
        <InfoPage
            tag="Aide"
            title="Livraison & Retours"
            lead="Des expéditions rapides, un suivi clair et des retours simples."
            actions={[
                { label: "Suivre ma commande", to: "/profil", variant: "primary" },
                { label: "Contacter le support", to: "/contact", variant: "ghost-dark" },
            ]}
            sections={[
                {
                    title: "Délais & zones",
                    text: "Expédition sous 24-48h ouvrées en France métropolitaine.",
                    items: ["Livraison standard 2-4 jours", "Suivi colis inclus", "Europe sur demande"],
                },
                {
                    title: "Frais de livraison",
                    text: "Des tarifs transparents pour chaque panier.",
                    items: ["Offerte dès 50 €", "Tarif fixe en dessous", "Relais et domicile"],
                },
                {
                    title: "Retours & échanges",
                    text: "Vous avez 14 jours pour changer d'avis.",
                    items: ["Produit non ouvert", "Échange possible", "Remboursement rapide"],
                },
            ]}
        />
    );
};

export default LivraisonRetours;




