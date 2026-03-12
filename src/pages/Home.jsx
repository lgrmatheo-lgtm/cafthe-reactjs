import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext.jsx";
import { SearchContext } from "../context/searchContext.jsx";
import { getDiscountPercent, getDiscountedPrice } from "../utils/discounts.js";
import "../styles/index.css";

const heroImage = "https://images.unsplash.com/photo-1582200371328-11d78e4cea8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const universItems = [
    {
        id: "cafe",
        title: "Le café",
        subtitle: "Origines d'exception",
        image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: "the",
        title: "Le thé",
        subtitle: "Infusions délicates",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: "accessoires",
        title: "Accessoires",
        subtitle: "Le geste parfait",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    },
];

const selectionItems = [
    {
        id: 1,
        name: "Sierra Premium",
        description: "Notes chocolatées",
        price: 12.9,
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
        tag: "Nouveau",
    },
    {
        id: 2,
        name: "Arabica Éthiopie",
        description: "Fruité & floral",
        price: 15.5,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
        tag: "Signature",
    },
    {
        id: 3,
        name: "Earl Grey Impérial",
        description: "Bergamote fine",
        price: 13.4,
        image: "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=80",
        tag: "Thé",
    },
    {
        id: 4,
        name: "Rituel du Brésil",
        description: "Corps velouté",
        price: 11.8,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
        tag: "Café",
    },
];

const promoItems = [
    {
        id: "promo1",
        title: "Coffret découverte",
        desc: "4 origines à prix doux",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    },
    {
        id: "promo2",
        title: "Abonnement mensuel",
        desc: "Livraison chaque mois",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    },
];

const Home = () => {
    const navigate = useNavigate();
    const { addItem } = useContext(CartContext);
    const { query, setQuery } = useContext(SearchContext);

    const filteredSelection = useMemo(() => {
        if (!query.trim()) {
            return selectionItems;
        }
        const lower = query.toLowerCase();
        return selectionItems.filter((item) =>
            [item.name, item.description, item.tag]
                .join(" ")
                .toLowerCase()
                .includes(lower)
        );
    }, [query]);

    return (
        <main className="home">
            <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="hero-overlay" />
                <div className="hero-content">
                    <span className="hero-tag">COLLECTION 2026</span>
                    <h1>L'art du café, la pureté du thé.</h1>
                    <p>
                        Une sélection aux origines rares pour des rituels quotidiens.
                        Découvrez l'équilibre parfait entre intensité et douceur.
                    </p>
                    <div className="hero-actions">
                        <button
                            type="button"
                            className="primary"
                            onClick={() => navigate("/catalogue")}
                        >
                            Explorer la boutique
                        </button>
                        <button
                            type="button"
                            className="ghost"
                            onClick={() => {
                                setQuery("");
                                navigate("/catalogue");
                            }}
                        >
                            Découvrir nos univers
                        </button>
                    </div>
                </div>
            </section>

            <section className="section" id="univers">
                <div className="section-header">
                    <h2>Nos univers</h2>
                    <button
                        type="button"
                        className="section-link"
                        onClick={() => {
                            setQuery("");
                            navigate("/catalogue");
                        }}
                    >
                        Tout voir
                    </button>
                </div>
                <div className="univers-grid">
                    {universItems.map((item) => (
                        <article key={item.id} className="univers-card">
                            <img src={item.image} alt={item.title} />
                            <div className="univers-card-content">
                                <span>{item.subtitle}</span>
                                <h3>{item.title}</h3>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="section" id="selection">
                <div className="section-header">
                    <div>
                        <h2>Sélection du moment</h2>
                        <p>Les favoris de l'équipe, choisis pour leur qualité singulière.</p>
                    </div>
                    <button
                        type="button"
                        className="section-link"
                        onClick={() => {
                            setQuery("");
                            navigate("/catalogue");
                        }}
                    >
                        Voir toute la sélection
                    </button>
                </div>
                {filteredSelection.length === 0 ? (
                    <div className="empty-state">
                        <h3>Aucun résultat pour "{query}"</h3>
                        <p>Essayez avec un autre mot-clé ou explorez nos univers.</p>
                        <button
                            type="button"
                            onClick={() => {
                                setQuery("");
                                navigate("/catalogue");
                            }}
                        >
                            Réinitialiser la recherche
                        </button>
                    </div>
                ) : (
                    <div className="selection-grid">
                        {filteredSelection.map((item) => {
                            const discount = getDiscountPercent(item.id);
                            const discountedPrice = getDiscountedPrice(item.price, item.id);
                            return (
                                <article key={item.id} className="selection-card">
                                    <div className="selection-image">
                                        <img src={item.image} alt={item.name} />
                                        <span className="selection-tag">{item.tag}</span>
                                        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
                                    </div>
                                    <div className="selection-info">
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <div className="selection-footer">
                                            <span className="price-stack">
                                                {discount > 0 && (
                                                    <span className="price-old">{item.price.toFixed(2)} €</span>
                                                )}
                                                <span className="price-new">{discountedPrice.toFixed(2)} €</span>
                                            </span>
                                            <div className="selection-actions">
                                                <button
                                                    type="button"
                                                    className="ghost"
                                                    onClick={() =>
                                                        navigate(`/produit/${item.id}`, {
                                                            state: { product: item },
                                                        })
                                                    }
                                                >
                                                    Détails
                                                </button>
                                                <button
                                                    type="button"
                                                    className="primary"
                                                    onClick={() => addItem(item)}
                                                >
                                                    Ajouter
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            <section className="section" id="services">
                <div className="section-header center">
                    <h2>Des engagements sur-mesure</h2>
                    <p>Nous sélectionnons, torréfions et expédions avec soin.</p>
                </div>
                <div className="benefits-grid">
                    <div className="benefit">
                        <h3>Éthique exigeante</h3>
                        <p>Origines traçables, producteurs partenaires, juste rémunération.</p>
                    </div>
                    <div className="benefit">
                        <h3>Qualité garantie</h3>
                        <p>Micro-lots, dégustation interne, profil torréfié à la commande.</p>
                    </div>
                    <div className="benefit">
                        <h3>Expédition soignée</h3>
                        <p>Emballages élégants, livraison rapide et accompagnement personnalisé.</p>
                    </div>
                </div>
            </section>

            <section className="section" id="promos">
                <div className="section-header">
                    <div>
                        <h2>Offres & promotions</h2>
                        <p>Des expériences pensées pour vos rituels.</p>
                    </div>
                    <button
                        type="button"
                        className="section-link"
                        onClick={() => navigate("/nouveautes")}
                    >
                        Voir tout
                    </button>
                </div>
                <div className="univers-grid">
                    {promoItems.map((item) => (
                        <article key={item.id} className="univers-card">
                            <img src={item.image} alt={item.title} />
                            <div className="univers-card-content">
                                <span>{item.desc}</span>
                                <h3>{item.title}</h3>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="section" id="rse">
                <div className="section-header center">
                    <h2>Engagements RSE</h2>
                    <p>Traçabilité, commerce équitable et ateliers responsables.</p>
                </div>
                <div className="benefits-grid">
                    <div className="benefit">
                        <h3>Commerce équitable</h3>
                        <p>Producteurs partenaires rémunérés justement.</p>
                    </div>
                    <div className="benefit">
                        <h3>Durabilité</h3>
                        <p>Emballages recyclables et logistique optimisée.</p>
                    </div>
                    <div className="benefit">
                        <h3>Traçabilité</h3>
                        <p>Chaque lot est suivi du terroir à votre tasse.</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;



