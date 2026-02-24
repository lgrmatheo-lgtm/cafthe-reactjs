/**
 * @file Catalogue.jsx
 * Role: Catalogue filtre/tri/pagination.
 * Comment c est fait: Recupere les articles API, normalise la data puis construit les listes derivees avec useMemo.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { SearchContext } from "../context/searchContext.jsx";
import { CartContext } from "../context/cartContext.jsx";
import { getDiscountPercent, getDiscountedPrice } from "../utils/discounts.js";
import { getProductImage } from "../utils/productImages.js";

const normalizeProduct = (produit) => {
    const id = produit.id_article ?? produit.id ?? produit.id_articles ?? produit._id;
    const name = produit.nom_produit ?? produit.nom ?? produit.name ?? "Produit";
    const price = Number(produit.prix_ttc ?? produit.prix ?? produit.price ?? 0);
    const category =
        produit.categorie?.nom ??
        produit.categorie ??
        produit.type ??
        produit.famille ??
        "Autres";
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
        raw: produit,
    };
};

const ITEMS_PER_PAGE = 6;

const Catalogue = () => {
    const { query } = useContext(SearchContext);
    const { addItem } = useContext(CartContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedOrigins, setSelectedOrigins] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0, current: 0 });
    const [sort, setSort] = useState("price-asc");
    const [page, setPage] = useState(1);
    const [quickView, setQuickView] = useState(null);

    useEffect(() => {
        const fetchCatalogue = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }
                const data = await response.json();
                const list = (data.article ?? data.articles ?? []).map(normalizeProduct);
                setItems(list);
                const prices = list.map((item) => item.price).filter((value) => !Number.isNaN(value));
                const min = prices.length ? Math.min(...prices) : 0;
                const max = prices.length ? Math.max(...prices) : 0;
                setPriceRange({ min, max, current: max });
            } catch (err) {
                console.error("Erreur lors du chargement du catalogue :", err);
                setError("Impossible de charger le catalogue");
            } finally {
                setIsLoading(false);
            }
        };

        void fetchCatalogue();
    }, []);

    const categories = useMemo(() => {
        return Array.from(new Set(items.map((item) => item.category))).sort();
    }, [items]);

    const origins = useMemo(() => {
        return Array.from(new Set(items.map((item) => item.origin))).sort();
    }, [items]);

    const filteredItems = useMemo(() => {
        return items
            .filter((item) =>
                selectedCategories.length ? selectedCategories.includes(item.category) : true
            )
            .filter((item) =>
                selectedOrigins.length ? selectedOrigins.includes(item.origin) : true
            )
            .filter((item) => item.price <= priceRange.current)
            .filter((item) => {
                if (!query.trim()) return true;
                const target = `${item.name} ${item.category} ${item.origin}`.toLowerCase();
                return target.includes(query.toLowerCase());
            });
    }, [items, selectedCategories, selectedOrigins, priceRange, query]);

    const sortedItems = useMemo(() => {
        const next = [...filteredItems];
        if (sort === "price-asc") {
            next.sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
            next.sort((a, b) => b.price - a.price);
        } else if (sort === "name-asc") {
            next.sort((a, b) => a.name.localeCompare(b.name));
        }
        return next;
    }, [filteredItems, sort]);

    const totalPages = Math.max(1, Math.ceil(sortedItems.length / ITEMS_PER_PAGE));
    const paginatedItems = sortedItems.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setPage(1);
    }, [selectedCategories, selectedOrigins, priceRange.current, sort, query]);

    const toggleSelection = (value, list, setList) => {
        setList((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    if (isLoading) {
        return (
            <div className="catalogue">
                <aside className="catalogue-filters">
                    <Skeleton height={30} width={120} />
                    <Skeleton height={200} />
                </aside>
                <section className="catalogue-grid">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="catalogue-card">
                            <Skeleton height={180} />
                            <Skeleton height={20} style={{ marginTop: 12 }} />
                            <Skeleton height={16} width="60%" />
                        </div>
                    ))}
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-error">
                <div className="error-container">
                    <h3>Une erreur est survenue</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-button">
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="catalogue-page">
            <div className="catalogue-header">
                <div>
                    <p className="breadcrumb">Accueil / Catalogue</p>
                    <h1>Catalogue</h1>
                    <p>{sortedItems.length} produits</p>
                </div>
                <div className="catalogue-sort">
                    <label htmlFor="sort">Trier par</label>
                    <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                        <option value="price-asc">Prix croissant</option>
                        <option value="price-desc">Prix décroissant</option>
                        <option value="name-asc">A - Z</option>
                    </select>
                </div>
            </div>

            <div className="catalogue">
                <aside className="catalogue-filters">
                    <div className="filters-header">Filtres</div>
                    <div className="filter-section">
                        <h4>Catégories</h4>
                        {categories.map((category) => (
                            <label key={category}>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                    <div className="filter-section">
                        <h4>Prix</h4>
                        <div className="price-range">
                            <span>{priceRange.min.toFixed(2)} €</span>
                            <span>{priceRange.current.toFixed(2)} €</span>
                        </div>
                        <input
                            type="range"
                            min={priceRange.min}
                            max={priceRange.max}
                            value={priceRange.current}
                            step={0.1}
                            onChange={(event) =>
                                setPriceRange((prev) => ({ ...prev, current: Number(event.target.value) }))
                            }
                        />
                    </div>
                    <div className="filter-section">
                        <h4>Origine</h4>
                        {origins.map((origin) => (
                            <label key={origin}>
                                <input
                                    type="checkbox"
                                    checked={selectedOrigins.includes(origin)}
                                    onChange={() => toggleSelection(origin, selectedOrigins, setSelectedOrigins)}
                                />
                                {origin}
                            </label>
                        ))}
                    </div>
                </aside>

                <section className="catalogue-grid">
                    {paginatedItems.map((item) => {
                        const discount = getDiscountPercent(item.id);
                        const discountedPrice = getDiscountedPrice(item.price, item.id);
                        return (
                            <article key={item.id} className="catalogue-card">
                                <Link to={`/produit/${item.id}`}>
                                    <div className="catalogue-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="catalogue-meta">{item.category}</div>
                                    <h3>{item.name}</h3>
                                    <div className="catalogue-footer">
                                        <span className="price-stack">
                                            {discount > 0 && (
                                                <span className="price-old">{item.price.toFixed(2)} €</span>
                                            )}
                                            <span className="price-new">{discountedPrice.toFixed(2)} €</span>
                                        </span>
                                        <span className="catalogue-origin">{item.origin}</span>
                                    </div>
                                </Link>
                                <button
                                    type="button"
                                    className="quick-view"
                                    onClick={() => setQuickView(item)}
                                >
                                    Aperçu rapide
                                </button>
                                {discount > 0 && <span className="discount-badge">-{discount}%</span>}
                            </article>
                        );
                    })}
                </section>
            </div>

            <div className="catalogue-pagination">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={page === index + 1 ? "active" : ""}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {quickView && (
                <div className="modal-overlay" onClick={() => setQuickView(null)}>
                    <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                        <img src={quickView.image} alt={quickView.name} />
                        <div>
                            <h3>{quickView.name}</h3>
                            <p>{quickView.description || "Découverte CafThé."}</p>
                            <div className="price-stack">
                                {getDiscountPercent(quickView.id) > 0 && (
                                    <span className="price-old">{quickView.price.toFixed(2)} €</span>
                                )}
                                <span className="price-new">
                                    {getDiscountedPrice(quickView.price, quickView.id).toFixed(2)} €
                                </span>
                            </div>
                            <div className="modal-actions">
                                <Link to={`/produit/${quickView.id}`} className="ghost">Voir la fiche</Link>
                                <button
                                    type="button"
                                    className="primary"
                                    onClick={() => {
                                        addItem({
                                            id: quickView.id,
                                            name: quickView.name,
                                            price: quickView.price,
                                            image: quickView.image,
                                        });
                                        setQuickView(null);
                                    }}
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Catalogue;
