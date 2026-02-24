// Fichier annote automatiquement pour revision junior: src\pages\Home.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Home.jsx
 * @file Home.jsx
// Ligne 3: Execute cette instruction: * Role: Landing page commerciale.
 * Role: Landing page commerciale.
// Ligne 4: Execute cette instruction: * Comment c est fait: Compose hero + sections marketing + produits, avec filtres rapides connectes au contexte de rec...
 * Comment c est fait: Compose hero + sections marketing + produits, avec filtres rapides connectes au contexte de recherche.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useContext, useMemo } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import { useNavigate } from "react-router-dom";
// Ligne 9: Importe un module necessaire au composant ou a sa logique.
import { CartContext } from "../context/cartContext.jsx";
// Ligne 10: Importe un module necessaire au composant ou a sa logique.
import { SearchContext } from "../context/searchContext.jsx";
// Ligne 11: Importe un module necessaire au composant ou a sa logique.
import { getDiscountPercent, getDiscountedPrice } from "../utils/discounts.js";
// Ligne 12: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 13: Declare une variable locale utilisee par le composant.
const heroImage = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80";
// Ligne 14: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 15: Declare une variable locale utilisee par le composant.
const universItems = [
// Ligne 16: Ouvre un bloc de code ou une structure de donnees.
    {
// Ligne 17: Execute cette instruction: id: "cafe",
        id: "cafe",
// Ligne 18: Execute cette instruction: title: "Le café",
        title: "Le café",
// Ligne 19: Execute cette instruction: subtitle: "Origines d'exception",
        subtitle: "Origines d'exception",
// Ligne 20: Effectue une affectation ou initialise une valeur.
        image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=900&q=80",
// Ligne 21: Ferme un bloc de code ou une structure de donnees.
    },
// Ligne 22: Ouvre un bloc de code ou une structure de donnees.
    {
// Ligne 23: Execute cette instruction: id: "the",
        id: "the",
// Ligne 24: Execute cette instruction: title: "Le thé",
        title: "Le thé",
// Ligne 25: Execute cette instruction: subtitle: "Infusions délicates",
        subtitle: "Infusions délicates",
// Ligne 26: Effectue une affectation ou initialise une valeur.
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
// Ligne 27: Ferme un bloc de code ou une structure de donnees.
    },
// Ligne 28: Ouvre un bloc de code ou une structure de donnees.
    {
// Ligne 29: Execute cette instruction: id: "accessoires",
        id: "accessoires",
// Ligne 30: Execute cette instruction: title: "Accessoires",
        title: "Accessoires",
// Ligne 31: Execute cette instruction: subtitle: "Le geste parfait",
        subtitle: "Le geste parfait",
// Ligne 32: Effectue une affectation ou initialise une valeur.
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
// Ligne 33: Ferme un bloc de code ou une structure de donnees.
    },
// Ligne 34: Ferme un bloc de code ou une structure de donnees.
];
// Ligne 35: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 36: Declare une variable locale utilisee par le composant.
const selectionItems = [
// Ligne 37: Ouvre un bloc de code ou une structure de donnees.
    {
// Ligne 38: Execute cette instruction: id: 1,
        id: 1,
// Ligne 39: Execute cette instruction: name: "Sierra Premium",
        name: "Sierra Premium",
// Ligne 40: Execute cette instruction: description: "Notes chocolatées",
        description: "Notes chocolatées",
// Ligne 41: Execute cette instruction: price: 12.9,
        price: 12.9,
// Ligne 42: Effectue une affectation ou initialise une valeur.
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
// Ligne 43: Execute cette instruction: tag: "Nouveau",
        tag: "Nouveau",
// Ligne 44: Ferme un bloc de code ou une structure de donnees.
    },
// Ligne 45: Ouvre un bloc de code ou une structure de donnees.
    {
// Ligne 46: Execute cette instruction: id: 2,
        id: 2,
// Ligne 47: Execute cette instruction: name: "Arabica Éthiopie",
        name: "Arabica Éthiopie",
// Ligne 48: Execute cette instruction: description: "Fruité & floral",
        description: "Fruité & floral",
// Ligne 49: Execute cette instruction: price: 15.5,
        price: 15.5,
// Ligne 50: Effectue une affectation ou initialise une valeur.
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
// Ligne 51: Execute cette instruction: tag: "Signature",
        tag: "Signature",
// Ligne 52: Ferme un bloc de code ou une structure de donnees.
    },
// Ligne 53: Ouvre un bloc de code ou une structure de donnees.
    {
// Ligne 54: Execute cette instruction: id: 3,
        id: 3,
// Ligne 55: Execute cette instruction: name: "Earl Grey Impérial",
        name: "Earl Grey Impérial",
// Ligne 56: Execute cette instruction: description: "Bergamote fine",
        description: "Bergamote fine",
// Ligne 57: Execute cette instruction: price: 13.4,
        price: 13.4,
// Ligne 58: Effectue une affectation ou initialise une valeur.
        image: "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=80",
// Ligne 59: Execute cette instruction: tag: "Thé",
        tag: "Thé",
// Ligne 60: Ferme un bloc de code ou une structure de donnees.
    },
// Ligne 61: Ouvre un bloc de code ou une structure de donnees.
    {
// Ligne 62: Execute cette instruction: id: 4,
        id: 4,
// Ligne 63: Execute cette instruction: name: "Rituel du Brésil",
        name: "Rituel du Brésil",
// Ligne 64: Execute cette instruction: description: "Corps velouté",
        description: "Corps velouté",
// Ligne 65: Execute cette instruction: price: 11.8,
        price: 11.8,
// Ligne 66: Effectue une affectation ou initialise une valeur.
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
// Ligne 67: Execute cette instruction: tag: "Café",
        tag: "Café",
// Ligne 68: Ferme un bloc de code ou une structure de donnees.
    },
// Ligne 69: Ferme un bloc de code ou une structure de donnees.
];
// Ligne 70: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 71: Declare une variable locale utilisee par le composant.
const promoItems = [
// Ligne 72: Ouvre un bloc de code ou une structure de donnees.
    {
// Ligne 73: Execute cette instruction: id: "promo1",
        id: "promo1",
// Ligne 74: Execute cette instruction: title: "Coffret découverte",
        title: "Coffret découverte",
// Ligne 75: Execute cette instruction: desc: "4 origines à prix doux",
        desc: "4 origines à prix doux",
// Ligne 76: Effectue une affectation ou initialise une valeur.
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
// Ligne 77: Ferme un bloc de code ou une structure de donnees.
    },
// Ligne 78: Ouvre un bloc de code ou une structure de donnees.
    {
// Ligne 79: Execute cette instruction: id: "promo2",
        id: "promo2",
// Ligne 80: Execute cette instruction: title: "Abonnement mensuel",
        title: "Abonnement mensuel",
// Ligne 81: Execute cette instruction: desc: "Livraison chaque mois",
        desc: "Livraison chaque mois",
// Ligne 82: Effectue une affectation ou initialise une valeur.
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
// Ligne 83: Ferme un bloc de code ou une structure de donnees.
    },
// Ligne 84: Ferme un bloc de code ou une structure de donnees.
];
// Ligne 85: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 86: Declare une variable locale utilisee par le composant.
const Home = () => {
// Ligne 87: Declare une variable locale utilisee par le composant.
    const navigate = useNavigate();
// Ligne 88: Declare une variable locale utilisee par le composant.
    const { addItem } = useContext(CartContext);
// Ligne 89: Declare une variable locale utilisee par le composant.
    const { query, setQuery } = useContext(SearchContext);
// Ligne 90: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 91: Declare une variable locale utilisee par le composant.
    const filteredSelection = useMemo(() => {
// Ligne 92: Applique une condition pour brancher le flux d execution.
        if (!query.trim()) {
// Ligne 93: Retourne une valeur depuis la fonction en cours.
            return selectionItems;
// Ligne 94: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 95: Declare une variable locale utilisee par le composant.
        const lower = query.toLowerCase();
// Ligne 96: Retourne une valeur depuis la fonction en cours.
        return selectionItems.filter((item) =>
// Ligne 97: Execute cette instruction: [item.name, item.description, item.tag]
            [item.name, item.description, item.tag]
// Ligne 98: Execute cette instruction: .join(" ")
                .join(" ")
// Ligne 99: Execute cette instruction: .toLowerCase()
                .toLowerCase()
// Ligne 100: Execute cette instruction: .includes(lower)
                .includes(lower)
// Ligne 101: Execute cette instruction: );
        );
// Ligne 102: Ferme un bloc de code ou une structure de donnees.
    }, [query]);
// Ligne 103: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 104: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 105: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="home">
// Ligne 106: Ouvre un element JSX qui compose l interface utilisateur.
            <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
// Ligne 107: Declare un element JSX auto-fermante (sans enfants).
                <div className="hero-overlay" />
// Ligne 108: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="hero-content">
// Ligne 109: Ouvre un element JSX qui compose l interface utilisateur.
                    <span className="hero-tag">COLLECTION 2026</span>
// Ligne 110: Ouvre un element JSX qui compose l interface utilisateur.
                    <h1>L'art du café, la pureté du thé.</h1>
// Ligne 111: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>
// Ligne 112: Execute cette instruction: Une sélection aux origines rares pour des rituels quotidiens.
                        Une sélection aux origines rares pour des rituels quotidiens.
// Ligne 113: Execute cette instruction: Découvrez l'équilibre parfait entre intensité et douceur.
                        Découvrez l'équilibre parfait entre intensité et douceur.
// Ligne 114: Ferme un element JSX dans l arborescence du rendu.
                    </p>
// Ligne 115: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="hero-actions">
// Ligne 116: Ouvre un element JSX qui compose l interface utilisateur.
                        <button
// Ligne 117: Effectue une affectation ou initialise une valeur.
                            type="button"
// Ligne 118: Effectue une affectation ou initialise une valeur.
                            className="primary"
// Ligne 119: Associe une action JavaScript a un clic utilisateur.
                            onClick={() => navigate("/catalogue")}
// Ligne 120: Execute cette instruction: >
                        >
// Ligne 121: Execute cette instruction: Explorer la boutique
                            Explorer la boutique
// Ligne 122: Ferme un element JSX dans l arborescence du rendu.
                        </button>
// Ligne 123: Ouvre un element JSX qui compose l interface utilisateur.
                        <button
// Ligne 124: Effectue une affectation ou initialise une valeur.
                            type="button"
// Ligne 125: Effectue une affectation ou initialise une valeur.
                            className="ghost"
// Ligne 126: Declare une fonction (handler, utilitaire ou composant).
                            onClick={() => {
// Ligne 127: Execute cette instruction: setQuery("");
                                setQuery("");
// Ligne 128: Declenche une navigation vers une autre route de l application.
                                navigate("/catalogue");
// Ligne 129: Ferme un bloc de code ou une structure de donnees.
                            }}
// Ligne 130: Execute cette instruction: >
                        >
// Ligne 131: Execute cette instruction: Découvrir nos univers
                            Découvrir nos univers
// Ligne 132: Ferme un element JSX dans l arborescence du rendu.
                        </button>
// Ligne 133: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 134: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 135: Ferme un element JSX dans l arborescence du rendu.
            </section>
// Ligne 136: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 137: Ouvre un element JSX qui compose l interface utilisateur.
            <section className="section" id="univers">
// Ligne 138: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="section-header">
// Ligne 139: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Nos univers</h2>
// Ligne 140: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 141: Effectue une affectation ou initialise une valeur.
                        type="button"
// Ligne 142: Effectue une affectation ou initialise une valeur.
                        className="section-link"
// Ligne 143: Declare une fonction (handler, utilitaire ou composant).
                        onClick={() => {
// Ligne 144: Execute cette instruction: setQuery("");
                            setQuery("");
// Ligne 145: Declenche une navigation vers une autre route de l application.
                            navigate("/catalogue");
// Ligne 146: Ferme un bloc de code ou une structure de donnees.
                        }}
// Ligne 147: Execute cette instruction: >
                    >
// Ligne 148: Execute cette instruction: Tout voir
                        Tout voir
// Ligne 149: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 150: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 151: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="univers-grid">
// Ligne 152: Parcourt une collection pour generer une liste d elements.
                    {universItems.map((item) => (
// Ligne 153: Ouvre un element JSX qui compose l interface utilisateur.
                        <article key={item.id} className="univers-card">
// Ligne 154: Declare un element JSX auto-fermante (sans enfants).
                            <img src={item.image} alt={item.title} />
// Ligne 155: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="univers-card-content">
// Ligne 156: Ouvre un element JSX qui compose l interface utilisateur.
                                <span>{item.subtitle}</span>
// Ligne 157: Ouvre un element JSX qui compose l interface utilisateur.
                                <h3>{item.title}</h3>
// Ligne 158: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 159: Ferme un element JSX dans l arborescence du rendu.
                        </article>
// Ligne 160: Execute cette instruction: ))}
                    ))}
// Ligne 161: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 162: Ferme un element JSX dans l arborescence du rendu.
            </section>
// Ligne 163: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 164: Ouvre un element JSX qui compose l interface utilisateur.
            <section className="section" id="selection">
// Ligne 165: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="section-header">
// Ligne 166: Ouvre un element JSX qui compose l interface utilisateur.
                    <div>
// Ligne 167: Ouvre un element JSX qui compose l interface utilisateur.
                        <h2>Sélection du moment</h2>
// Ligne 168: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Les favoris de l'équipe, choisis pour leur qualité singulière.</p>
// Ligne 169: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 170: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 171: Effectue une affectation ou initialise une valeur.
                        type="button"
// Ligne 172: Effectue une affectation ou initialise une valeur.
                        className="section-link"
// Ligne 173: Declare une fonction (handler, utilitaire ou composant).
                        onClick={() => {
// Ligne 174: Execute cette instruction: setQuery("");
                            setQuery("");
// Ligne 175: Declenche une navigation vers une autre route de l application.
                            navigate("/catalogue");
// Ligne 176: Ferme un bloc de code ou une structure de donnees.
                        }}
// Ligne 177: Execute cette instruction: >
                    >
// Ligne 178: Execute cette instruction: Voir toute la sélection
                        Voir toute la sélection
// Ligne 179: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 180: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 181: Effectue une affectation ou initialise une valeur.
                {filteredSelection.length === 0 ? (
// Ligne 182: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="empty-state">
// Ligne 183: Ouvre un element JSX qui compose l interface utilisateur.
                        <h3>Aucun résultat pour "{query}"</h3>
// Ligne 184: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Essayez avec un autre mot-clé ou explorez nos univers.</p>
// Ligne 185: Ouvre un element JSX qui compose l interface utilisateur.
                        <button
// Ligne 186: Effectue une affectation ou initialise une valeur.
                            type="button"
// Ligne 187: Declare une fonction (handler, utilitaire ou composant).
                            onClick={() => {
// Ligne 188: Execute cette instruction: setQuery("");
                                setQuery("");
// Ligne 189: Declenche une navigation vers une autre route de l application.
                                navigate("/catalogue");
// Ligne 190: Ferme un bloc de code ou une structure de donnees.
                            }}
// Ligne 191: Execute cette instruction: >
                        >
// Ligne 192: Execute cette instruction: Réinitialiser la recherche
                            Réinitialiser la recherche
// Ligne 193: Ferme un element JSX dans l arborescence du rendu.
                        </button>
// Ligne 194: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 195: Execute cette instruction: ) : (
                ) : (
// Ligne 196: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="selection-grid">
// Ligne 197: Declare une fonction (handler, utilitaire ou composant).
                        {filteredSelection.map((item) => {
// Ligne 198: Declare une variable locale utilisee par le composant.
                            const discount = getDiscountPercent(item.id);
// Ligne 199: Declare une variable locale utilisee par le composant.
                            const discountedPrice = getDiscountedPrice(item.price, item.id);
// Ligne 200: Commence le JSX retourne pour l affichage de l interface.
                            return (
// Ligne 201: Ouvre un element JSX qui compose l interface utilisateur.
                                <article key={item.id} className="selection-card">
// Ligne 202: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div className="selection-image">
// Ligne 203: Declare un element JSX auto-fermante (sans enfants).
                                        <img src={item.image} alt={item.name} />
// Ligne 204: Ouvre un element JSX qui compose l interface utilisateur.
                                        <span className="selection-tag">{item.tag}</span>
// Ligne 205: Effectue une affectation ou initialise une valeur.
                                        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
// Ligne 206: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 207: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div className="selection-info">
// Ligne 208: Ouvre un element JSX qui compose l interface utilisateur.
                                        <h3>{item.name}</h3>
// Ligne 209: Ouvre un element JSX qui compose l interface utilisateur.
                                        <p>{item.description}</p>
// Ligne 210: Ouvre un element JSX qui compose l interface utilisateur.
                                        <div className="selection-footer">
// Ligne 211: Ouvre un element JSX qui compose l interface utilisateur.
                                            <span className="price-stack">
// Ligne 212: Execute cette instruction: {discount > 0 && (
                                                {discount > 0 && (
// Ligne 213: Ouvre un element JSX qui compose l interface utilisateur.
                                                    <span className="price-old">{item.price.toFixed(2)} €</span>
// Ligne 214: Execute cette instruction: )}
                                                )}
// Ligne 215: Ouvre un element JSX qui compose l interface utilisateur.
                                                <span className="price-new">{discountedPrice.toFixed(2)} €</span>
// Ligne 216: Ferme un element JSX dans l arborescence du rendu.
                                            </span>
// Ligne 217: Ouvre un element JSX qui compose l interface utilisateur.
                                            <div className="selection-actions">
// Ligne 218: Ouvre un element JSX qui compose l interface utilisateur.
                                                <button
// Ligne 219: Effectue une affectation ou initialise une valeur.
                                                    type="button"
// Ligne 220: Effectue une affectation ou initialise une valeur.
                                                    className="ghost"
// Ligne 221: Associe une action JavaScript a un clic utilisateur.
                                                    onClick={() => navigate(`/produit/${item.id}`)}
// Ligne 222: Execute cette instruction: >
                                                >
// Ligne 223: Execute cette instruction: Détails
                                                    Détails
// Ligne 224: Ferme un element JSX dans l arborescence du rendu.
                                                </button>
// Ligne 225: Ouvre un element JSX qui compose l interface utilisateur.
                                                <button
// Ligne 226: Effectue une affectation ou initialise une valeur.
                                                    type="button"
// Ligne 227: Effectue une affectation ou initialise une valeur.
                                                    className="primary"
// Ligne 228: Associe une action JavaScript a un clic utilisateur.
                                                    onClick={() => addItem(item)}
// Ligne 229: Execute cette instruction: >
                                                >
// Ligne 230: Execute cette instruction: Ajouter
                                                    Ajouter
// Ligne 231: Ferme un element JSX dans l arborescence du rendu.
                                                </button>
// Ligne 232: Ferme un element JSX dans l arborescence du rendu.
                                            </div>
// Ligne 233: Ferme un element JSX dans l arborescence du rendu.
                                        </div>
// Ligne 234: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 235: Ferme un element JSX dans l arborescence du rendu.
                                </article>
// Ligne 236: Execute cette instruction: );
                            );
// Ligne 237: Ferme un bloc de code ou une structure de donnees.
                        })}
// Ligne 238: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 239: Execute cette instruction: )}
                )}
// Ligne 240: Ferme un element JSX dans l arborescence du rendu.
            </section>
// Ligne 241: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 242: Ouvre un element JSX qui compose l interface utilisateur.
            <section className="section" id="services">
// Ligne 243: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="section-header center">
// Ligne 244: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Des engagements sur-mesure</h2>
// Ligne 245: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>Nous sélectionnons, torréfions et expédions avec soin.</p>
// Ligne 246: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 247: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="benefits-grid">
// Ligne 248: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="benefit">
// Ligne 249: Ouvre un element JSX qui compose l interface utilisateur.
                        <h3>Éthique exigeante</h3>
// Ligne 250: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Origines traçables, producteurs partenaires, juste rémunération.</p>
// Ligne 251: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 252: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="benefit">
// Ligne 253: Ouvre un element JSX qui compose l interface utilisateur.
                        <h3>Qualité garantie</h3>
// Ligne 254: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Micro-lots, dégustation interne, profil torréfié à la commande.</p>
// Ligne 255: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 256: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="benefit">
// Ligne 257: Ouvre un element JSX qui compose l interface utilisateur.
                        <h3>Expédition soignée</h3>
// Ligne 258: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Emballages élégants, livraison rapide et accompagnement personnalisé.</p>
// Ligne 259: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 260: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 261: Ferme un element JSX dans l arborescence du rendu.
            </section>
// Ligne 262: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 263: Ouvre un element JSX qui compose l interface utilisateur.
            <section className="section" id="promos">
// Ligne 264: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="section-header">
// Ligne 265: Ouvre un element JSX qui compose l interface utilisateur.
                    <div>
// Ligne 266: Ouvre un element JSX qui compose l interface utilisateur.
                        <h2>Offres & promotions</h2>
// Ligne 267: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Des expériences pensées pour vos rituels.</p>
// Ligne 268: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 269: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 270: Effectue une affectation ou initialise une valeur.
                        type="button"
// Ligne 271: Effectue une affectation ou initialise une valeur.
                        className="section-link"
// Ligne 272: Associe une action JavaScript a un clic utilisateur.
                        onClick={() => navigate("/nouveautes")}
// Ligne 273: Execute cette instruction: >
                    >
// Ligne 274: Execute cette instruction: Voir tout
                        Voir tout
// Ligne 275: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 276: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 277: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="univers-grid">
// Ligne 278: Parcourt une collection pour generer une liste d elements.
                    {promoItems.map((item) => (
// Ligne 279: Ouvre un element JSX qui compose l interface utilisateur.
                        <article key={item.id} className="univers-card">
// Ligne 280: Declare un element JSX auto-fermante (sans enfants).
                            <img src={item.image} alt={item.title} />
// Ligne 281: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="univers-card-content">
// Ligne 282: Ouvre un element JSX qui compose l interface utilisateur.
                                <span>{item.desc}</span>
// Ligne 283: Ouvre un element JSX qui compose l interface utilisateur.
                                <h3>{item.title}</h3>
// Ligne 284: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 285: Ferme un element JSX dans l arborescence du rendu.
                        </article>
// Ligne 286: Execute cette instruction: ))}
                    ))}
// Ligne 287: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 288: Ferme un element JSX dans l arborescence du rendu.
            </section>
// Ligne 289: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 290: Ouvre un element JSX qui compose l interface utilisateur.
            <section className="section" id="rse">
// Ligne 291: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="section-header center">
// Ligne 292: Ouvre un element JSX qui compose l interface utilisateur.
                    <h2>Engagements RSE</h2>
// Ligne 293: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>Traçabilité, commerce équitable et ateliers responsables.</p>
// Ligne 294: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 295: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="benefits-grid">
// Ligne 296: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="benefit">
// Ligne 297: Ouvre un element JSX qui compose l interface utilisateur.
                        <h3>Commerce équitable</h3>
// Ligne 298: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Producteurs partenaires rémunérés justement.</p>
// Ligne 299: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 300: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="benefit">
// Ligne 301: Ouvre un element JSX qui compose l interface utilisateur.
                        <h3>Durabilité</h3>
// Ligne 302: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Emballages recyclables et logistique optimisée.</p>
// Ligne 303: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 304: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="benefit">
// Ligne 305: Ouvre un element JSX qui compose l interface utilisateur.
                        <h3>Traçabilité</h3>
// Ligne 306: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Chaque lot est suivi du terroir à votre tasse.</p>
// Ligne 307: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 308: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 309: Ferme un element JSX dans l arborescence du rendu.
            </section>
// Ligne 310: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 311: Execute cette instruction: );
    );
// Ligne 312: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 313: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 314: Expose ce composant comme export par defaut du fichier.
export default Home;
// Ligne 315: Ligne vide pour aerer le code et separer les blocs logiques.
