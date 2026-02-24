// Fichier annote automatiquement pour revision junior: src\pages\ProductDetails.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file ProductDetails.jsx
 * @file ProductDetails.jsx
// Ligne 3: Execute cette instruction: * Role: Fiche produit detaillee.
 * Role: Fiche produit detaillee.
// Ligne 4: Execute cette instruction: * Comment c est fait: Charge un produit par id, gere quantite/poids, calcule prix en temps reel et ajoute au panier.
 * Comment c est fait: Charge un produit par id, gere quantite/poids, calcule prix en temps reel et ajoute au panier.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useContext, useEffect, useMemo, useState } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import { Link, useParams } from "react-router-dom";
// Ligne 9: Importe un module necessaire au composant ou a sa logique.
import Skeleton from "react-loading-skeleton";
// Ligne 10: Importe un module necessaire au composant ou a sa logique.
import { Helmet } from "react-helmet-async";
// Ligne 11: Importe un module necessaire au composant ou a sa logique.
import { CartContext } from "../context/cartContext.jsx";
// Ligne 12: Importe un module necessaire au composant ou a sa logique.
import { getDiscountPercent, getDiscountedPrice } from "../utils/discounts.js";
// Ligne 13: Importe un module necessaire au composant ou a sa logique.
import { getProductImage } from "../utils/productImages.js";
// Ligne 14: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 15: Declare une variable locale utilisee par le composant.
const normalizeProduct = (produit) => {
// Ligne 16: Declare une variable locale utilisee par le composant.
    const id = produit.id_article ?? produit.id ?? produit.id_articles ?? produit._id;
// Ligne 17: Declare une variable locale utilisee par le composant.
    const name = produit.nom_produit ?? produit.nom ?? produit.name ?? "Produit";
// Ligne 18: Declare une variable locale utilisee par le composant.
    const price = Number(produit.prix_ttc ?? produit.prix ?? produit.price ?? 0);
// Ligne 19: Declare une variable locale utilisee par le composant.
    const category =
// Ligne 20: Execute cette instruction: produit.categorie?.nom ??
        produit.categorie?.nom ??
// Ligne 21: Execute cette instruction: produit.categorie ??
        produit.categorie ??
// Ligne 22: Execute cette instruction: produit.type ??
        produit.type ??
// Ligne 23: Execute cette instruction: produit.famille ??
        produit.famille ??
// Ligne 24: Execute cette instruction: "Catégorie";
        "Catégorie";
// Ligne 25: Declare une variable locale utilisee par le composant.
    const origin =
// Ligne 26: Execute cette instruction: produit.origine ??
        produit.origine ??
// Ligne 27: Execute cette instruction: produit.pays ??
        produit.pays ??
// Ligne 28: Execute cette instruction: produit.country ??
        produit.country ??
// Ligne 29: Execute cette instruction: produit.region ??
        produit.region ??
// Ligne 30: Execute cette instruction: "Origine";
        "Origine";
// Ligne 31: Declare une variable locale utilisee par le composant.
    const image = getProductImage(produit);
// Ligne 32: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 33: Retourne une valeur depuis la fonction en cours.
    return {
// Ligne 34: Execute cette instruction: id,
        id,
// Ligne 35: Execute cette instruction: name,
        name,
// Ligne 36: Execute cette instruction: price,
        price,
// Ligne 37: Execute cette instruction: category,
        category,
// Ligne 38: Execute cette instruction: origin,
        origin,
// Ligne 39: Execute cette instruction: description: produit.description ?? "",
        description: produit.description ?? "",
// Ligne 40: Execute cette instruction: image,
        image,
// Ligne 41: Execute cette instruction: stock: produit.stock ?? 0,
        stock: produit.stock ?? 0,
// Ligne 42: Execute cette instruction: raw: produit,
        raw: produit,
// Ligne 43: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 44: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 45: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 46: Declare une variable locale utilisee par le composant.
const ProductDetails = () => {
// Ligne 47: Declare une variable locale utilisee par le composant.
    const { id } = useParams();
// Ligne 48: Declare une variable locale utilisee par le composant.
    const { addItem } = useContext(CartContext);
// Ligne 49: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 50: Declare une variable locale utilisee par le composant.
    const [produit, setProduit] = useState(null);
// Ligne 51: Declare une variable locale utilisee par le composant.
    const [isLoading, setIsLoading] = useState(true);
// Ligne 52: Declare une variable locale utilisee par le composant.
    const [error, setError] = useState(null);
// Ligne 53: Declare une variable locale utilisee par le composant.
    const [related, setRelated] = useState([]);
// Ligne 54: Declare une variable locale utilisee par le composant.
    const [selectedWeight, setSelectedWeight] = useState("250g");
// Ligne 55: Declare une variable locale utilisee par le composant.
    const [quantity, setQuantity] = useState(1);
// Ligne 56: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 57: Declare une fonction (handler, utilitaire ou composant).
    useEffect(() => {
// Ligne 58: Declare une variable locale utilisee par le composant.
        const fetchProduit = async () => {
// Ligne 59: Ouvre un bloc de code ou une structure de donnees.
            try {
// Ligne 60: Execute cette instruction: setIsLoading(true);
                setIsLoading(true);
// Ligne 61: Execute cette instruction: setError(null);
                setError(null);
// Ligne 62: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 63: Declare une variable locale utilisee par le composant.
                const response = await fetch(
// Ligne 64: Execute cette instruction: `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
                    `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
// Ligne 65: Execute cette instruction: );
                );
// Ligne 66: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 67: Applique une condition pour brancher le flux d execution.
                if (!response.ok) {
// Ligne 68: Execute cette instruction: throw new Error(`Erreur HTTP ${response.status}`);
                    throw new Error(`Erreur HTTP ${response.status}`);
// Ligne 69: Ferme un bloc de code ou une structure de donnees.
                }
// Ligne 70: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 71: Declare une variable locale utilisee par le composant.
                const data = await response.json();
// Ligne 72: Execute cette instruction: setProduit(normalizeProduct(data.article));
                setProduit(normalizeProduct(data.article));
// Ligne 73: Ouvre un bloc de code ou une structure de donnees.
            } catch (err) {
// Ligne 74: Execute cette instruction: console.error("Erreur lors du chargement du produit :", err);
                console.error("Erreur lors du chargement du produit :", err);
// Ligne 75: Execute cette instruction: setError("Impossible de charger le produit");
                setError("Impossible de charger le produit");
// Ligne 76: Ouvre un bloc de code ou une structure de donnees.
            } finally {
// Ligne 77: Execute cette instruction: setIsLoading(false);
                setIsLoading(false);
// Ligne 78: Ferme un bloc de code ou une structure de donnees.
            }
// Ligne 79: Ferme un bloc de code ou une structure de donnees.
        };
// Ligne 80: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 81: Execute cette instruction: void fetchProduit();
        void fetchProduit();
// Ligne 82: Ferme un bloc de code ou une structure de donnees.
    }, [id]);
// Ligne 83: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 84: Declare une fonction (handler, utilitaire ou composant).
    useEffect(() => {
// Ligne 85: Declare une variable locale utilisee par le composant.
        const fetchRelated = async () => {
// Ligne 86: Ouvre un bloc de code ou une structure de donnees.
            try {
// Ligne 87: Declare une variable locale utilisee par le composant.
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
// Ligne 88: Applique une condition pour brancher le flux d execution.
                if (!response.ok) return;
// Ligne 89: Declare une variable locale utilisee par le composant.
                const data = await response.json();
// Ligne 90: Declare une variable locale utilisee par le composant.
                const items = (data.article ?? data.articles ?? []).map(normalizeProduct);
// Ligne 91: Effectue une affectation ou initialise une valeur.
                setRelated(items.filter((item) => String(item.id) !== String(id)).slice(0, 3));
// Ligne 92: Ouvre un bloc de code ou une structure de donnees.
            } catch (err) {
// Ligne 93: Execute cette instruction: console.error("Erreur lors du chargement des produits complémentaires :", err);
                console.error("Erreur lors du chargement des produits complémentaires :", err);
// Ligne 94: Ferme un bloc de code ou une structure de donnees.
            }
// Ligne 95: Ferme un bloc de code ou une structure de donnees.
        };
// Ligne 96: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 97: Execute cette instruction: void fetchRelated();
        void fetchRelated();
// Ligne 98: Ferme un bloc de code ou une structure de donnees.
    }, [id]);
// Ligne 99: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 100: Declare une variable locale utilisee par le composant.
    const totalPrice = useMemo(() => {
// Ligne 101: Applique une condition pour brancher le flux d execution.
        if (!produit) return 0;
// Ligne 102: Retourne une valeur depuis la fonction en cours.
        return getDiscountedPrice(produit.price, produit.id) * quantity;
// Ligne 103: Ferme un bloc de code ou une structure de donnees.
    }, [produit, quantity]);
// Ligne 104: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 105: Applique une condition pour brancher le flux d execution.
    if (isLoading) {
// Ligne 106: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 107: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="product-details-skeleton">
// Ligne 108: Declare un element JSX auto-fermante (sans enfants).
                <Skeleton height={420} width={420} />
// Ligne 109: Ouvre un element JSX qui compose l interface utilisateur.
                <div style={{ marginTop: 20 }}>
// Ligne 110: Declare un element JSX auto-fermante (sans enfants).
                    <Skeleton height={30} width="50%" />
// Ligne 111: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 112: Ouvre un element JSX qui compose l interface utilisateur.
                <div style={{ marginTop: 10 }}>
// Ligne 113: Declare un element JSX auto-fermante (sans enfants).
                    <Skeleton height={20} width="80%" />
// Ligne 114: Declare un element JSX auto-fermante (sans enfants).
                    <Skeleton height={20} width="60%" />
// Ligne 115: Declare un element JSX auto-fermante (sans enfants).
                    <Skeleton height={20} width="40%" />
// Ligne 116: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 117: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 118: Execute cette instruction: );
        );
// Ligne 119: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 120: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 121: Applique une condition pour brancher le flux d execution.
    if (error) {
// Ligne 122: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 123: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="product-list-error">
// Ligne 124: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="error-container">
// Ligne 125: Ouvre un element JSX qui compose l interface utilisateur.
                    <h3> Une erreur est survenue</h3>
// Ligne 126: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>{error}</p>
// Ligne 127: Ouvre un element JSX qui compose l interface utilisateur.
                    <Link to="/" className="back-link">
// Ligne 128: Execute cette instruction: Retour à l'accueil
                        Retour à l'accueil
// Ligne 129: Ferme un element JSX dans l arborescence du rendu.
                    </Link>
// Ligne 130: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 131: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 132: Execute cette instruction: );
        );
// Ligne 133: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 134: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 135: Applique une condition pour brancher le flux d execution.
    if (!produit) {
// Ligne 136: Retourne une valeur depuis la fonction en cours.
        return null;
// Ligne 137: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 138: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 139: Declare une variable locale utilisee par le composant.
    const discount = getDiscountPercent(produit.id);
// Ligne 140: Declare une variable locale utilisee par le composant.
    const discountedPrice = getDiscountedPrice(produit.price, produit.id);
// Ligne 141: Declare une variable locale utilisee par le composant.
    const pageTitle = `${produit.name} | CafThe`;
// Ligne 142: Declare une variable locale utilisee par le composant.
    const shortDescription = produit.description
// Ligne 143: Execute cette instruction: ? `${produit.description.slice(0, 145)}${produit.description.length > 145 ? "..." : ""}`
        ? `${produit.description.slice(0, 145)}${produit.description.length > 145 ? "..." : ""}`
// Ligne 144: Execute cette instruction: : `Decouvrez ${produit.name}, un produit ${produit.category.toLowerCase()} selectionne par CafThe.`;
        : `Decouvrez ${produit.name}, un produit ${produit.category.toLowerCase()} selectionne par CafThe.`;
// Ligne 145: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 146: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 147: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="product-page">
// Ligne 148: Ouvre un element JSX qui compose l interface utilisateur.
            <Helmet>
// Ligne 149: Ouvre un element JSX qui compose l interface utilisateur.
                <title>{pageTitle}</title>
// Ligne 150: Declare un element JSX auto-fermante (sans enfants).
                <meta name="description" content={shortDescription} />
// Ligne 151: Ferme un element JSX dans l arborescence du rendu.
            </Helmet>
// Ligne 152: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="breadcrumb">Accueil / Catalogue / {produit.name}</div>
// Ligne 153: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 154: Ouvre un element JSX qui compose l interface utilisateur.
            <section className="product-hero">
// Ligne 155: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="product-gallery">
// Ligne 156: Declare un element JSX auto-fermante (sans enfants).
                    <img src={produit.image} alt={produit.name} className="product-main" />
// Ligne 157: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="product-thumbs">
// Ligne 158: Declare un element JSX auto-fermante (sans enfants).
                        <img src={produit.image} alt="aperçu" />
// Ligne 159: Declare un element JSX auto-fermante (sans enfants).
                        <div className="thumb-placeholder" />
// Ligne 160: Declare un element JSX auto-fermante (sans enfants).
                        <div className="thumb-placeholder" />
// Ligne 161: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 162: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 163: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="product-info">
// Ligne 164: Ouvre un element JSX qui compose l interface utilisateur.
                    <span className="product-category">{produit.category}</span>
// Ligne 165: Ouvre un element JSX qui compose l interface utilisateur.
                    <h1>{produit.name}</h1>
// Ligne 166: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="product-price">
// Ligne 167: Execute cette instruction: {discount > 0 && (
                        {discount > 0 && (
// Ligne 168: Ouvre un element JSX qui compose l interface utilisateur.
                            <span className="price-old">{produit.price.toFixed(2)} €</span>
// Ligne 169: Execute cette instruction: )}
                        )}
// Ligne 170: Ouvre un element JSX qui compose l interface utilisateur.
                        <span className="price-new">{discountedPrice.toFixed(2)} €</span>
// Ligne 171: Ouvre un element JSX qui compose l interface utilisateur.
                        <span className="price-note">Stock {produit.stock} unités</span>
// Ligne 172: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 173: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>{produit.description || "Un café ou thé d'exception, sélectionné pour son profil aromatique unique."}</p>
// Ligne 174: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 175: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="product-weights">
// Ligne 176: Parcourt une collection pour generer une liste d elements.
                        {"100g 250g 500g 1kg".split(" ").map((weight) => (
// Ligne 177: Ouvre un element JSX qui compose l interface utilisateur.
                            <button
// Ligne 178: Effectue une affectation ou initialise une valeur.
                                key={weight}
// Ligne 179: Effectue une affectation ou initialise une valeur.
                                type="button"
// Ligne 180: Effectue une affectation ou initialise une valeur.
                                className={selectedWeight === weight ? "active" : ""}
// Ligne 181: Associe une action JavaScript a un clic utilisateur.
                                onClick={() => setSelectedWeight(weight)}
// Ligne 182: Execute cette instruction: >
                            >
// Ligne 183: Execute cette instruction: {weight}
                                {weight}
// Ligne 184: Ferme un element JSX dans l arborescence du rendu.
                            </button>
// Ligne 185: Execute cette instruction: ))}
                        ))}
// Ligne 186: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 187: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 188: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="product-actions">
// Ligne 189: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="quantity">
// Ligne 190: Ouvre un element JSX qui compose l interface utilisateur.
                            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
// Ligne 191: Ouvre un element JSX qui compose l interface utilisateur.
                            <span>{quantity}</span>
// Ligne 192: Ouvre un element JSX qui compose l interface utilisateur.
                            <button type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
// Ligne 193: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 194: Ouvre un element JSX qui compose l interface utilisateur.
                        <button
// Ligne 195: Effectue une affectation ou initialise une valeur.
                            type="button"
// Ligne 196: Effectue une affectation ou initialise une valeur.
                            className="primary"
// Ligne 197: Declare une fonction (handler, utilitaire ou composant).
                            onClick={() => {
// Ligne 198: Ouvre un bloc de code ou une structure de donnees.
                                for (let i = 0; i < quantity; i += 1) {
// Ligne 199: Ouvre un bloc de code ou une structure de donnees.
                                    addItem({
// Ligne 200: Execute cette instruction: id: produit.id,
                                        id: produit.id,
// Ligne 201: Execute cette instruction: name: produit.name,
                                        name: produit.name,
// Ligne 202: Execute cette instruction: price: produit.price,
                                        price: produit.price,
// Ligne 203: Execute cette instruction: image: produit.image,
                                        image: produit.image,
// Ligne 204: Execute cette instruction: variant: selectedWeight,
                                        variant: selectedWeight,
// Ligne 205: Ferme un bloc de code ou une structure de donnees.
                                    });
// Ligne 206: Ferme un bloc de code ou une structure de donnees.
                                }
// Ligne 207: Ferme un bloc de code ou une structure de donnees.
                            }}
// Ligne 208: Execute cette instruction: >
                        >
// Ligne 209: Execute cette instruction: Ajouter au panier ({totalPrice.toFixed(2)} €)
                            Ajouter au panier ({totalPrice.toFixed(2)} €)
// Ligne 210: Ferme un element JSX dans l arborescence du rendu.
                        </button>
// Ligne 211: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 212: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="price-note">Prix calculé selon quantité.</div>
// Ligne 213: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 214: Ouvre un element JSX qui compose l interface utilisateur.
                    <ul className="product-highlights">
// Ligne 215: Ouvre un element JSX qui compose l interface utilisateur.
                        <li>Origine: {produit.origin}</li>
// Ligne 216: Ouvre un element JSX qui compose l interface utilisateur.
                        <li>Torréfaction artisanale</li>
// Ligne 217: Ouvre un element JSX qui compose l interface utilisateur.
                        <li>Livraison offerte dès 50 €</li>
// Ligne 218: Ferme un element JSX dans l arborescence du rendu.
                    </ul>
// Ligne 219: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 220: Ferme un element JSX dans l arborescence du rendu.
            </section>
// Ligne 221: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 222: Ouvre un element JSX qui compose l interface utilisateur.
            <section className="product-reviews">
// Ligne 223: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="section-header">
// Ligne 224: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Avis clients (24)</h2>
// Ligne 225: Ouvre un element JSX qui compose l interface utilisateur.
                    <button type="button" className="section-link">Voir tous les avis</button>
// Ligne 226: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 227: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="reviews-grid">
// Ligne 228: Ouvre un bloc de code ou une structure de donnees.
                    {[
// Ligne 229: Execute cette instruction: "Un profil aromatique délicat, parfait pour le matin.",
                        "Un profil aromatique délicat, parfait pour le matin.",
// Ligne 230: Execute cette instruction: "Très bon équilibre, livraison rapide et soignée.",
                        "Très bon équilibre, livraison rapide et soignée.",
// Ligne 231: Execute cette instruction: "Goût authentique, je recommande vivement.",
                        "Goût authentique, je recommande vivement.",
// Ligne 232: Ferme un bloc de code ou une structure de donnees.
                    ].map((review, index) => (
// Ligne 233: Ouvre un element JSX qui compose l interface utilisateur.
                        <div key={index} className="review-card">
// Ligne 234: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="review-rating">★★★★★</div>
// Ligne 235: Ouvre un element JSX qui compose l interface utilisateur.
                            <p>{review}</p>
// Ligne 236: Ouvre un element JSX qui compose l interface utilisateur.
                            <span>Client vérifié</span>
// Ligne 237: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 238: Execute cette instruction: ))}
                    ))}
// Ligne 239: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 240: Ferme un element JSX dans l arborescence du rendu.
            </section>
// Ligne 241: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 242: Ouvre un element JSX qui compose l interface utilisateur.
            <section className="product-related">
// Ligne 243: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="section-header">
// Ligne 244: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Produits complémentaires</h2>
// Ligne 245: Ouvre un element JSX qui compose l interface utilisateur.
                    <button type="button" className="section-link">Voir plus</button>
// Ligne 246: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 247: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="related-grid">
// Ligne 248: Declare une fonction (handler, utilitaire ou composant).
                    {related.map((item) => {
// Ligne 249: Declare une variable locale utilisee par le composant.
                        const relatedDiscount = getDiscountPercent(item.id);
// Ligne 250: Declare une variable locale utilisee par le composant.
                        const relatedPrice = getDiscountedPrice(item.price, item.id);
// Ligne 251: Commence le JSX retourne pour l affichage de l interface.
                        return (
// Ligne 252: Ouvre un element JSX qui compose l interface utilisateur.
                            <Link key={item.id} to={`/produit/${item.id}`} className="related-card">
// Ligne 253: Declare un element JSX auto-fermante (sans enfants).
                                <img src={item.image} alt={item.name} />
// Ligne 254: Ouvre un element JSX qui compose l interface utilisateur.
                                <div>
// Ligne 255: Ouvre un element JSX qui compose l interface utilisateur.
                                    <h3>{item.name}</h3>
// Ligne 256: Ouvre un element JSX qui compose l interface utilisateur.
                                    <span className="price-stack">
// Ligne 257: Execute cette instruction: {relatedDiscount > 0 && (
                                        {relatedDiscount > 0 && (
// Ligne 258: Ouvre un element JSX qui compose l interface utilisateur.
                                            <span className="price-old">{item.price.toFixed(2)} €</span>
// Ligne 259: Execute cette instruction: )}
                                        )}
// Ligne 260: Ouvre un element JSX qui compose l interface utilisateur.
                                        <span className="price-new">{relatedPrice.toFixed(2)} €</span>
// Ligne 261: Ferme un element JSX dans l arborescence du rendu.
                                    </span>
// Ligne 262: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 263: Ouvre un element JSX qui compose l interface utilisateur.
                                <button type="button">Ajouter</button>
// Ligne 264: Ferme un element JSX dans l arborescence du rendu.
                            </Link>
// Ligne 265: Execute cette instruction: );
                        );
// Ligne 266: Ferme un bloc de code ou une structure de donnees.
                    })}
// Ligne 267: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 268: Ferme un element JSX dans l arborescence du rendu.
            </section>
// Ligne 269: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 270: Execute cette instruction: );
    );
// Ligne 271: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 272: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 273: Expose ce composant comme export par defaut du fichier.
export default ProductDetails;
// Ligne 274: Ligne vide pour aerer le code et separer les blocs logiques.
