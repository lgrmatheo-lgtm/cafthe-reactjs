// Fichier annote automatiquement pour revision junior: src\pages\Login.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Login.jsx
 * @file Login.jsx
// Ligne 3: Execute cette instruction: * Role: Connexion utilisateur.
 * Role: Connexion utilisateur.
// Ligne 4: Execute cette instruction: * Comment c est fait: Soumet les identifiants, gere erreurs de login et redirige en cas de succes.
 * Comment c est fait: Soumet les identifiants, gere erreurs de login et redirige en cas de succes.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useContext, useState } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import { AuthContext } from "../context/authContext.jsx";
// Ligne 9: Importe un module necessaire au composant ou a sa logique.
import { Link, useNavigate } from "react-router-dom";
// Ligne 10: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 11: Declare une variable locale utilisee par le composant.
const Login = () => {
// Ligne 12: Declare une variable locale utilisee par le composant.
    const { login } = useContext(AuthContext);
// Ligne 13: Declare une variable locale utilisee par le composant.
    const navigate = useNavigate();
// Ligne 14: Declare une variable locale utilisee par le composant.
    const [email, setEmail] = useState("");
// Ligne 15: Declare une variable locale utilisee par le composant.
    const [motDePasse, setMotDePasse] = useState("");
// Ligne 16: Declare une variable locale utilisee par le composant.
    const [errorMsg, setErrorMsg] = useState("");
// Ligne 17: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 18: Declare une variable locale utilisee par le composant.
    const handleSubmit = async (e) => {
// Ligne 19: Execute cette instruction: e.preventDefault();
        e.preventDefault();
// Ligne 20: Execute cette instruction: setErrorMsg("");
        setErrorMsg("");
// Ligne 21: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 22: Ouvre un bloc de code ou une structure de donnees.
        try {
// Ligne 23: Declare une variable locale utilisee par le composant.
            const response = await fetch(
// Ligne 24: Execute cette instruction: `${import.meta.env.VITE_API_URL}/api/clients/login`,
                `${import.meta.env.VITE_API_URL}/api/clients/login`,
// Ligne 25: Ouvre un bloc de code ou une structure de donnees.
                {
// Ligne 26: Execute cette instruction: method: "POST",
                    method: "POST",
// Ligne 27: Execute cette instruction: headers: { "Content-Type": "application/json" },
                    headers: { "Content-Type": "application/json" },
// Ligne 28: Execute cette instruction: credentials: "include",
                    credentials: "include",
// Ligne 29: Ouvre un bloc de code ou une structure de donnees.
                    body: JSON.stringify({
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
// Ligne 39: Execute cette instruction: setErrorMsg(data.message || "Erreur de connexion");
                setErrorMsg(data.message || "Erreur de connexion");
// Ligne 40: Execute cette instruction: return;
                return;
// Ligne 41: Ferme un bloc de code ou une structure de donnees.
            }
// Ligne 42: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 43: Execute cette instruction: login(data.client);
            login(data.client);
// Ligne 44: Declenche une navigation vers une autre route de l application.
            navigate("/");
// Ligne 45: Ouvre un bloc de code ou une structure de donnees.
        } catch (error) {
// Ligne 46: Execute cette instruction: console.error("Erreur lors de la connexion: ", error);
            console.error("Erreur lors de la connexion: ", error);
// Ligne 47: Execute cette instruction: setErrorMsg("Une erreur s'est produite lors de la connexion");
            setErrorMsg("Une erreur s'est produite lors de la connexion");
// Ligne 48: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 49: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 50: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 51: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 52: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="auth-page">
// Ligne 53: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="auth-card">
// Ligne 54: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="auth-visual auth-visual-tea">
// Ligne 55: Ouvre un element JSX qui compose l interface utilisateur.
                    <div>
// Ligne 56: Ouvre un element JSX qui compose l interface utilisateur.
                        <h2>Le goût de l'excellence,<br />chaque matin.</h2>
// Ligne 57: Ouvre un element JSX qui compose l interface utilisateur.
                        <p>Retrouvez vos favoris et suivez vos commandes en un clin d'œil.</p>
// Ligne 58: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 59: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 60: Ouvre un element JSX qui compose l interface utilisateur.
                <div className="auth-form">
// Ligne 61: Ouvre un element JSX qui compose l interface utilisateur.
                    <h1>Bon retour</h1>
// Ligne 62: Ouvre un element JSX qui compose l interface utilisateur.
                    <p className="auth-subtitle">Connectez-vous pour accéder à votre espace.</p>
// Ligne 63: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 64: Ouvre un element JSX qui compose l interface utilisateur.
                    <form onSubmit={handleSubmit}>
// Ligne 65: Ouvre un element JSX qui compose l interface utilisateur.
                        <label>
// Ligne 66: Execute cette instruction: Email
                            Email
// Ligne 67: Ouvre un element JSX qui compose l interface utilisateur.
                            <input
// Ligne 68: Effectue une affectation ou initialise une valeur.
                                type="email"
// Ligne 69: Effectue une affectation ou initialise une valeur.
                                value={email}
// Ligne 70: Execute cette instruction: required
                                required
// Ligne 71: Effectue une affectation ou initialise une valeur.
                                placeholder="votre@email.com"
// Ligne 72: Associe une reaction a la modification d un champ de formulaire.
                                onChange={(e) => setEmail(e.target.value)}
// Ligne 73: Execute cette instruction: />
                            />
// Ligne 74: Ferme un element JSX dans l arborescence du rendu.
                        </label>
// Ligne 75: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 76: Ouvre un element JSX qui compose l interface utilisateur.
                        <label>
// Ligne 77: Execute cette instruction: Mot de passe
                            Mot de passe
// Ligne 78: Ouvre un element JSX qui compose l interface utilisateur.
                            <input
// Ligne 79: Effectue une affectation ou initialise une valeur.
                                type="password"
// Ligne 80: Effectue une affectation ou initialise une valeur.
                                value={motDePasse}
// Ligne 81: Execute cette instruction: required
                                required
// Ligne 82: Effectue une affectation ou initialise une valeur.
                                placeholder="Mot de passe"
// Ligne 83: Associe une reaction a la modification d un champ de formulaire.
                                onChange={(e) => setMotDePasse(e.target.value)}
// Ligne 84: Execute cette instruction: />
                            />
// Ligne 85: Ferme un element JSX dans l arborescence du rendu.
                        </label>
// Ligne 86: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 87: Effectue une affectation ou initialise une valeur.
                        {errorMsg && <div className="error-message">{errorMsg}</div>}
// Ligne 88: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 89: Ouvre un element JSX qui compose l interface utilisateur.
                        <button type="submit" className="auth-submit">
// Ligne 90: Execute cette instruction: Se connecter →
                            Se connecter →
// Ligne 91: Ferme un element JSX dans l arborescence du rendu.
                        </button>
// Ligne 92: Ferme un element JSX dans l arborescence du rendu.
                    </form>
// Ligne 93: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 94: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="auth-divider">ou</div>
// Ligne 95: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="auth-footer">
// Ligne 96: Effectue une affectation ou initialise une valeur.
                        Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
// Ligne 97: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 98: Ferme un element JSX dans l arborescence du rendu.
                </div>
// Ligne 99: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 100: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 101: Execute cette instruction: );
    );
// Ligne 102: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 103: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 104: Expose ce composant comme export par defaut du fichier.
export default Login;
// Ligne 105: Ligne vide pour aerer le code et separer les blocs logiques.
