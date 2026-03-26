import React from "react";
import { Link } from "react-router-dom";
import { getProductImage } from "../utils/productImages.js";

const ProductCard = ({ produit }) => {
    const imageUrl = getProductImage(produit);
    const productId = produit.id_article ?? produit.id ?? produit.id_articles;

    return (
        <div className="product-card">
            <img
                src={imageUrl}
                alt={produit.nom_produit}
                className="product-card-images"
            />
            <h3>{produit.nom_produit}</h3>
            <p>{produit.prix_ttc}</p>

            <Link
                to={`/produit/${productId}`}
                state={{ product: produit }}
                className="details-btn"
            >
                Voir Details
            </Link>
        </div>
    );
};

export default ProductCard;
