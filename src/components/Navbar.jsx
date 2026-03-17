import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { CartContext } from "../context/cartContext.jsx";
import { SearchContext } from "../context/searchContext.jsx";
import "../styles/Navbar.css";

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

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

    const logoContent = theme === "dark" ? (
        <svg className="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 180" width="270" height="180" role="img" aria-label="CafThé">
            <defs>
                <linearGradient id="greenGrad2b" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#3dba7e" }} />
                    <stop offset="50%" style={{ stopColor: "#1f6a46" }} />
                    <stop offset="100%" style={{ stopColor: "#2d9464" }} />
                </linearGradient>
                <linearGradient id="iconBg2b" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#0e2018" }} />
                    <stop offset="100%" style={{ stopColor: "#09150e" }} />
                </linearGradient>
                <linearGradient id="textGrad2b" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#3dba7e" }} />
                    <stop offset="50%" style={{ stopColor: "#26845a" }} />
                    <stop offset="100%" style={{ stopColor: "#1f6a46" }} />
                </linearGradient>
            </defs>
            <g transform="translate(52, 90)">
                <polygon points="0,-52 45,-26 45,26 0,52 -45,26 -45,-26" fill="url(#iconBg2b)" stroke="url(#greenGrad2b)" strokeWidth="2" />
                <polygon points="0,-44 37,-22 37,22 0,44 -37,22 -37,-22" fill="none" stroke="url(#greenGrad2b)" strokeWidth="0.7" strokeDasharray="3,2" />
                <path d="M -18,4 Q -19,20 -12,24 L 12,24 Q 19,20 18,4 Z" fill="url(#greenGrad2b)" opacity="0.9" />
                <ellipse cx="0" cy="25" rx="20" ry="3.5" fill="url(#greenGrad2b)" opacity="0.7" />
                <path d="M 18,8 Q 30,8 30,16 Q 30,24 18,22" fill="none" stroke="url(#greenGrad2b)" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="0" cy="4" rx="18" ry="5" fill="#0e2018" stroke="url(#greenGrad2b)" strokeWidth="1.2" />
                <ellipse cx="0" cy="4" rx="14" ry="3.5" fill="url(#greenGrad2b)" opacity="0.5" />
                <path d="M -8,-6 Q -11,-14 -8,-20 Q -5,-26 -8,-32" fill="none" stroke="url(#greenGrad2b)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <path d="M 0,-4 Q -3,-13 0,-19 Q 3,-25 0,-31" fill="none" stroke="url(#greenGrad2b)" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                <path d="M 8,-6 Q 11,-14 8,-20 Q 5,-26 8,-32" fill="none" stroke="url(#greenGrad2b)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <path d="M -30,-10 Q -38,-22 -26,-30 Q -14,-20 -18,-8 Q -22,-4 -30,-10 Z" fill="url(#greenGrad2b)" opacity="0.85" />
                <path d="M -30,-10 Q -26,-18 -26,-30" fill="none" stroke="#0e2018" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
            </g>
            <g transform="translate(115, 0)">
                <text x="0" y="88" fontFamily="'Cinzel', 'Palatino Linotype', serif" fontSize="52" fontWeight="700" letterSpacing="10" fill="url(#textGrad2b)">{"CAFTHÉ"}</text>
                <line x1="2" y1="98" x2="285" y2="98" stroke="url(#greenGrad2b)" strokeWidth="0.8" opacity="0.6" />
                <circle cx="0" cy="98" r="2.5" fill="url(#greenGrad2b)" opacity="0.8" />
                <circle cx="287" cy="98" r="2.5" fill="url(#greenGrad2b)" opacity="0.8" />
                <line x1="2" y1="101" x2="285" y2="101" stroke="url(#greenGrad2b)" strokeWidth="0.3" opacity="0.4" />
                <text x="144" y="120" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" fontWeight="300" letterSpacing="6" fill="#3dba7e" textAnchor="middle" opacity="0.9">{"CAFÉ & THÉ DE PRESTIGE"}</text>
                <text x="144" y="143" fontFamily="Georgia, serif" fontSize="16" fill="url(#greenGrad2b)" textAnchor="middle" opacity="0.7">{"✦ ◆ ✦"}</text>
            </g>
        </svg>
    ) : (
        <svg className="logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 180" width="270" height="180" role="img" aria-label="CafThé">
            <defs>
                <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#d4a97a" }} />
                    <stop offset="50%" style={{ stopColor: "#b28b6a" }} />
                    <stop offset="100%" style={{ stopColor: "#8a6347" }} />
                </linearGradient>
                <linearGradient id="iconBg1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#f5ede4" }} />
                    <stop offset="100%" style={{ stopColor: "#e8d5c0" }} />
                </linearGradient>
                <linearGradient id="textGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#d4a97a" }} />
                    <stop offset="40%" style={{ stopColor: "#b28b6a" }} />
                    <stop offset="100%" style={{ stopColor: "#7a5535" }} />
                </linearGradient>
                <filter id="shadow1">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#b28b6a" floodOpacity="0.25" />
                </filter>
            </defs>
            <g transform="translate(52, 90)" filter="url(#shadow1)">
                <polygon points="0,-52 45,-26 45,26 0,52 -45,26 -45,-26" fill="url(#iconBg1)" stroke="url(#goldGrad1)" strokeWidth="2" />
                <polygon points="0,-44 37,-22 37,22 0,44 -37,22 -37,-22" fill="none" stroke="url(#goldGrad1)" strokeWidth="0.7" strokeDasharray="3,2" />
                <path d="M -18,4 Q -19,20 -12,24 L 12,24 Q 19,20 18,4 Z" fill="url(#goldGrad1)" opacity="0.9" />
                <ellipse cx="0" cy="25" rx="20" ry="3.5" fill="url(#goldGrad1)" opacity="0.7" />
                <path d="M 18,8 Q 30,8 30,16 Q 30,24 18,22" fill="none" stroke="url(#goldGrad1)" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="0" cy="4" rx="18" ry="5" fill="#f5ede4" stroke="url(#goldGrad1)" strokeWidth="1.2" />
                <ellipse cx="0" cy="4" rx="14" ry="3.5" fill="url(#goldGrad1)" opacity="0.6" />
                <path d="M -8,-6 Q -11,-14 -8,-20 Q -5,-26 -8,-32" fill="none" stroke="url(#goldGrad1)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <path d="M 0,-4 Q -3,-13 0,-19 Q 3,-25 0,-31" fill="none" stroke="url(#goldGrad1)" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                <path d="M 8,-6 Q 11,-14 8,-20 Q 5,-26 8,-32" fill="none" stroke="url(#goldGrad1)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <path d="M -30,-10 Q -38,-22 -26,-30 Q -14,-20 -18,-8 Q -22,-4 -30,-10 Z" fill="url(#goldGrad1)" opacity="0.85" />
                <path d="M -30,-10 Q -26,-18 -26,-30" fill="none" stroke="#f5ede4" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
            </g>
            <g transform="translate(115, 0)">
                <text x="0" y="88" fontFamily="'Cinzel', 'Palatino Linotype', serif" fontSize="52" fontWeight="700" letterSpacing="10" fill="url(#textGrad1)">{"CAFTHÉ"}</text>
                <line x1="2" y1="98" x2="285" y2="98" stroke="url(#goldGrad1)" strokeWidth="0.8" opacity="0.6" />
                <circle cx="0" cy="98" r="2.5" fill="url(#goldGrad1)" opacity="0.8" />
                <circle cx="287" cy="98" r="2.5" fill="url(#goldGrad1)" opacity="0.8" />
                <line x1="2" y1="101" x2="285" y2="101" stroke="url(#goldGrad1)" strokeWidth="0.3" opacity="0.4" />
                <text x="144" y="120" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" fontWeight="300" letterSpacing="6" fill="#b28b6a" textAnchor="middle" opacity="0.9">{"CAFÉ & THÉ DE PRESTIGE"}</text>
                <text x="144" y="143" fontFamily="Georgia, serif" fontSize="16" fill="url(#goldGrad1)" textAnchor="middle" opacity="0.7">{"✦ ◆ ✦"}</text>
            </g>
        </svg>
    );

    return (
        <nav className={`navbar${isAccountOpen ? " account-open" : ""}${isMobileMenuOpen ? " mobile-open" : ""}`}>
            <div className="navbar-left">
                <Link to="/" className="navbar-brand">
                    {logoContent}
                </Link>
            </div>

            <button
                type="button"
                className={`navbar-burger${isMobileMenuOpen ? " open" : ""}`}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMobileMenuOpen}
            >
                <span />
                <span />
                <span />
            </button>

            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <span className="icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.65" y1="16.65" x2="21" y2="21" />
                    </svg>
                </span>
                <input
                    className="navbar-search-input"
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
                <Link to="/" className="navbar-link">Accueil</Link>
                <Link to="/catalogue" className="navbar-link">Catalogue</Link>

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

                    <div className={`account-dropdown${isAccountOpen ? " open" : ""}`}>
                        {isAuthenticated ? (
                            <>
                                <div className="account-name">Bonjour {user?.prenom} {user?.nom}</div>
                                <button type="button" onClick={() => { navigate("/profil"); setIsAccountOpen(false); }}>
                                    Mon compte
                                </button>
                                <button type="button" onClick={handleLogout}>
                                    Se déconnecter
                                </button>
                            </>
                        ) : (
                            <>
                                <button type="button" onClick={() => { navigate("/login"); setIsAccountOpen(false); }}>
                                    Se connecter
                                </button>
                                <button type="button" onClick={() => { navigate("/inscription"); setIsAccountOpen(false); }}>
                                    Créer un compte
                                </button>
                            </>
                        )}
                    </div>
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

            {/* ✅ Toujours dans le DOM, animé via la classe "open" */}
            <div className={`cart-drawer${isCartOpen && !isAccountOpen ? " open" : ""}`}>
                <div className="cart-header">
                    <h3>Votre panier</h3>
                    <button type="button" className="btn-fermer" onClick={() => setIsCartOpen(false)}>Fermer</button>
                </div>
                {items.length === 0 ? (
                    <div className="cart-empty">Votre panier est vide.</div>
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
                                        <button type="button" className="remove-item" onClick={() => removeItem(item.key ?? item.id)}>
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
                        <button type="button" className="primary view-cart" onClick={() => { navigate("/panier"); setIsCartOpen(false); }}>
                            Voir le panier
                        </button>
                        <button type="button" className="primary" onClick={() => { navigate(isAuthenticated ? "/profil" : "/login"); setIsCartOpen(false); }}>
                            {isAuthenticated ? "Mon compte" : "Se connecter"}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
