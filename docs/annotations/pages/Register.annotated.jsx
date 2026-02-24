// Fichier annote automatiquement pour revision junior: src\pages\Register.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Register.jsx
 * @file Register.jsx
// Ligne 3: Execute cette instruction: * Role: Inscription utilisateur.
 * Role: Inscription utilisateur.
// Ligne 4: Execute cette instruction: * Comment c est fait: Valide le formulaire de creation de compte puis enchaine vers connexion ou espace client.
 * Comment c est fait: Valide le formulaire de creation de compte puis enchaine vers connexion ou espace client.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useState } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import { Link, useNavigate } from "react-router-dom";
// Ligne 9: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 10: Declare une variable locale utilisee par le composant.
const Register = () => {
// Ligne 11: Declare une variable locale utilisee par le composant.
    const navigate = useNavigate();
// Ligne 12: Declare une variable locale utilisee par le composant.
    const [nomComplet, setNomComplet] = useState("");
// Ligne 13: Declare une variable locale utilisee par le composant.
    const [email, setEmail] = useState("");
// Ligne 14: Declare une variable locale utilisee par le composant.
    const [motDePasse, setMotDePasse] = useState("");
// Ligne 15: Declare une variable locale utilisee par le composant.
    const [errorMsg, setErrorMsg] = useState("");
// Ligne 16: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 17: Declare une variable locale utilisee par le composant.
    const handleSubmit = async (e) => {
// Ligne 18: Execute cette instruction: e.preventDefault();
        e.preventDefault();
// Ligne 19: Execute cette instruction: setErrorMsg("");
        setErrorMsg("");
// Ligne 20: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
        try {
// Ligne 22: Declare une variable locale utilisee par le composant.
            const response = await fetch(
// Ligne 23: Execute cette instruction: `${import.meta.env.VITE_API_URL}/api/clients/register`,
                `${import.meta.env.VITE_API_URL}/api/clients/register`,
// Ligne 24: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 25: Execute cette instruction: method: "POST",
                    method: "POST",
// Ligne 26: Execute cette instruction: headers: { "Content-Type": "application/json" },
                    headers: { "Content-Type": "application/json" },
// Ligne 27: Execute cette instruction: credentials: "include",
                    credentials: "include",
// Ligne 28: Ouvre un bloc de code ou une structure de donnees.
                    body: JSON.stringify({
// Ligne 29: Execute cette instruction: nom: nomComplet,
                        nom: nomComplet,
// Ligne 30: Execute cette instruction: email,
                        email,
// Ligne 31: Execute cette instruction: mot_de_passe: motDePasse,
                        mot_de_passe: motDePasse,
// Ligne 32: Ferme un bloc de code ou une structure de donnees.
                    }),
// Ligne 33: Ferme un bloc de code ou une structure de donnees.
                },
// Ligne 34: Execute cette instruction: );
            );
// Ligne 35: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 36: Declare une variable locale utilisee par le composant.
            const data = await response.json();
// Ligne 37: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 38: Applique une condition pour brancher le flux d execution.
            if (!response.ok) {
// Ligne 39: Execute cette instruction: setErrorMsg(data.message || "Erreur d'inscription");
                setErrorMsg(data.message || "Erreur d'inscription");
// Ligne 40: Execute cette instruction: return;
                return;
// Ligne 41: Ferme un bloc de code ou une structure de donnees.
            }
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 43: Declenche une navigation vers une autre route de l application.
            navigate("/login");
// Ligne 44: Ouvre un bloc de code ou une structure de donnees.
        } catch (error) {
// Ligne 45: Execute cette instruction: console.error("Erreur lors de l'inscription: ", error);
            console.error("Erreur lors de l'inscription: ", error);
// Ligne 46: Execute cette instruction: setErrorMsg("Une erreur s'est produite lors de l'inscription");
            setErrorMsg("Une erreur s'est produite lors de l'inscription");
// Ligne 47: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 48: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 49: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 50: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 51: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="auth-page">
// Ligne 52: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="auth-card">
// Ligne 53: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="auth-form">
// Ligne 54: Ouvre un element JSX qui compose l interface utilisateur.
                    <h1>Créer un compte</h1>
// Ligne 55: Ouvre un element JSX qui compose l interface utilisateur.
                    <p className="auth-subtitle">Rejoignez la communauté CafThé.</p>
// Ligne 56: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 57: Ouvre un element JSX qui compose l interface utilisateur.
                    <form onSubmit={handleSubmit}>
// Ligne 58: Ouvre un element JSX qui compose l interface utilisateur.
                        <label>
// Ligne 59: Execute cette instruction: Nom complet
                            Nom complet
// Ligne 60: Ouvre un element JSX qui compose l interface utilisateur.
                            <input
// Ligne 61: Effectue une affectation ou initialise une valeur.
                                type="text"
// Ligne 62: Effectue une affectation ou initialise une valeur.
                                value={nomComplet}
// Ligne 63: Execute cette instruction: required
                                required
// Ligne 64: Effectue une affectation ou initialise une valeur.
                                placeholder="Jean Dupont"
// Ligne 65: Associe une reaction a la modification d un champ de formulaire.
                                onChange={(e) => setNomComplet(e.target.value)}
// Ligne 66: Execute cette instruction: />
                            />
// Ligne 67: Ferme un element JSX dans l arborescence du rendu.
                        </label>
// Ligne 68: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 69: Ouvre un element JSX qui compose l interface utilisateur.
                        <label>
// Ligne 70: Execute cette instruction: Email
                            Email
// Ligne 71: Ouvre un element JSX qui compose l interface utilisateur.
                            <input
// Ligne 72: Effectue une affectation ou initialise une valeur.
                                type="email"
// Ligne 73: Effectue une affectation ou initialise une valeur.
                                value={email}
// Ligne 74: Execute cette instruction: required
                                required
// Ligne 75: Effectue une affectation ou initialise une valeur.
                                placeholder="votre@email.com"
// Ligne 76: Associe une reaction a la modification d un champ de formulaire.
                                onChange={(e) => setEmail(e.target.value)}
// Ligne 77: Execute cette instruction: />
                            />
// Ligne 78: Ferme un element JSX dans l arborescence du rendu.
                        </label>
// Ligne 79: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 80: Ouvre un element JSX qui compose l interface utilisateur.
                        <label>
// Ligne 81: Execute cette instruction: Mot de passe
                            Mot de passe
// Ligne 82: Ouvre un element JSX qui compose l interface utilisateur.
                            <input
// Ligne 83: Effectue une affectation ou initialise une valeur.
                                type="password"
// Ligne 84: Effectue une affectation ou initialise une valeur.
                                value={motDePasse}
// Ligne 85: Execute cette instruction: required
                                required
// Ligne 86: Effectue une affectation ou initialise une valeur.
                                placeholder="••••••••"
// Ligne 87: Associe une reaction a la modification d un champ de formulaire.
                                onChange={(e) => setMotDePasse(e.target.value)}
// Ligne 88: Execute cette instruction: />
                            />
// Ligne 89: Ouvre un element JSX qui compose l interface utilisateur.
                            <span className="auth-hint">Au moins 8 caractères</span>
// Ligne 90: Ferme un element JSX dans l arborescence du rendu.
                        </label>
// Ligne 91: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 92: Effectue une affectation ou initialise une valeur.
                        {errorMsg && <div className="error-message">{errorMsg}</div>}
// Ligne 93: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 94: Ouvre un element JSX qui compose l interface utilisateur.
                        <button type="submit" className="auth-submit">
// Ligne 95: Execute cette instruction: S'inscrire →
                            S'inscrire →
// Ligne 96: Ferme un element JSX dans l arborescence du rendu.
                        </button>
// Ligne 97: Ferme un element JSX dans l arborescence du rendu.
                    </form>
// Ligne 98: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 99: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="auth-divider">ou</div>
// Ligne 100: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="auth-footer">
// Ligne 101: Effectue une affectation ou initialise une valeur.
                        Déjà inscrit ? <Link to="/login">Se connecter</Link>
// Ligne 102: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 103: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 104: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="auth-visual auth-visual-matcha">
// Ligne 105: Ouvre un element JSX qui compose l interface utilisateur.
                    <div>
// Ligne 106: Ouvre un element JSX qui compose l interface utilisateur.
                        <h2>Rejoignez le cercle<br />des initiés.</h2>
// Ligne 107: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Offres exclusives, ventes privées et découvertes en avant-première.</p>
// Ligne 108: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 109: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 110: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 111: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 112: Execute cette instruction: );
    );
// Ligne 113: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 114: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 115: Expose ce composant comme export par defaut du fichier.
export default Register;
// Ligne 116: Ligne vide pour aerer le code et separer les blocs logiques.
