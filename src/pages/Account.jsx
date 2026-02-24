import React, { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const ordersStorageKey = "cafthe_orders";
const addressesStorageKey = "cafthe_addresses";
const profileStorageKey = "cafthe_profile";
const passwordStorageKey = "cafthe_profile_password";

const loadJson = (key, fallback = []) => {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
};

const Account = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, loading } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("orders");
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [addressForm, setAddressForm] = useState({
        label: "",
        street: "",
        postal: "",
        city: "",
    });
    const [profileForm, setProfileForm] = useState({
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
    });
    const [profileMessage, setProfileMessage] = useState("");
    const [passwordForm, setPasswordForm] = useState({
        current: "",
        next: "",
        confirm: "",
    });
    const [passwordMessage, setPasswordMessage] = useState("");

    useEffect(() => {
        setOrders(loadJson(ordersStorageKey, []));
        setAddresses(loadJson(addressesStorageKey, []));
        const savedProfile = loadJson(profileStorageKey, null);
        if (savedProfile) {
            setProfileForm(savedProfile);
        } else {
            setProfileForm({
                prenom: user?.prenom ?? "",
                nom: user?.nom ?? "",
                email: user?.email ?? "",
                telephone: "+33 6 00 00 00 00",
                adresse_facturation: "",
                adresse_livraison: "",
            });
        }
    }, [user?.email, user?.nom, user?.prenom]);

    const displayName = useMemo(() => {
        const fromProfile = `${profileForm.prenom ?? ""} ${profileForm.nom ?? ""}`.trim();
        if (fromProfile) return fromProfile;
        const fromUser = `${user?.prenom ?? ""} ${user?.nom ?? ""}`.trim();
        return fromUser || "Client";
    }, [profileForm.nom, profileForm.prenom, user?.nom, user?.prenom]);

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const handleSaveAddress = (event) => {
        event.preventDefault();
        if (!addressForm.label || !addressForm.street) return;

        const next = editingAddressId
            ? addresses.map((addr) =>
                  addr.id === editingAddressId ? { ...addr, ...addressForm } : addr
              )
            : [
                  ...addresses,
                  {
                      id: Date.now().toString(),
                      ...addressForm,
                      isDefault: addresses.length === 0,
                  },
              ];

        setAddresses(next);
        localStorage.setItem(addressesStorageKey, JSON.stringify(next));
        setIsAddressFormOpen(false);
        setEditingAddressId(null);
        setAddressForm({ label: "", street: "", postal: "", city: "" });
    };

    const handleEditAddress = (address) => {
        setEditingAddressId(address.id);
        setAddressForm({
            label: address.label,
            street: address.street,
            postal: address.postal,
            city: address.city,
        });
        setIsAddressFormOpen(true);
    };

    const handleDeleteAddress = (id) => {
        const next = addresses.filter((addr) => addr.id !== id);
        setAddresses(next);
        localStorage.setItem(addressesStorageKey, JSON.stringify(next));
    };

    const handleSaveProfile = (event) => {
        event.preventDefault();
        localStorage.setItem(profileStorageKey, JSON.stringify(profileForm));
        setProfileMessage("Informations personnelles mises à jour.");
    };

    const handleSavePassword = (event) => {
        event.preventDefault();
        const currentSaved = localStorage.getItem(passwordStorageKey) || "client-demo-1234";
        if (passwordForm.current !== currentSaved) {
            setPasswordMessage("Mot de passe actuel incorrect.");
            return;
        }
        if (passwordForm.next.length < 8) {
            setPasswordMessage("Le nouveau mot de passe doit contenir au moins 8 caractères.");
            return;
        }
        if (passwordForm.next !== passwordForm.confirm) {
            setPasswordMessage("La confirmation ne correspond pas.");
            return;
        }
        localStorage.setItem(passwordStorageKey, passwordForm.next);
        setPasswordMessage("Mot de passe modifié avec succès.");
        setPasswordForm({ current: "", next: "", confirm: "" });
    };

    const currentOrder = orders.find((order) => order.status !== "Livrée");

    return (
        <main className="account-page">
            <div className="breadcrumb">Accueil / Mon compte</div>
            <h1>Mon compte</h1>

            <div className="account-layout">
                <aside className="account-sidebar">
                    <div className="account-profile">
                        <div className="account-avatar">
                            <img
                                src="/wallpapersden.com_dragon-ball-super-hd-vegeta-ultra-ego_2500x1400.jpg"
                                alt="Avatar compte"
                            />
                        </div>
                        <div>
                            <div className="account-name">{displayName}</div>
                            <div className="account-email">
                                {profileForm.email || user?.email || "client@cafthe.com"}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className={activeTab === "orders" ? "active" : ""}
                        onClick={() => setActiveTab("orders")}
                    >
                        Mes commandes
                    </button>
                    <button
                        type="button"
                        className={activeTab === "addresses" ? "active" : ""}
                        onClick={() => setActiveTab("addresses")}
                    >
                        Mes adresses
                    </button>
                    <button
                        type="button"
                        className={activeTab === "profile" ? "active" : ""}
                        onClick={() => setActiveTab("profile")}
                    >
                        Informations personnelles
                    </button>
                    <button
                        type="button"
                        className={activeTab === "settings" ? "active" : ""}
                        onClick={() => setActiveTab("settings")}
                    >
                        Paramètres
                    </button>
                </aside>

                <section className="account-content">
                    {activeTab === "orders" && (
                        <div className="account-panel">
                            <h2>Mes commandes</h2>
                            <div className="orders-list">
                                {orders.length === 0 ? (
                                    <p>Aucune commande pour le moment.</p>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order.id} className="order-card">
                                            <div>
                                                <div className="order-id">Commande {order.id}</div>
                                                <div className="order-meta">
                                                    {order.items.length} articles
                                                </div>
                                            </div>
                                            <div className="order-info">
                                                <span>{order.date}</span>
                                                <span>{order.total.toFixed(2)} €</span>
                                                <span
                                                    className={`order-status ${
                                                        order.status === "Livrée"
                                                            ? "delivered"
                                                            : "pending"
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate(`/profil/commande/${order.id}`)
                                                }
                                            >
                                                Voir les détails
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="order-tracking">
                                <h3>Suivi de commande en cours</h3>
                                <div className="tracking-steps">
                                    <span className="done">Commande validée</span>
                                    <span className="done">En préparation</span>
                                    <span
                                        className={
                                            currentOrder?.status === "Expédiée" ||
                                            currentOrder?.status === "Livrée"
                                                ? "done"
                                                : ""
                                        }
                                    >
                                        Expédiée
                                    </span>
                                    <span
                                        className={
                                            currentOrder?.status === "Livrée" ? "done" : ""
                                        }
                                    >
                                        Livrée
                                    </span>
                                </div>
                                <p>
                                    {currentOrder
                                        ? `Commande ${currentOrder.id} actuellement "${currentOrder.status}".`
                                        : "Aucune commande en cours."}
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === "addresses" && (
                        <div className="account-panel">
                            <div className="panel-header">
                                <h2>Mes adresses</h2>
                                <button
                                    type="button"
                                    className="primary"
                                    onClick={() => {
                                        setEditingAddressId(null);
                                        setAddressForm({
                                            label: "",
                                            street: "",
                                            postal: "",
                                            city: "",
                                        });
                                        setIsAddressFormOpen((open) => !open);
                                    }}
                                >
                                    + Ajouter une adresse
                                </button>
                            </div>

                            {isAddressFormOpen && (
                                <form className="address-form" onSubmit={handleSaveAddress}>
                                    <div className="form-row">
                                        <label>
                                            Libellé
                                            <input
                                                type="text"
                                                value={addressForm.label}
                                                onChange={(event) =>
                                                    setAddressForm({
                                                        ...addressForm,
                                                        label: event.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </label>
                                        <label>
                                            Ville
                                            <input
                                                type="text"
                                                value={addressForm.city}
                                                onChange={(event) =>
                                                    setAddressForm({
                                                        ...addressForm,
                                                        city: event.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </label>
                                    </div>
                                    <label>
                                        Adresse
                                        <input
                                            type="text"
                                            value={addressForm.street}
                                            onChange={(event) =>
                                                setAddressForm({
                                                    ...addressForm,
                                                    street: event.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </label>
                                    <label>
                                        Code postal
                                        <input
                                            type="text"
                                            value={addressForm.postal}
                                            onChange={(event) =>
                                                setAddressForm({
                                                    ...addressForm,
                                                    postal: event.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </label>
                                    <div className="form-actions">
                                        <button
                                            type="button"
                                            className="ghost"
                                            onClick={() => setIsAddressFormOpen(false)}
                                        >
                                            Annuler
                                        </button>
                                        <button type="submit" className="primary">
                                            {editingAddressId ? "Mettre à jour" : "Enregistrer"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="address-grid">
                                {addresses.map((address) => (
                                    <div key={address.id} className="address-card">
                                        {address.isDefault && (
                                            <div className="address-tag">Par défaut</div>
                                        )}
                                        <h4>{address.label}</h4>
                                        <p>{address.street}</p>
                                        <p>
                                            {address.postal} {address.city}
                                        </p>
                                        <div className="address-actions">
                                            <button
                                                type="button"
                                                onClick={() => handleEditAddress(address)}
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                type="button"
                                                className="danger"
                                                onClick={() => handleDeleteAddress(address.id)}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "profile" && (
                        <div className="account-panel">
                            <h2>Informations personnelles</h2>
                            <form className="profile-form" onSubmit={handleSaveProfile}>
                                <div className="form-row">
                                    <label>
                                        Prénom
                                        <input
                                            type="text"
                                            value={profileForm.prenom}
                                            onChange={(event) =>
                                                setProfileForm({
                                                    ...profileForm,
                                                    prenom: event.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                    <label>
                                        Nom
                                        <input
                                            type="text"
                                            value={profileForm.nom}
                                            onChange={(event) =>
                                                setProfileForm({
                                                    ...profileForm,
                                                    nom: event.target.value,
                                                })
                                            }
                                        />
                                    </label>
                                </div>
                                <label>
                                    Email
                                    <input
                                        type="email"
                                        value={profileForm.email}
                                        onChange={(event) =>
                                            setProfileForm({
                                                ...profileForm,
                                                email: event.target.value,
                                            })
                                        }
                                    />
                                </label>
                                <label>
                                    Téléphone
                                    <input
                                        type="tel"
                                        value={profileForm.telephone}
                                        onChange={(event) =>
                                            setProfileForm({
                                                ...profileForm,
                                                telephone: event.target.value,
                                            })
                                        }
                                    />
                                </label>
                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="ghost"
                                        onClick={() =>
                                            setProfileForm({
                                                prenom: user?.prenom ?? "",
                                                nom: user?.nom ?? "",
                                                email: user?.email ?? "",
                                                telephone: profileForm.telephone,
                                            })
                                        }
                                    >
                                        Réinitialiser
                                    </button>
                                    <button type="submit" className="primary">
                                        Enregistrer les modifications
                                    </button>
                                </div>
                            </form>
                            {profileMessage && (
                                <p className="form-feedback success">{profileMessage}</p>
                            )}

                            <h3>Changer le mot de passe</h3>
                            <form className="profile-form" onSubmit={handleSavePassword}>
                                <label>
                                    Mot de passe actuel
                                    <input
                                        type="password"
                                        value={passwordForm.current}
                                        onChange={(event) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                current: event.target.value,
                                            })
                                        }
                                        required
                                    />
                                </label>
                                <label>
                                    Nouveau mot de passe
                                    <input
                                        type="password"
                                        value={passwordForm.next}
                                        onChange={(event) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                next: event.target.value,
                                            })
                                        }
                                        required
                                    />
                                </label>
                                <label>
                                    Confirmer le mot de passe
                                    <input
                                        type="password"
                                        value={passwordForm.confirm}
                                        onChange={(event) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                confirm: event.target.value,
                                            })
                                        }
                                        required
                                    />
                                </label>
                                <div className="form-actions">
                                    <button type="submit" className="primary">
                                        Mettre à jour le mot de passe
                                    </button>
                                </div>
                            </form>
                            {passwordMessage && (
                                <p
                                    className={`form-feedback ${
                                        passwordMessage.includes("succès")
                                            ? "success"
                                            : "error"
                                    }`}
                                >
                                    {passwordMessage}
                                </p>
                            )}
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className="account-panel">
                            <h2>Paramètres</h2>
                            <p className="panel-subtitle">
                                Gérez vos préférences et la sécurité de votre compte.
                            </p>
                            <div className="settings-list">
                                {[
                                    {
                                        title: "Notifications",
                                        subtitle:
                                            "Gérer les emails et les alertes de commande.",
                                    },
                                    {
                                        title: "Confidentialité et Sécurité",
                                        subtitle:
                                            "Modifier le mot de passe et les accès du compte.",
                                    },
                                    {
                                        title: "Langue et Région",
                                        subtitle:
                                            "Sélectionnez votre langue et fuseau horaire préférés.",
                                        value: "Français (FR)",
                                    },
                                    {
                                        title: "Apparence",
                                        subtitle: "Personnaliser l'affichage de l'interface.",
                                    },
                                    {
                                        title: "Aide et Support",
                                        subtitle: "FAQ, contact et assistance.",
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="settings-item">
                                        <div>
                                            <div className="settings-title">{item.title}</div>
                                            <div className="settings-subtitle">
                                                {item.subtitle}
                                            </div>
                                        </div>
                                        <div className="settings-value">
                                            {item.value ?? "›"}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="settings-save">
                                Sauvegarder les changements
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Account;
