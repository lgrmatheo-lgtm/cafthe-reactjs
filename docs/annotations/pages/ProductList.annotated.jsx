// Fichier annote automatiquement pour revision junior: src\pages\ProductList.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file ProductList.jsx
 * @file ProductList.jsx
// Ligne 3: Execute cette instruction: * Role: Liste alternative de produits (mode simple).
 * Role: Liste alternative de produits (mode simple).
// Ligne 4: Execute cette instruction: * Comment c est fait: Montre un flux pedagogue fetch + loading + erreurs + rendu cartes.
 * Comment c est fait: Montre un flux pedagogue fetch + loading + erreurs + rendu cartes.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useEffect, useState } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import Skeleton from "react-loading-skeleton";
// Ligne 9: Importe un module necessaire au composant ou a sa logique.
import ProductCard from "../components/ProductCard.jsx";
// Ligne 10: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 11: Declare une variable locale utilisee par le composant.
const ProductList = () => {
// Ligne 12: Declare une variable locale utilisee par le composant.
    const [produits, setProduits] = useState([]);
// Ligne 13: Declare une variable locale utilisee par le composant.
    const [isLoading, setIsLoading] = useState(true);
// Ligne 14: Declare une variable locale utilisee par le composant.
    const [error, setError] = useState(null);
// Ligne 15: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 16: Declare une fonction (handler, utilitaire ou composant).
    useEffect(() => {
// Ligne 17: Declare une variable locale utilisee par le composant.
        const fetchProduits = async () => {
// Ligne 18: Ouvre un bloc de code ou une structure de donnees.
            try {
// Ligne 19: Execute cette instruction: setIsLoading(true);
                setIsLoading(true);
// Ligne 20: Execute cette instruction: setError(null);
                setError(null);
// Ligne 21: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 22: Declare une variable locale utilisee par le composant.
                const response = await fetch(
// Ligne 23: Execute cette instruction: `${import.meta.env.VITE_API_URL}/api/articles`,
                    `${import.meta.env.VITE_API_URL}/api/articles`,
// Ligne 24: Execute cette instruction: );
                );
// Ligne 25: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 26: Applique une condition pour brancher le flux d execution.
                if (!response.ok) {
// Ligne 27: Execute cette instruction: throw new Error(`Erreur HTTP ${response.status}`);
                    throw new Error(`Erreur HTTP ${response.status}`);
// Ligne 28: Ferme un bloc de code ou une structure de donnees.
                }
// Ligne 29: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 30: Declare une variable locale utilisee par le composant.
                const data = await response.json();
// Ligne 31: Execute cette instruction: setProduits(data.article);
                setProduits(data.article);
// Ligne 32: Ouvre un bloc de code ou une structure de donnees.
            } catch (err) {
// Ligne 33: Execute cette instruction: console.error("Erreur lors du chargement des produits :", err);
                console.error("Erreur lors du chargement des produits :", err);
// Ligne 34: Execute cette instruction: setError("Impossible de charger les produits");
                setError("Impossible de charger les produits");
// Ligne 35: Ouvre un bloc de code ou une structure de donnees.
            } finally {
// Ligne 36: Execute cette instruction: setIsLoading(false);
                setIsLoading(false);
// Ligne 37: Ferme un bloc de code ou une structure de donnees.
            }
// Ligne 38: Ferme un bloc de code ou une structure de donnees.
        };
// Ligne 39: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 40: Execute cette instruction: void fetchProduits();
        void fetchProduits();
// Ligne 41: Ferme un bloc de code ou une structure de donnees.
    }, []);
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 43: Execute cette instruction: // Chargement : Skeleton
    // Chargement : Skeleton
// Ligne 44: Applique une condition pour brancher le flux d execution.
    if (isLoading) {
// Ligne 45: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 46: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="product-list">
// Ligne 47: Parcourt une collection pour generer une liste d elements.
                {Array.from({ length: 6 }).map((_, i) => (
// Ligne 48: Ouvre un element JSX qui compose l interface utilisateur.
                    <div key={i} className="product-skeleton">
// Ligne 49: Declare un element JSX auto-fermante (sans enfants).
                        <Skeleton height={200} width={300} />
// Ligne 50: Ouvre un element JSX qui compose l interface utilisateur.
                        <div style={{ marginTop: "0.5rem" }}>
// Ligne 51: Declare un element JSX auto-fermante (sans enfants).
                            <Skeleton height={20} width="70%" />
// Ligne 52: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 53: Ouvre un element JSX qui compose l interface utilisateur.
                        <div style={{ marginTop: "0.3rem" }}>
// Ligne 54: Declare un element JSX auto-fermante (sans enfants).
                            <Skeleton height={20} width="40%" />
// Ligne 55: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 56: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 57: Execute cette instruction: ))}
                ))}
// Ligne 58: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 59: Execute cette instruction: );
        );
// Ligne 60: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 61: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 62: Execute cette instruction: // Erreur
    // Erreur
// Ligne 63: Applique une condition pour brancher le flux d execution.
    if (error) {
// Ligne 64: Commence le JSX retourne pour l affichage de l interface.
        return (
// Ligne 65: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="product-list-error">
// Ligne 66: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="error-container">
// Ligne 67: Ouvre un element JSX qui compose l interface utilisateur.
                    <h3> Une erreur est survenue</h3>
// Ligne 68: Ouvre un element JSX qui compose l interface utilisateur.
                    <p>{error}</p>
// Ligne 69: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 70: Associe une action JavaScript a un clic utilisateur.
                        onClick={() => window.location.reload()}
// Ligne 71: Effectue une affectation ou initialise une valeur.
                        className="retry-button"
// Ligne 72: Execute cette instruction: >
                    >
// Ligne 73: Execute cette instruction: Réessayer
                        Réessayer
// Ligne 74: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 75: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 76: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 77: Execute cette instruction: );
        );
// Ligne 78: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 79: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 80: Execute cette instruction: // Affichage normal (si tout est OK)
    // Affichage normal (si tout est OK)
// Ligne 81: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 82: Ouvre un element JSX qui compose l interface utilisateur.
        <div>
// Ligne 83: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="product-list">
// Ligne 84: Parcourt une collection pour generer une liste d elements.
                {produits?.map((produit) => (
// Ligne 85: Declare un element JSX auto-fermante (sans enfants).
                    <ProductCard key={produit.id_article} produit={produit}/>
// Ligne 86: Execute cette instruction: ))}
                ))}
// Ligne 87: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 88: Ferme un element JSX dans l arborescence du rendu.
        </div>
// Ligne 89: Execute cette instruction: );
    );
// Ligne 90: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 91: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 92: Expose ce composant comme export par defaut du fichier.
export default ProductList;
// Ligne 93: Ligne vide pour aerer le code et separer les blocs logiques.
