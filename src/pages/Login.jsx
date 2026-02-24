/**
 * @file Login.jsx
 * Role: Connexion utilisateur.
 * Comment c est fait: Soumet les identifiants, gere erreurs de login et redirige en cas de succes.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/clients/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        email,
                        mot_de_passe: motDePasse,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Erreur de connexion");
                return;
            }

            login(data.client);
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la connexion: ", error);
            setErrorMsg("Une erreur s'est produite lors de la connexion");
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-card">
                <div className="auth-visual auth-visual-tea">
                    <div>
                        <h2>Le goût de l'excellence,<br />chaque matin.</h2>
                        <p>Retrouvez vos favoris et suivez vos commandes en un clin d'œil.</p>
                    </div>
                </div>
                <div className="auth-form">
                    <h1>Bon retour</h1>
                    <p className="auth-subtitle">Connectez-vous pour accéder à votre espace.</p>

                    <form onSubmit={handleSubmit}>
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
                                placeholder="Mot de passe"
                                onChange={(e) => setMotDePasse(e.target.value)}
                            />
                        </label>

                        {errorMsg && <div className="error-message">{errorMsg}</div>}

                        <button type="submit" className="auth-submit">
                            Se connecter →
                        </button>
                    </form>

                    <div className="auth-divider">ou</div>
                    <div className="auth-footer">
                        Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
