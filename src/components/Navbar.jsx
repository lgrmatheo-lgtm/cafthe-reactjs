import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { CartContext } from "../context/cartContext.jsx";
import { SearchContext } from "../context/searchContext.jsx";

const THEME_STORAGE_KEY = "cafthe_theme";

const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
};

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const { items, totalItems, totalPrice, decreaseItem, addItem, removeItem, clear } = useContext(CartContext);
    const { query, setQuery } = useContext(SearchContext);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [theme, setTheme] = useState(getInitialTheme);
    const accountRef = useRef(null);

    const cartTotal = useMemo(() => totalPrice.toFixed(2), [totalPrice]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.colorScheme = theme;
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isAccountOpen) return;
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setIsAccountOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isAccountOpen]);

    const handleLogout = () => {
        logout();
        setIsAccountOpen(false);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (location.pathname !== "/catalogue") {
            navigate("/catalogue");
            return;
        }
        const target = document.getElementById("selection");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <nav className={`navbar${isAccountOpen ? " account-open" : ""}`}>
            <div className="navbar-left">
                <Link to="/" className="navbar-brand">
                    <img src="/logo_sans_background.png" alt="CafThé" />
                </Link>
            </div>

            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <span className="icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.65" y1="16.65" x2="21" y2="21" />
                    </svg>
                </span>
                <input
                    type="search"
                    placeholder="Rechercher un produit"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    aria-label="Rechercher"
                />
                <button type="submit" aria-label="Recherche vocale" className="icon-button">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="9" y="4" width="6" height="12" rx="3" />
                        <path d="M5 11a7 7 0 0 0 14 0" />
                        <line x1="12" y1="18" x2="12" y2="22" />
                        <line x1="9" y1="22" x2="15" y2="22" />
                    </svg>
                </button>
            </form>

            <div className="navbar-actions">
                <Link to="/" className="navbar-link">
                    Accueil
                </Link>
                <Link to="/catalogue" className="navbar-link">
                    Catalogue
                </Link>

                <button
                    type="button"
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
                    title={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
                >
                    {theme === "dark" ? "Clair" : "Sombre"}
                </button>

                <div className="navbar-account" ref={accountRef}>
                    <button
                        type="button"
                        className="navbar-icon"
                        onClick={() => {
                            setIsAccountOpen((open) => !open);
                            setIsCartOpen(false);
                        }}
                        aria-expanded={isAccountOpen}
                        aria-label="Compte"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="8" r="3.5" />
                            <path d="M4 20c1.6-4 14.4-4 16 0" />
                        </svg>
                    </button>
                    {isAccountOpen && (
                        <div className="account-dropdown">
                            {isAuthenticated ? (
                                <>
                                    <div className="account-name">Bonjour {user?.prenom} {user?.nom}</div>
                                    <button type="button" onClick={() => {navigate("/profil"); setIsAccountOpen(false);}}>
                                        Mon compte
                                    </button>
                                    <button type="button" onClick={handleLogout}>
                                        Se déconnecter
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" onClick={() => {navigate("/login"); setIsAccountOpen(false);}}>
                                        Se connecter
                                    </button>
                                    <button type="button" onClick={() => {navigate("/inscription"); setIsAccountOpen(false);}}>
                                        Créer un compte
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className="navbar-cart-icon"
                    onClick={() => {
                        setIsCartOpen((open) => !open);
                        setIsAccountOpen(false);
                    }}
                    aria-expanded={isCartOpen}
                    aria-label="Panier"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="9" cy="20" r="1.6" />
                        <circle cx="17" cy="20" r="1.6" />
                        <path d="M3 4h2l2.4 10.5h10.6l2-7.5H7.5" />
                    </svg>
                    <span className="cart-count">{totalItems}</span>
                </button>
            </div>

            {isCartOpen && !isAccountOpen && (
                <div className="cart-drawer">
                    <div className="cart-header">
                        <h3>Votre panier</h3>
                        <button type="button" onClick={() => setIsCartOpen(false)}>Fermer</button>
                    </div>
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            Votre panier est vide.
                        </div>
                    ) : (
                        <div className="cart-items">
                            {items.map((item) => (
                                <div key={item.key ?? item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        <div className="cart-item-name">{item.name}</div>
                                        <div className="cart-item-meta">
                                            {item.variant ? `${item.variant} - ` : ""}
                                            {item.price.toFixed(2)} €
                                        </div>
                                        <div className="cart-item-actions">
                                            <button type="button" onClick={() => decreaseItem(item.key ?? item.id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button type="button" onClick={() => addItem(item)}>+</button>
                                            <button
                                                type="button"
                                                className="remove-item"
                                                onClick={() => removeItem(item.key ?? item.id)}
                                            >
                                                Retirer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="cart-footer">
                        <div className="cart-total">Total: {cartTotal} €</div>
                        <div className="cart-footer-actions">
                            <button type="button" onClick={clear} className="ghost clear-cart">Vider</button>
                            <button
                                type="button"
                                className="primary view-cart"
                                onClick={() => {
                                    navigate("/panier");
                                    setIsCartOpen(false);
                                }}
                            >
                                Voir le panier
                            </button>
                            <button
                                type="button"
                                className="primary"
                                onClick={() => {
                                    navigate(isAuthenticated ? "/profil" : "/login");
                                    setIsCartOpen(false);
                                }}
                            >
                                {isAuthenticated ? "Mon compte" : "Se connecter"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
