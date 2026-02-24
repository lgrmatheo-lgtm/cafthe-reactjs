// Fichier annote automatiquement pour revision junior: src\pages\Catalogue.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Catalogue.jsx
 * @file Catalogue.jsx
// Ligne 3: Execute cette instruction: * Role: Catalogue filtre/tri/pagination.
 * Role: Catalogue filtre/tri/pagination.
// Ligne 4: Execute cette instruction: * Comment c est fait: Recupere les articles API, normalise la data puis construit les listes derivees avec useMemo.
 * Comment c est fait: Recupere les articles API, normalise la data puis construit les listes derivees avec useMemo.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useContext, useEffect, useMemo, useState } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import { Link } from "react-router-dom";
// Ligne 9: Importe un module necessaire au composant ou a sa logique.
import Skeleton from "react-loading-skeleton";
// Ligne 10: Importe un module necessaire au composant ou a sa logique.
import { SearchContext } from "../context/searchContext.jsx";
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
// Ligne 24: Execute cette instruction: "Autres";
        "Autres";
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
// Ligne 41: Execute cette instruction: raw: produit,
        raw: produit,
// Ligne 42: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 43: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 44: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 45: Declare une variable locale utilisee par le composant.
const ITEMS_PER_PAGE = 6;
// Ligne 46: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 47: Declare une variable locale utilisee par le composant.
const Catalogue = () => {
// Ligne 48: Declare une variable locale utilisee par le composant.
    const { query } = useContext(SearchContext);
// Ligne 49: Declare une variable locale utilisee par le composant.
    const { addItem } = useContext(CartContext);
// Ligne 50: Declare une variable locale utilisee par le composant.
    const [items, setItems] = useState([]);
// Ligne 51: Declare une variable locale utilisee par le composant.
    const [isLoading, setIsLoading] = useState(true);
// Ligne 52: Declare une variable locale utilisee par le composant.
    const [error, setError] = useState(null);
// Ligne 53: Declare une variable locale utilisee par le composant.
    const [selectedCategories, setSelectedCategories] = useState([]);
// Ligne 54: Declare une variable locale utilisee par le composant.
    const [selectedOrigins, setSelectedOrigins] = useState([]);
// Ligne 55: Declare une variable locale utilisee par le composant.
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0, current: 0 });
// Ligne 56: Declare une variable locale utilisee par le composant.
    const [sort, setSort] = useState("price-asc");
// Ligne 57: Declare une variable locale utilisee par le composant.
    const [page, setPage] = useState(1);
// Ligne 58: Declare une variable locale utilisee par le composant.
    const [quickView, setQuickView] = useState(null);
// Ligne 59: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 60: Declare une fonction (handler, utilitaire ou composant).
    useEffect(() => {
// Ligne 61: Declare une variable locale utilisee par le composant.
        const fetchCatalogue = async () => {
// Ligne 62: Ouvre un bloc de code ou une structure de donnees.
            try {
// Ligne 63: Execute cette instruction: setIsLoading(true);
                setIsLoading(true);
// Ligne 64: Execute cette instruction: setError(null);
                setError(null);
// Ligne 65: Declare une variable locale utilisee par le composant.
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
// Ligne 66: Applique une condition pour brancher le flux d execution.
                if (!response.ok) {
// Ligne 67: Execute cette instruction: throw new Error(`Erreur HTTP ${response.status}`);
                    throw new Error(`Erreur HTTP ${response.status}`);
// Ligne 68: Ferme un bloc de code ou une structure de donnees.
                }
// Ligne 69: Declare une variable locale utilisee par le composant.
                const data = await response.json();
// Ligne 70: Declare une variable locale utilisee par le composant.
                const list = (data.article ?? data.articles ?? []).map(normalizeProduct);
// Ligne 71: Execute cette instruction: setItems(list);
                setItems(list);
// Ligne 72: Declare une variable locale utilisee par le composant.
                const prices = list.map((item) => item.price).filter((value) => !Number.isNaN(value));
// Ligne 73: Declare une variable locale utilisee par le composant.
                const min = prices.length ? Math.min(...prices) : 0;
// Ligne 74: Declare une variable locale utilisee par le composant.
                const max = prices.length ? Math.max(...prices) : 0;
// Ligne 75: Execute cette instruction: setPriceRange({ min, max, current: max });
                setPriceRange({ min, max, current: max });
// Ligne 76: Ouvre un bloc de code ou une structure de donnees.
            } catch (err) {
// Ligne 77: Execute cette instruction: console.error("Erreur lors du chargement du catalogue :", err);
                console.error("Erreur lors du chargement du catalogue :", err);
// Ligne 78: Execute cette instruction: setError("Impossible de charger le catalogue");
                setError("Impossible de charger le catalogue");
// Ligne 79: Ouvre un bloc de code ou une structure de donnees.
            } finally {
// Ligne 80: Execute cette instruction: setIsLoading(false);
                setIsLoading(false);
// Ligne 81: Ferme un bloc de code ou une structure de donnees.
            }
// Ligne 82: Ferme un bloc de code ou une structure de donnees.
        };
// Ligne 83: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 84: Execute cette instruction: void fetchCatalogue();
        void fetchCatalogue();
// Ligne 85: Ferme un bloc de code ou une structure de donnees.
    }, []);
// Ligne 86: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 87: Declare une variable locale utilisee par le composant.
    const categories = useMemo(() => {
// Ligne 88: Retourne une valeur depuis la fonction en cours.
        return Array.from(new Set(items.map((item) => item.category))).sort();
// Ligne 89: Ferme un bloc de code ou une structure de donnees.
    }, [items]);
// Ligne 90: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 91: Declare une variable locale utilisee par le composant.
    const origins = useMemo(() => {
// Ligne 92: Retourne une valeur depuis la fonction en cours.
        return Array.from(new Set(items.map((item) => item.origin))).sort();
// Ligne 93: Ferme un bloc de code ou une structure de donnees.
    }, [items]);
// Ligne 94: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 95: Declare une variable locale utilisee par le composant.
    const filteredItems = useMemo(() => {
// Ligne 96: Retourne une valeur depuis la fonction en cours.
        return items
// Ligne 97: Effectue une affectation ou initialise une valeur.
            .filter((item) =>
// Ligne 98: Execute cette instruction: selectedCategories.length ? selectedCategories.includes(item.category) : true
                selectedCategories.length ? selectedCategories.includes(item.category) : true
// Ligne 99: Execute cette instruction: )
            )
// Ligne 100: Effectue une affectation ou initialise une valeur.
            .filter((item) =>
// Ligne 101: Execute cette instruction: selectedOrigins.length ? selectedOrigins.includes(item.origin) : true
                selectedOrigins.length ? selectedOrigins.includes(item.origin) : true
// Ligne 102: Execute cette instruction: )
            )
// Ligne 103: Effectue une affectation ou initialise une valeur.
            .filter((item) => item.price <= priceRange.current)
// Ligne 104: Declare une fonction (handler, utilitaire ou composant).
            .filter((item) => {
// Ligne 105: Applique une condition pour brancher le flux d execution.
                if (!query.trim()) return true;
// Ligne 106: Declare une variable locale utilisee par le composant.
                const target = `${item.name} ${item.category} ${item.origin}`.toLowerCase();
// Ligne 107: Retourne une valeur depuis la fonction en cours.
                return target.includes(query.toLowerCase());
// Ligne 108: Ferme un bloc de code ou une structure de donnees.
            });
// Ligne 109: Ferme un bloc de code ou une structure de donnees.
    }, [items, selectedCategories, selectedOrigins, priceRange, query]);
// Ligne 110: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 111: Declare une variable locale utilisee par le composant.
    const sortedItems = useMemo(() => {
// Ligne 112: Declare une variable locale utilisee par le composant.
        const next = [...filteredItems];
// Ligne 113: Applique une condition pour brancher le flux d execution.
        if (sort === "price-asc") {
// Ligne 114: Effectue une affectation ou initialise une valeur.
            next.sort((a, b) => a.price - b.price);
// Ligne 115: Ouvre un bloc de code ou une structure de donnees.
        } else if (sort === "price-desc") {
// Ligne 116: Effectue une affectation ou initialise une valeur.
            next.sort((a, b) => b.price - a.price);
// Ligne 117: Ouvre un bloc de code ou une structure de donnees.
        } else if (sort === "name-asc") {
// Ligne 118: Effectue une affectation ou initialise une valeur.
            next.sort((a, b) => a.name.localeCompare(b.name));
// Ligne 119: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 120: Retourne une valeur depuis la fonction en cours.
        return next;
// Ligne 121: Ferme un bloc de code ou une structure de donnees.
    }, [filteredItems, sort]);
// Ligne 122: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 123: Declare une variable locale utilisee par le composant.
    const totalPages = Math.max(1, Math.ceil(sortedItems.length / ITEMS_PER_PAGE));
// Ligne 124: Declare une variable locale utilisee par le composant.
    const paginatedItems = sortedItems.slice(
// Ligne 125: Execute cette instruction: (page - 1) * ITEMS_PER_PAGE,
        (page - 1) * ITEMS_PER_PAGE,
// Ligne 126: Execute cette instruction: page * ITEMS_PER_PAGE
        page * ITEMS_PER_PAGE
// Ligne 127: Execute cette instruction: );
    );
// Ligne 128: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 129: Declare une fonction (handler, utilitaire ou composant).
    useEffect(() => {
// Ligne 130: Execute cette instruction: setPage(1);
        setPage(1);
// Ligne 131: Ferme un bloc de code ou une structure de donnees.
    }, [selectedCategories, selectedOrigins, priceRange.current, sort, query]);
// Ligne 132: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 133: Declare une variable locale utilisee par le composant.
    const toggleSelection = (value, list, setList) => {
// Ligne 134: Effectue une affectation ou initialise une valeur.
        setList((prev) =>
// Ligne 135: Effectue une affectation ou initialise une valeur.
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
// Ligne 136: Execute cette instruction: );
        );
// Ligne 137: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 138: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 139: Applique une condition pour brancher le flux d execution.
    if (isLoading) {
// Ligne 140: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 141: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="catalogue">
// Ligne 142: Ouvre un element JSX qui compose l interface utilisateur.
                <aside className="catalogue-filters">
// Ligne 143: Declare un element JSX auto-fermante (sans enfants).
                    <Skeleton height={30} width={120} />
// Ligne 144: Declare un element JSX auto-fermante (sans enfants).
                    <Skeleton height={200} />
// Ligne 145: Ferme un element JSX dans l arborescence du rendu.
                </aside>
// Ligne 146: Ouvre un element JSX qui compose l interface utilisateur.
                <section className="catalogue-grid">
// Ligne 147: Parcourt une collection pour generer une liste d elements.
                    {Array.from({ length: 6 }).map((_, index) => (
// Ligne 148: Ouvre un element JSX qui compose l interface utilisateur.
                        <div key={index} className="catalogue-card">
// Ligne 149: Declare un element JSX auto-fermante (sans enfants).
                            <Skeleton height={180} />
// Ligne 150: Declare un element JSX auto-fermante (sans enfants).
                            <Skeleton height={20} style={{ marginTop: 12 }} />
// Ligne 151: Declare un element JSX auto-fermante (sans enfants).
                            <Skeleton height={16} width="60%" />
// Ligne 152: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 153: Execute cette instruction: ))}
                    ))}
// Ligne 154: Ferme un element JSX dans l arborescence du rendu.
                </section>
// Ligne 155: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 156: Execute cette instruction: );
        );
// Ligne 157: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 158: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 159: Applique une condition pour brancher le flux d execution.
    if (error) {
// Ligne 160: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 161: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="product-list-error">
// Ligne 162: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="error-container">
// Ligne 163: Ouvre un element JSX qui compose l interface utilisateur.
                    <h3>Une erreur est survenue</h3>
// Ligne 164: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>{error}</p>
// Ligne 165: Ouvre un element JSX qui compose l interface utilisateur.
                    <button onClick={() => window.location.reload()} className="retry-button">
// Ligne 166: Execute cette instruction: Réessayer
                        Réessayer
// Ligne 167: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 168: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 169: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 170: Execute cette instruction: );
        );
// Ligne 171: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 172: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 173: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 174: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="catalogue-page">
// Ligne 175: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="catalogue-header">
// Ligne 176: Ouvre un element JSX qui compose l interface utilisateur.
                <div>
// Ligne 177: Ouvre un element JSX qui compose l interface utilisateur.
                    <p className="breadcrumb">Accueil / Catalogue</p>
// Ligne 178: Ouvre un element JSX qui compose l interface utilisateur.
                    <h1>Catalogue</h1>
// Ligne 179: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>{sortedItems.length} produits</p>
// Ligne 180: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 181: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="catalogue-sort">
// Ligne 182: Ouvre un element JSX qui compose l interface utilisateur.
                    <label htmlFor="sort">Trier par</label>
// Ligne 183: Ouvre un element JSX qui compose l interface utilisateur.
                    <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
// Ligne 184: Ouvre un element JSX qui compose l interface utilisateur.
                        <option value="price-asc">Prix croissant</option>
// Ligne 185: Ouvre un element JSX qui compose l interface utilisateur.
                        <option value="price-desc">Prix décroissant</option>
// Ligne 186: Ouvre un element JSX qui compose l interface utilisateur.
                        <option value="name-asc">A - Z</option>
// Ligne 187: Ferme un element JSX dans l arborescence du rendu.
                    </select>
// Ligne 188: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 189: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 190: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 191: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="catalogue">
// Ligne 192: Ouvre un element JSX qui compose l interface utilisateur.
                <aside className="catalogue-filters">
// Ligne 193: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="filters-header">Filtres</div>
// Ligne 194: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="filter-section">
// Ligne 195: Ouvre un element JSX qui compose l interface utilisateur.
                        <h4>Catégories</h4>
// Ligne 196: Parcourt une collection pour generer une liste d elements.
                        {categories.map((category) => (
// Ligne 197: Ouvre un element JSX qui compose l interface utilisateur.
                            <label key={category}>
// Ligne 198: Ouvre un element JSX qui compose l interface utilisateur.
                                <input
// Ligne 199: Effectue une affectation ou initialise une valeur.
                                    type="checkbox"
// Ligne 200: Effectue une affectation ou initialise une valeur.
                                    checked={selectedCategories.includes(category)}
// Ligne 201: Associe une reaction a la modification d un champ de formulaire.
                                    onChange={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
// Ligne 202: Execute cette instruction: />
                                />
// Ligne 203: Execute cette instruction: {category}
                                {category}
// Ligne 204: Ferme un element JSX dans l arborescence du rendu.
                            </label>
// Ligne 205: Execute cette instruction: ))}
                        ))}
// Ligne 206: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 207: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="filter-section">
// Ligne 208: Ouvre un element JSX qui compose l interface utilisateur.
                        <h4>Prix</h4>
// Ligne 209: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="price-range">
// Ligne 210: Ouvre un element JSX qui compose l interface utilisateur.
                            <span>{priceRange.min.toFixed(2)} €</span>
// Ligne 211: Ouvre un element JSX qui compose l interface utilisateur.
                            <span>{priceRange.current.toFixed(2)} €</span>
// Ligne 212: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 213: Ouvre un element JSX qui compose l interface utilisateur.
                        <input
// Ligne 214: Effectue une affectation ou initialise une valeur.
                            type="range"
// Ligne 215: Effectue une affectation ou initialise une valeur.
                            min={priceRange.min}
// Ligne 216: Effectue une affectation ou initialise une valeur.
                            max={priceRange.max}
// Ligne 217: Effectue une affectation ou initialise une valeur.
                            value={priceRange.current}
// Ligne 218: Effectue une affectation ou initialise une valeur.
                            step={0.1}
// Ligne 219: Associe une reaction a la modification d un champ de formulaire.
                            onChange={(event) =>
// Ligne 220: Effectue une affectation ou initialise une valeur.
                                setPriceRange((prev) => ({ ...prev, current: Number(event.target.value) }))
// Ligne 221: Ferme un bloc de code ou une structure de donnees.
                            }
// Ligne 222: Execute cette instruction: />
                        />
// Ligne 223: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 224: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="filter-section">
// Ligne 225: Ouvre un element JSX qui compose l interface utilisateur.
                        <h4>Origine</h4>
// Ligne 226: Parcourt une collection pour generer une liste d elements.
                        {origins.map((origin) => (
// Ligne 227: Ouvre un element JSX qui compose l interface utilisateur.
                            <label key={origin}>
// Ligne 228: Ouvre un element JSX qui compose l interface utilisateur.
                                <input
// Ligne 229: Effectue une affectation ou initialise une valeur.
                                    type="checkbox"
// Ligne 230: Effectue une affectation ou initialise une valeur.
                                    checked={selectedOrigins.includes(origin)}
// Ligne 231: Associe une reaction a la modification d un champ de formulaire.
                                    onChange={() => toggleSelection(origin, selectedOrigins, setSelectedOrigins)}
// Ligne 232: Execute cette instruction: />
                                />
// Ligne 233: Execute cette instruction: {origin}
                                {origin}
// Ligne 234: Ferme un element JSX dans l arborescence du rendu.
                            </label>
// Ligne 235: Execute cette instruction: ))}
                        ))}
// Ligne 236: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 237: Ferme un element JSX dans l arborescence du rendu.
                </aside>
// Ligne 238: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 239: Ouvre un element JSX qui compose l interface utilisateur.
                <section className="catalogue-grid">
// Ligne 240: Declare une fonction (handler, utilitaire ou composant).
                    {paginatedItems.map((item) => {
// Ligne 241: Declare une variable locale utilisee par le composant.
                        const discount = getDiscountPercent(item.id);
// Ligne 242: Declare une variable locale utilisee par le composant.
                        const discountedPrice = getDiscountedPrice(item.price, item.id);
// Ligne 243: Commence le JSX retourne pour l affichage de l interface.
                        return (
// Ligne 244: Ouvre un element JSX qui compose l interface utilisateur.
                            <article key={item.id} className="catalogue-card">
// Ligne 245: Ouvre un element JSX qui compose l interface utilisateur.
                                <Link to={`/produit/${item.id}`}>
// Ligne 246: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div className="catalogue-image">
// Ligne 247: Declare un element JSX auto-fermante (sans enfants).
                                        <img src={item.image} alt={item.name} />
// Ligne 248: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 249: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div className="catalogue-meta">{item.category}</div>
// Ligne 250: Ouvre un element JSX qui compose l interface utilisateur.
                                    <h3>{item.name}</h3>
// Ligne 251: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div className="catalogue-footer">
// Ligne 252: Ouvre un element JSX qui compose l interface utilisateur.
                                        <span className="price-stack">
// Ligne 253: Execute cette instruction: {discount > 0 && (
                                            {discount > 0 && (
// Ligne 254: Ouvre un element JSX qui compose l interface utilisateur.
                                                <span className="price-old">{item.price.toFixed(2)} €</span>
// Ligne 255: Execute cette instruction: )}
                                            )}
// Ligne 256: Ouvre un element JSX qui compose l interface utilisateur.
                                            <span className="price-new">{discountedPrice.toFixed(2)} €</span>
// Ligne 257: Ferme un element JSX dans l arborescence du rendu.
                                        </span>
// Ligne 258: Ouvre un element JSX qui compose l interface utilisateur.
                                        <span className="catalogue-origin">{item.origin}</span>
// Ligne 259: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 260: Ferme un element JSX dans l arborescence du rendu.
                                </Link>
// Ligne 261: Ouvre un element JSX qui compose l interface utilisateur.
                                <button
// Ligne 262: Effectue une affectation ou initialise une valeur.
                                    type="button"
// Ligne 263: Effectue une affectation ou initialise une valeur.
                                    className="quick-view"
// Ligne 264: Associe une action JavaScript a un clic utilisateur.
                                    onClick={() => setQuickView(item)}
// Ligne 265: Execute cette instruction: >
                                >
// Ligne 266: Execute cette instruction: Aperçu rapide
                                    Aperçu rapide
// Ligne 267: Ferme un element JSX dans l arborescence du rendu.
                                </button>
// Ligne 268: Effectue une affectation ou initialise une valeur.
                                {discount > 0 && <span className="discount-badge">-{discount}%</span>}
// Ligne 269: Ferme un element JSX dans l arborescence du rendu.
                            </article>
// Ligne 270: Execute cette instruction: );
                        );
// Ligne 271: Ferme un bloc de code ou une structure de donnees.
                    })}
// Ligne 272: Ferme un element JSX dans l arborescence du rendu.
                </section>
// Ligne 273: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 274: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 275: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="catalogue-pagination">
// Ligne 276: Parcourt une collection pour generer une liste d elements.
                {Array.from({ length: totalPages }).map((_, index) => (
// Ligne 277: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 278: Effectue une affectation ou initialise une valeur.
                        key={index}
// Ligne 279: Effectue une affectation ou initialise une valeur.
                        type="button"
// Ligne 280: Effectue une affectation ou initialise une valeur.
                        className={page === index + 1 ? "active" : ""}
// Ligne 281: Associe une action JavaScript a un clic utilisateur.
                        onClick={() => setPage(index + 1)}
// Ligne 282: Execute cette instruction: >
                    >
// Ligne 283: Execute cette instruction: {index + 1}
                        {index + 1}
// Ligne 284: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 285: Execute cette instruction: ))}
                ))}
// Ligne 286: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 287: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 288: Execute cette instruction: {quickView && (
            {quickView && (
// Ligne 289: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="modal-overlay" onClick={() => setQuickView(null)}>
// Ligne 290: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="modal-card" onClick={(event) => event.stopPropagation()}>
// Ligne 291: Declare un element JSX auto-fermante (sans enfants).
                        <img src={quickView.image} alt={quickView.name} />
// Ligne 292: Ouvre un element JSX qui compose l interface utilisateur.
                        <div>
// Ligne 293: Ouvre un element JSX qui compose l interface utilisateur.
                            <h3>{quickView.name}</h3>
// Ligne 294: Ouvre un element JSX qui compose l interface utilisateur.
                            <p>{quickView.description || "Découverte CafThé."}</p>
// Ligne 295: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="price-stack">
// Ligne 296: Execute cette instruction: {getDiscountPercent(quickView.id) > 0 && (
                                {getDiscountPercent(quickView.id) > 0 && (
// Ligne 297: Ouvre un element JSX qui compose l interface utilisateur.
                                    <span className="price-old">{quickView.price.toFixed(2)} €</span>
// Ligne 298: Execute cette instruction: )}
                                )}
// Ligne 299: Ouvre un element JSX qui compose l interface utilisateur.
                                <span className="price-new">
// Ligne 300: Execute cette instruction: {getDiscountedPrice(quickView.price, quickView.id).toFixed(2)} €
                                    {getDiscountedPrice(quickView.price, quickView.id).toFixed(2)} €
// Ligne 301: Ferme un element JSX dans l arborescence du rendu.
                                </span>
// Ligne 302: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 303: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="modal-actions">
// Ligne 304: Ouvre un element JSX qui compose l interface utilisateur.
                                <Link to={`/produit/${quickView.id}`} className="ghost">Voir la fiche</Link>
// Ligne 305: Ouvre un element JSX qui compose l interface utilisateur.
                                <button
// Ligne 306: Effectue une affectation ou initialise une valeur.
                                    type="button"
// Ligne 307: Effectue une affectation ou initialise une valeur.
                                    className="primary"
// Ligne 308: Declare une fonction (handler, utilitaire ou composant).
                                    onClick={() => {
// Ligne 309: Ouvre un bloc de code ou une structure de donnees.
                                        addItem({
// Ligne 310: Execute cette instruction: id: quickView.id,
                                            id: quickView.id,
// Ligne 311: Execute cette instruction: name: quickView.name,
                                            name: quickView.name,
// Ligne 312: Execute cette instruction: price: quickView.price,
                                            price: quickView.price,
// Ligne 313: Execute cette instruction: image: quickView.image,
                                            image: quickView.image,
// Ligne 314: Ferme un bloc de code ou une structure de donnees.
                                        });
// Ligne 315: Execute cette instruction: setQuickView(null);
                                        setQuickView(null);
// Ligne 316: Ferme un bloc de code ou une structure de donnees.
                                    }}
// Ligne 317: Execute cette instruction: >
                                >
// Ligne 318: Execute cette instruction: Ajouter au panier
                                    Ajouter au panier
// Ligne 319: Ferme un element JSX dans l arborescence du rendu.
                                </button>
// Ligne 320: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 321: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 322: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 323: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 324: Execute cette instruction: )}
            )}
// Ligne 325: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 326: Execute cette instruction: );
    );
// Ligne 327: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 328: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 329: Expose ce composant comme export par defaut du fichier.
export default Catalogue;
// Ligne 330: Ligne vide pour aerer le code et separer les blocs logiques.
