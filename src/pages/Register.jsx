/**
 * @file Register.jsx
 * Role: Inscription utilisateur.
 * Comment c est fait: Valide le formulaire de creation de compte puis enchaine vers connexion ou espace client.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
    const navigate = useNavigate();
    const [nomComplet, setNomComplet] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [acceptePolConf, setAcceptePolConf] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!acceptePolConf) {
            setErrorMsg("Vous devez accepter la politique de confidentialité.");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/clients/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        nom: nomComplet,
                        email,
                        mot_de_passe: motDePasse,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Erreur d'inscription");
                return;
            }

            navigate("/login");
        } catch (error) {
            console.error("Erreur lors de l'inscription: ", error);
            setErrorMsg("Une erreur s'est produite lors de l'inscription");
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-card">
                <div className="auth-form">
                    <h1>Créer un compte</h1>
                    <p className="auth-subtitle">Rejoignez la communauté CafThé.</p>

                    <form onSubmit={handleSubmit}>
                        <label>
                            Nom complet
                            <input
                                type="text"
                                value={nomComplet}
                                required
                                placeholder="Jean Dupont"
                                onChange={(e) => setNomComplet(e.target.value)}
                            />
                        </label>

                        <label>
                            Email
                            <input
                                type="email"
                                value={email}
                                required
                                placeholder="votre@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label>
                            Mot de passe
                            <input
                                type="password"
                                value={motDePasse}
                                required
                                placeholder="••••••••"
                                onChange={(e) => setMotDePasse(e.target.value)}
                            />
                            <span className="auth-hint">Au moins 12 caractères</span>
                        </label>
                        <Link to="/contact" className="auth-forgot">
                            Mot de passe oublié ?
                        </Link>

                        <div className="auth-checkbox">
                            <input
                                type="checkbox"
                                id="polConf"
                                checked={acceptePolConf}
                                onChange={(e) => setAcceptePolConf(e.target.checked)}
                            />
                            <label htmlFor="polConf">
                                
                                <Link to="/privacy" target="_blank">
                                 J'accepte la politique de confidentialité
                                </Link>
                            </label>
                        </div>

                        {errorMsg && <div className="error-message">{errorMsg}</div>}

                        <button type="submit" className="auth-submit" disabled={!acceptePolConf}>
                            S'inscrire →
                        </button>
                    </form>

                    <div className="auth-divider">ou</div>
                    <div className="auth-footer">
                        Déjà inscrit ? <Link to="/login">Se connecter</Link>
                    </div>
                </div>
                <div className="auth-visual auth-visual-matcha">
                    <div>
                        <h2>Rejoignez le cercle<br />des initiés.</h2>
                        <p>Offres exclusives, ventes privées et découvertes en avant-première.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;


