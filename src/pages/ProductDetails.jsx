/**
 * @file ProductDetails.jsx
 * Role: Fiche produit detaillee.
 * Comment c est fait: Charge un produit par id, gere quantite/poids, calcule prix en temps reel et ajoute au panier.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../context/cartContext.jsx";
import { getDiscountPercent, getDiscountedPrice } from "../utils/discounts.js";
import { getProductImage } from "../utils/productImages.js";
import "../styles/ProductDetails.css";

const WEIGHT_MULTIPLIERS = {
    "100g": 0.4,
    "250g": 1,
    "500g": 2,
    "1kg": 4,
};

const normalizeProduct = (produit) => {
    const id = produit.id_article ?? produit.id ?? produit.id_articles ?? produit._id;
    const name = produit.nom_produit ?? produit.nom ?? produit.name ?? "Produit";
    const price = Number(produit.prix_ttc ?? produit.prix ?? produit.price ?? 0);
    const category =
        produit.categorie?.nom ??
        produit.categorie ??
        produit.type ??
        produit.famille ??
        "Catégorie";
    const origin =
        produit.origine ??
        produit.pays ??
        produit.country ??
        produit.region ??
        "Origine";
    const image = getProductImage(produit);

    return {
        id,
        name,
        price,
        category,
        origin,
        description: produit.description ?? "",
        image,
        stock: produit.stock ?? 0,
        raw: produit,
    };
};

const ProductDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { addItem } = useContext(CartContext);

    const [produit, setProduit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [related, setRelated] = useState([]);
    const [selectedWeight, setSelectedWeight] = useState("250g");
    const [quantity, setQuantity] = useState(1);

    const productFromNavigationState = useMemo(() => {
        const stateProduct = location.state?.product;
        if (!stateProduct) return null;

        const normalized = normalizeProduct(stateProduct.raw ?? stateProduct);
        if (String(normalized.id) !== String(id)) return null;
        return normalized;
    }, [location.state, id]);

    useEffect(() => {
        setSelectedWeight("250g");
        setQuantity(1);
    }, [id]);

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (productFromNavigationState) {
                    setProduit(productFromNavigationState);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    setProduit(normalizeProduct(data.article ?? data));
                    return;
                }

                const listResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
                if (!listResponse.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }
                const listData = await listResponse.json();
                const list = (listData.article ?? listData.articles ?? []).map(normalizeProduct);
                const matched = list.find((item) => String(item.id) === String(id));

                if (!matched) {
                    throw new Error(`Produit introuvable (${id})`);
                }

                setProduit(matched);
            } catch (err) {
                console.error("Erreur lors du chargement du produit :", err);
                setError("Impossible de charger le produit");
            } finally {
                setIsLoading(false);
            }
        };

        void fetchProduit();
    }, [id, productFromNavigationState]);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
                if (!response.ok) return;
                const data = await response.json();
                const items = (data.article ?? data.articles ?? []).map(normalizeProduct);
                setRelated(items.filter((item) => String(item.id) !== String(id)).slice(0, 3));
            } catch (err) {
                console.error("Erreur lors du chargement des produits complémentaires :", err);
            }
        };

        void fetchRelated();
    }, [id]);

    const weightMultiplier = useMemo(
        () => WEIGHT_MULTIPLIERS[selectedWeight] ?? 1,
        [selectedWeight]
    );

    const unitBasePrice = useMemo(() => {
        if (!produit) return 0;
        return produit.price * weightMultiplier;
    }, [produit, weightMultiplier]);

    const unitDiscountedPrice = useMemo(() => {
        if (!produit) return 0;
        return getDiscountedPrice(unitBasePrice, produit.id);
    }, [produit, unitBasePrice]);

    const totalPrice = useMemo(
        () => unitDiscountedPrice * quantity,
        [unitDiscountedPrice, quantity]
    );

    if (isLoading) {
        return (
            <div className="product-details-skeleton">
                <Skeleton height={420} width={420} />
                <div style={{ marginTop: 20 }}>
                    <Skeleton height={30} width="50%" />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={20} width="40%" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-error">
                <div className="error-container">
                    <h3> Une erreur est survenue</h3>
                    <p>{error}</p>
                    <Link to="/" className="back-link">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    if (!produit) {
        return null;
    }

    const discount = getDiscountPercent(produit.id);
    const discountedPrice = unitDiscountedPrice;
    const pageTitle = `${produit.name} | CafThe`;
    const shortDescription = produit.description
        ? `${produit.description.slice(0, 145)}${produit.description.length > 145 ? "..." : ""}`
        : `Decouvrez ${produit.name}, un produit ${produit.category.toLowerCase()} selectionne par CafThe.`;

    return (
        <main className="product-page">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={shortDescription} />
            </Helmet>
            <div className="breadcrumb">Accueil / Catalogue / {produit.name}</div>

            <section className="product-hero">
                <div className="product-gallery">
                    <img src={produit.image} alt={produit.name} className="product-main" />
                </div>
                <div className="product-info">
                    <span className="product-category">{produit.category}</span>
                    <h1>{produit.name}</h1>
                    <div className="product-price">
                        {discount > 0 && (
                            <span className="price-old">{unitBasePrice.toFixed(2)} €</span>
                        )}
                        <span className="price-new">{discountedPrice.toFixed(2)} €</span>
                        <span className="price-note">Stock {produit.stock} unités</span>
                    </div>
                    <p>{produit.description || "Un café ou thé d'exception, sélectionné pour son profil aromatique unique."}</p>

                    <div className="product-weights">
                        {"100g 250g 500g 1kg".split(" ").map((weight) => (
                            <button
                                key={weight}
                                type="button"
                                className={selectedWeight === weight ? "active" : ""}
                                onClick={() => setSelectedWeight(weight)}
                            >
                                {weight}
                            </button>
                        ))}
                    </div>

                    <div className="product-actions">
                        <div className="quantity">
                            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
                        </div>
                        <button
                            type="button"
                            className="primary"
                            onClick={() => {
                                for (let i = 0; i < quantity; i += 1) {
                                    addItem({
                                        id: produit.id,
                                        name: produit.name,
                                        price: unitBasePrice,
                                        image: produit.image,
                                        variant: selectedWeight,
                                    });
                                }
                            }}
                        >
                            Ajouter au panier ({totalPrice.toFixed(2)} €)
                        </button>
                    </div>
                    <div className="price-note">Prix calculé selon poids et quantité.</div>

                    <ul className="product-highlights">
                        <li>Origine: {produit.origin}</li>
                        <li>Torréfaction artisanale</li>
                        <li>Livraison offerte dès 50 €</li>
                    </ul>
                </div>
            </section>

            <section className="product-reviews">
                <div className="section-header">
                    <h2>Avis clients (24)</h2>
                    <button type="button" className="section-link">Voir tous les avis</button>
                </div>
                <div className="reviews-grid">
                    {[
                        "Un profil aromatique délicat, parfait pour le matin.",
                        "Très bon équilibre, livraison rapide et soignée.",
                        "Goût authentique, je recommande vivement.",
                    ].map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-rating">?????</div>
                            <p>{review}</p>
                            <span>Client vérifié</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="product-related">
                <div className="section-header">
                    <h2>Produits complémentaires</h2>
                    <button type="button" className="section-link">Voir plus</button>
                </div>
                <div className="related-grid">
                    {related.map((item) => {
                        const relatedDiscount = getDiscountPercent(item.id);
                        const relatedPrice = getDiscountedPrice(item.price, item.id);
                        return (
                            <Link
                                key={item.id}
                                to={`/produit/${item.id}`}
                                state={{ product: item }}
                                className="related-card"
                            >
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <h3>{item.name}</h3>
                                    <span className="price-stack">
                                        {relatedDiscount > 0 && (
                                            <span className="price-old">{item.price.toFixed(2)} €</span>
                                        )}
                                        <span className="price-new">{relatedPrice.toFixed(2)} €</span>
                                    </span>
                                </div>
                                <button type="button">Ajouter</button>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
};

export default ProductDetails;






