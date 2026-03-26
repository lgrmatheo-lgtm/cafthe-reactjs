import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <h3>CafThé</h3>
                    <p>
                        Une sélection rigoureuse de thés
                        et cafés d'exception. L'excellence
                        du goût, livrée chez vous.
                    </p>
                </div>
                <div className="footer-column">
                    <h4>Produits</h4>
                    <Link to="/thes-origine">Thés d'origine</Link>
                    <Link to="/cafes-specialite">Cafés de spécialité</Link>
                    <Link to="/accessoires">Accessoires</Link>
                    <Link to="/nouveautes">Nouveautés</Link>
                </div>
                <div className="footer-column">
                    <h4>Aide</h4>
                    <Link to="/livraison-retours">Livraison & Retours</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/mentions-legales">Mentions légales</Link>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© 2026 CafThé. Tous droits réservés.</span>
                <div className="footer-bottom-links">
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;




