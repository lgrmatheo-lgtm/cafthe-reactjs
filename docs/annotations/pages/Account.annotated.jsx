// Fichier annote automatiquement pour revision junior: src\pages\Account.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Account.jsx
 * @file Account.jsx
// Ligne 3: Execute cette instruction: * Role: Espace client personnel.
 * Role: Espace client personnel.
// Ligne 4: Execute cette instruction: * Comment c est fait: Centralise commandes, adresses, profil et mot de passe avec persistance locale.
 * Comment c est fait: Centralise commandes, adresses, profil et mot de passe avec persistance locale.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useContext, useEffect, useMemo, useState } from "react";
// Ligne 8: Importe un module necessaire au composant ou a sa logique.
import { Navigate, useNavigate } from "react-router-dom";
// Ligne 9: Importe un module necessaire au composant ou a sa logique.
import { AuthContext } from "../context/authContext.jsx";
// Ligne 10: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 11: Declare une variable locale utilisee par le composant.
const ordersStorageKey = "cafthe_orders";
// Ligne 12: Declare une variable locale utilisee par le composant.
const addressesStorageKey = "cafthe_addresses";
// Ligne 13: Declare une variable locale utilisee par le composant.
const profileStorageKey = "cafthe_profile";
// Ligne 14: Declare une variable locale utilisee par le composant.
const passwordStorageKey = "cafthe_profile_password";
// Ligne 15: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 16: Declare une variable locale utilisee par le composant.
const loadJson = (key, fallback = []) => {
// Ligne 17: Ouvre un bloc de code ou une structure de donnees.
    try {
// Ligne 18: Declare une variable locale utilisee par le composant.
        const raw = localStorage.getItem(key);
// Ligne 19: Applique une condition pour brancher le flux d execution.
        if (!raw) return fallback;
// Ligne 20: Retourne une valeur depuis la fonction en cours.
        return JSON.parse(raw);
// Ligne 21: Ouvre un bloc de code ou une structure de donnees.
    } catch {
// Ligne 22: Retourne une valeur depuis la fonction en cours.
        return fallback;
// Ligne 23: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 24: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 25: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 26: Declare une variable locale utilisee par le composant.
const Account = () => {
// Ligne 27: Declare une variable locale utilisee par le composant.
    const navigate = useNavigate();
// Ligne 28: Declare une variable locale utilisee par le composant.
    const { user, isAuthenticated, loading } = useContext(AuthContext);
// Ligne 29: Declare une variable locale utilisee par le composant.
    const [activeTab, setActiveTab] = useState("orders");
// Ligne 30: Declare une variable locale utilisee par le composant.
    const [orders, setOrders] = useState([]);
// Ligne 31: Declare une variable locale utilisee par le composant.
    const [addresses, setAddresses] = useState([]);
// Ligne 32: Declare une variable locale utilisee par le composant.
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
// Ligne 33: Declare une variable locale utilisee par le composant.
    const [editingAddressId, setEditingAddressId] = useState(null);
// Ligne 34: Declare une variable locale utilisee par le composant.
    const [addressForm, setAddressForm] = useState({
// Ligne 35: Execute cette instruction: label: "",
        label: "",
// Ligne 36: Execute cette instruction: street: "",
        street: "",
// Ligne 37: Execute cette instruction: postal: "",
        postal: "",
// Ligne 38: Execute cette instruction: city: "",
        city: "",
// Ligne 39: Ferme un bloc de code ou une structure de donnees.
    });
// Ligne 40: Declare une variable locale utilisee par le composant.
    const [profileForm, setProfileForm] = useState({
// Ligne 41: Execute cette instruction: prenom: "",
        prenom: "",
// Ligne 42: Execute cette instruction: nom: "",
        nom: "",
// Ligne 43: Execute cette instruction: email: "",
        email: "",
// Ligne 44: Execute cette instruction: telephone: "",
        telephone: "",
// Ligne 45: Ferme un bloc de code ou une structure de donnees.
    });
// Ligne 46: Declare une variable locale utilisee par le composant.
    const [profileMessage, setProfileMessage] = useState("");
// Ligne 47: Declare une variable locale utilisee par le composant.
    const [passwordForm, setPasswordForm] = useState({
// Ligne 48: Execute cette instruction: current: "",
        current: "",
// Ligne 49: Execute cette instruction: next: "",
        next: "",
// Ligne 50: Execute cette instruction: confirm: "",
        confirm: "",
// Ligne 51: Ferme un bloc de code ou une structure de donnees.
    });
// Ligne 52: Declare une variable locale utilisee par le composant.
    const [passwordMessage, setPasswordMessage] = useState("");
// Ligne 53: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 54: Declare une fonction (handler, utilitaire ou composant).
    useEffect(() => {
// Ligne 55: Execute cette instruction: setOrders(loadJson(ordersStorageKey, []));
        setOrders(loadJson(ordersStorageKey, []));
// Ligne 56: Execute cette instruction: setAddresses(loadJson(addressesStorageKey, []));
        setAddresses(loadJson(addressesStorageKey, []));
// Ligne 57: Declare une variable locale utilisee par le composant.
        const savedProfile = loadJson(profileStorageKey, null);
// Ligne 58: Applique une condition pour brancher le flux d execution.
        if (savedProfile) {
// Ligne 59: Execute cette instruction: setProfileForm(savedProfile);
            setProfileForm(savedProfile);
// Ligne 60: Ouvre un bloc de code ou une structure de donnees.
        } else {
// Ligne 61: Ouvre un bloc de code ou une structure de donnees.
            setProfileForm({
// Ligne 62: Execute cette instruction: prenom: user?.prenom ?? "",
                prenom: user?.prenom ?? "",
// Ligne 63: Execute cette instruction: nom: user?.nom ?? "",
                nom: user?.nom ?? "",
// Ligne 64: Execute cette instruction: email: user?.email ?? "",
                email: user?.email ?? "",
// Ligne 65: Execute cette instruction: telephone: "+33 6 00 00 00 00",
                telephone: "+33 6 00 00 00 00",
// Ligne 66: Ferme un bloc de code ou une structure de donnees.
            });
// Ligne 67: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 68: Ferme un bloc de code ou une structure de donnees.
    }, [user?.email, user?.nom, user?.prenom]);
// Ligne 69: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 70: Declare une variable locale utilisee par le composant.
    const displayName = useMemo(() => {
// Ligne 71: Declare une variable locale utilisee par le composant.
        const fromProfile = `${profileForm.prenom ?? ""} ${profileForm.nom ?? ""}`.trim();
// Ligne 72: Applique une condition pour brancher le flux d execution.
        if (fromProfile) return fromProfile;
// Ligne 73: Declare une variable locale utilisee par le composant.
        const fromUser = `${user?.prenom ?? ""} ${user?.nom ?? ""}`.trim();
// Ligne 74: Retourne une valeur depuis la fonction en cours.
        return fromUser || "Client";
// Ligne 75: Ferme un bloc de code ou une structure de donnees.
    }, [profileForm.nom, profileForm.prenom, user?.nom, user?.prenom]);
// Ligne 76: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 77: Applique une condition pour brancher le flux d execution.
    if (loading) {
// Ligne 78: Retourne une valeur depuis la fonction en cours.
        return null;
// Ligne 79: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 80: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 81: Applique une condition pour brancher le flux d execution.
    if (!isAuthenticated) {
// Ligne 82: Retourne une valeur depuis la fonction en cours.
        return <Navigate to="/login" replace />;
// Ligne 83: Ferme un bloc de code ou une structure de donnees.
    }
// Ligne 84: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 85: Declare une variable locale utilisee par le composant.
    const handleSaveAddress = (event) => {
// Ligne 86: Execute cette instruction: event.preventDefault();
        event.preventDefault();
// Ligne 87: Applique une condition pour brancher le flux d execution.
        if (!addressForm.label || !addressForm.street) return;
// Ligne 88: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 89: Declare une variable locale utilisee par le composant.
        const next = editingAddressId
// Ligne 90: Parcourt une collection pour generer une liste d elements.
            ? addresses.map((addr) =>
// Ligne 91: Effectue une affectation ou initialise une valeur.
                  addr.id === editingAddressId ? { ...addr, ...addressForm } : addr
// Ligne 92: Execute cette instruction: )
              )
// Ligne 93: Ouvre un bloc de code ou une structure de donnees.
            : [
// Ligne 94: Execute cette instruction: ...addresses,
                  ...addresses,
// Ligne 95: Ouvre un bloc de code ou une structure de donnees.
                  {
// Ligne 96: Execute cette instruction: id: Date.now().toString(),
                      id: Date.now().toString(),
// Ligne 97: Execute cette instruction: ...addressForm,
                      ...addressForm,
// Ligne 98: Effectue une affectation ou initialise une valeur.
                      isDefault: addresses.length === 0,
// Ligne 99: Ferme un bloc de code ou une structure de donnees.
                  },
// Ligne 100: Ferme un bloc de code ou une structure de donnees.
              ];
// Ligne 101: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 102: Execute cette instruction: setAddresses(next);
        setAddresses(next);
// Ligne 103: Lit ou ecrit des donnees persistantes dans le navigateur.
        localStorage.setItem(addressesStorageKey, JSON.stringify(next));
// Ligne 104: Execute cette instruction: setIsAddressFormOpen(false);
        setIsAddressFormOpen(false);
// Ligne 105: Execute cette instruction: setEditingAddressId(null);
        setEditingAddressId(null);
// Ligne 106: Execute cette instruction: setAddressForm({ label: "", street: "", postal: "", city: "" });
        setAddressForm({ label: "", street: "", postal: "", city: "" });
// Ligne 107: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 108: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 109: Declare une variable locale utilisee par le composant.
    const handleEditAddress = (address) => {
// Ligne 110: Execute cette instruction: setEditingAddressId(address.id);
        setEditingAddressId(address.id);
// Ligne 111: Ouvre un bloc de code ou une structure de donnees.
        setAddressForm({
// Ligne 112: Execute cette instruction: label: address.label,
            label: address.label,
// Ligne 113: Execute cette instruction: street: address.street,
            street: address.street,
// Ligne 114: Execute cette instruction: postal: address.postal,
            postal: address.postal,
// Ligne 115: Execute cette instruction: city: address.city,
            city: address.city,
// Ligne 116: Ferme un bloc de code ou une structure de donnees.
        });
// Ligne 117: Execute cette instruction: setIsAddressFormOpen(true);
        setIsAddressFormOpen(true);
// Ligne 118: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 119: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 120: Declare une variable locale utilisee par le composant.
    const handleDeleteAddress = (id) => {
// Ligne 121: Declare une variable locale utilisee par le composant.
        const next = addresses.filter((addr) => addr.id !== id);
// Ligne 122: Execute cette instruction: setAddresses(next);
        setAddresses(next);
// Ligne 123: Lit ou ecrit des donnees persistantes dans le navigateur.
        localStorage.setItem(addressesStorageKey, JSON.stringify(next));
// Ligne 124: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 125: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 126: Declare une variable locale utilisee par le composant.
    const handleSaveProfile = (event) => {
// Ligne 127: Execute cette instruction: event.preventDefault();
        event.preventDefault();
// Ligne 128: Lit ou ecrit des donnees persistantes dans le navigateur.
        localStorage.setItem(profileStorageKey, JSON.stringify(profileForm));
// Ligne 129: Execute cette instruction: setProfileMessage("Informations personnelles mises à jour.");
        setProfileMessage("Informations personnelles mises à jour.");
// Ligne 130: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 131: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 132: Declare une variable locale utilisee par le composant.
    const handleSavePassword = (event) => {
// Ligne 133: Execute cette instruction: event.preventDefault();
        event.preventDefault();
// Ligne 134: Declare une variable locale utilisee par le composant.
        const currentSaved = localStorage.getItem(passwordStorageKey) || "client-demo-1234";
// Ligne 135: Applique une condition pour brancher le flux d execution.
        if (passwordForm.current !== currentSaved) {
// Ligne 136: Execute cette instruction: setPasswordMessage("Mot de passe actuel incorrect.");
            setPasswordMessage("Mot de passe actuel incorrect.");
// Ligne 137: Execute cette instruction: return;
            return;
// Ligne 138: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 139: Applique une condition pour brancher le flux d execution.
        if (passwordForm.next.length < 8) {
// Ligne 140: Execute cette instruction: setPasswordMessage("Le nouveau mot de passe doit contenir au moins 8 caractères.");
            setPasswordMessage("Le nouveau mot de passe doit contenir au moins 8 caractères.");
// Ligne 141: Execute cette instruction: return;
            return;
// Ligne 142: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 143: Applique une condition pour brancher le flux d execution.
        if (passwordForm.next !== passwordForm.confirm) {
// Ligne 144: Execute cette instruction: setPasswordMessage("La confirmation ne correspond pas.");
            setPasswordMessage("La confirmation ne correspond pas.");
// Ligne 145: Execute cette instruction: return;
            return;
// Ligne 146: Ferme un bloc de code ou une structure de donnees.
        }
// Ligne 147: Lit ou ecrit des donnees persistantes dans le navigateur.
        localStorage.setItem(passwordStorageKey, passwordForm.next);
// Ligne 148: Execute cette instruction: setPasswordMessage("Mot de passe modifié avec succès.");
        setPasswordMessage("Mot de passe modifié avec succès.");
// Ligne 149: Execute cette instruction: setPasswordForm({ current: "", next: "", confirm: "" });
        setPasswordForm({ current: "", next: "", confirm: "" });
// Ligne 150: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 151: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 152: Declare une variable locale utilisee par le composant.
    const currentOrder = orders.find((order) => order.status !== "Livrée");
// Ligne 153: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 154: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 155: Ouvre un element JSX qui compose l interface utilisateur.
        <main className="account-page">
// Ligne 156: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="breadcrumb">Accueil / Mon compte</div>
// Ligne 157: Ouvre un element JSX qui compose l interface utilisateur.
            <h1>Mon compte</h1>
// Ligne 158: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 159: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="account-layout">
// Ligne 160: Ouvre un element JSX qui compose l interface utilisateur.
                <aside className="account-sidebar">
// Ligne 161: Ouvre un element JSX qui compose l interface utilisateur.
                    <div className="account-profile">
// Ligne 162: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="account-avatar">
// Ligne 163: Ouvre un element JSX qui compose l interface utilisateur.
                            <img
// Ligne 164: Effectue une affectation ou initialise une valeur.
                                src="/wallpapersden.com_dragon-ball-super-hd-vegeta-ultra-ego_2500x1400.jpg"
// Ligne 165: Effectue une affectation ou initialise une valeur.
                                alt="Avatar compte"
// Ligne 166: Execute cette instruction: />
                            />
// Ligne 167: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 168: Ouvre un element JSX qui compose l interface utilisateur.
                        <div>
// Ligne 169: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="account-name">{displayName}</div>
// Ligne 170: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="account-email">
// Ligne 171: Execute cette instruction: {profileForm.email || user?.email || "client@cafthe.com"}
                                {profileForm.email || user?.email || "client@cafthe.com"}
// Ligne 172: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 173: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 174: Ferme un element JSX dans l arborescence du rendu.
                    </div>
// Ligne 175: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 176: Effectue une affectation ou initialise une valeur.
                        type="button"
// Ligne 177: Effectue une affectation ou initialise une valeur.
                        className={activeTab === "orders" ? "active" : ""}
// Ligne 178: Associe une action JavaScript a un clic utilisateur.
                        onClick={() => setActiveTab("orders")}
// Ligne 179: Execute cette instruction: >
                    >
// Ligne 180: Execute cette instruction: Mes commandes
                        Mes commandes
// Ligne 181: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 182: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 183: Effectue une affectation ou initialise une valeur.
                        type="button"
// Ligne 184: Effectue une affectation ou initialise une valeur.
                        className={activeTab === "addresses" ? "active" : ""}
// Ligne 185: Associe une action JavaScript a un clic utilisateur.
                        onClick={() => setActiveTab("addresses")}
// Ligne 186: Execute cette instruction: >
                    >
// Ligne 187: Execute cette instruction: Mes adresses
                        Mes adresses
// Ligne 188: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 189: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 190: Effectue une affectation ou initialise une valeur.
                        type="button"
// Ligne 191: Effectue une affectation ou initialise une valeur.
                        className={activeTab === "profile" ? "active" : ""}
// Ligne 192: Associe une action JavaScript a un clic utilisateur.
                        onClick={() => setActiveTab("profile")}
// Ligne 193: Execute cette instruction: >
                    >
// Ligne 194: Execute cette instruction: Informations personnelles
                        Informations personnelles
// Ligne 195: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 196: Ouvre un element JSX qui compose l interface utilisateur.
                    <button
// Ligne 197: Effectue une affectation ou initialise une valeur.
                        type="button"
// Ligne 198: Effectue une affectation ou initialise une valeur.
                        className={activeTab === "settings" ? "active" : ""}
// Ligne 199: Associe une action JavaScript a un clic utilisateur.
                        onClick={() => setActiveTab("settings")}
// Ligne 200: Execute cette instruction: >
                    >
// Ligne 201: Execute cette instruction: Paramètres
                        Paramètres
// Ligne 202: Ferme un element JSX dans l arborescence du rendu.
                    </button>
// Ligne 203: Ferme un element JSX dans l arborescence du rendu.
                </aside>
// Ligne 204: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 205: Ouvre un element JSX qui compose l interface utilisateur.
                <section className="account-content">
// Ligne 206: Effectue une affectation ou initialise une valeur.
                    {activeTab === "orders" && (
// Ligne 207: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="account-panel">
// Ligne 208: Ouvre un element JSX qui compose l interface utilisateur.
                            <h2>Mes commandes</h2>
// Ligne 209: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="orders-list">
// Ligne 210: Effectue une affectation ou initialise une valeur.
                                {orders.length === 0 ? (
// Ligne 211: Ouvre un element JSX qui compose l interface utilisateur.
                                    <p>Aucune commande pour le moment.</p>
// Ligne 212: Execute cette instruction: ) : (
                                ) : (
// Ligne 213: Parcourt une collection pour generer une liste d elements.
                                    orders.map((order) => (
// Ligne 214: Ouvre un element JSX qui compose l interface utilisateur.
                                        <div key={order.id} className="order-card">
// Ligne 215: Ouvre un element JSX qui compose l interface utilisateur.
                                            <div>
// Ligne 216: Ouvre un element JSX qui compose l interface utilisateur.
                                                <div className="order-id">Commande {order.id}</div>
// Ligne 217: Ouvre un element JSX qui compose l interface utilisateur.
                                                <div className="order-meta">
// Ligne 218: Execute cette instruction: {order.items.length} articles
                                                    {order.items.length} articles
// Ligne 219: Ferme un element JSX dans l arborescence du rendu.
                                                </div>
// Ligne 220: Ferme un element JSX dans l arborescence du rendu.
                                            </div>
// Ligne 221: Ouvre un element JSX qui compose l interface utilisateur.
                                            <div className="order-info">
// Ligne 222: Ouvre un element JSX qui compose l interface utilisateur.
                                                <span>{order.date}</span>
// Ligne 223: Ouvre un element JSX qui compose l interface utilisateur.
                                                <span>{order.total.toFixed(2)} €</span>
// Ligne 224: Ouvre un element JSX qui compose l interface utilisateur.
                                                <span
// Ligne 225: Ouvre un bloc de code ou une structure de donnees.
                                                    className={`order-status ${
// Ligne 226: Effectue une affectation ou initialise une valeur.
                                                        order.status === "Livrée"
// Ligne 227: Execute cette instruction: ? "delivered"
                                                            ? "delivered"
// Ligne 228: Execute cette instruction: : "pending"
                                                            : "pending"
// Ligne 229: Ferme un bloc de code ou une structure de donnees.
                                                    }`}
// Ligne 230: Execute cette instruction: >
                                                >
// Ligne 231: Execute cette instruction: {order.status}
                                                    {order.status}
// Ligne 232: Ferme un element JSX dans l arborescence du rendu.
                                                </span>
// Ligne 233: Ferme un element JSX dans l arborescence du rendu.
                                            </div>
// Ligne 234: Ouvre un element JSX qui compose l interface utilisateur.
                                            <button
// Ligne 235: Effectue une affectation ou initialise une valeur.
                                                type="button"
// Ligne 236: Associe une action JavaScript a un clic utilisateur.
                                                onClick={() =>
// Ligne 237: Declenche une navigation vers une autre route de l application.
                                                    navigate(`/profil/commande/${order.id}`)
// Ligne 238: Ferme un bloc de code ou une structure de donnees.
                                                }
// Ligne 239: Execute cette instruction: >
                                            >
// Ligne 240: Execute cette instruction: Voir les détails
                                                Voir les détails
// Ligne 241: Ferme un element JSX dans l arborescence du rendu.
                                            </button>
// Ligne 242: Ferme un element JSX dans l arborescence du rendu.
                                        </div>
// Ligne 243: Execute cette instruction: ))
                                    ))
// Ligne 244: Execute cette instruction: )}
                                )}
// Ligne 245: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 246: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="order-tracking">
// Ligne 247: Ouvre un element JSX qui compose l interface utilisateur.
                                <h3>Suivi de commande en cours</h3>
// Ligne 248: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="tracking-steps">
// Ligne 249: Ouvre un element JSX qui compose l interface utilisateur.
                                    <span className="done">Commande validée</span>
// Ligne 250: Ouvre un element JSX qui compose l interface utilisateur.
                                    <span className="done">En préparation</span>
// Ligne 251: Ouvre un element JSX qui compose l interface utilisateur.
                                    <span
// Ligne 252: Ouvre un bloc de code ou une structure de donnees.
                                        className={
// Ligne 253: Effectue une affectation ou initialise une valeur.
                                            currentOrder?.status === "Expédiée" ||
// Ligne 254: Effectue une affectation ou initialise une valeur.
                                            currentOrder?.status === "Livrée"
// Ligne 255: Execute cette instruction: ? "done"
                                                ? "done"
// Ligne 256: Execute cette instruction: : ""
                                                : ""
// Ligne 257: Ferme un bloc de code ou une structure de donnees.
                                        }
// Ligne 258: Execute cette instruction: >
                                    >
// Ligne 259: Execute cette instruction: Expédiée
                                        Expédiée
// Ligne 260: Ferme un element JSX dans l arborescence du rendu.
                                    </span>
// Ligne 261: Ouvre un element JSX qui compose l interface utilisateur.
                                    <span
// Ligne 262: Ouvre un bloc de code ou une structure de donnees.
                                        className={
// Ligne 263: Effectue une affectation ou initialise une valeur.
                                            currentOrder?.status === "Livrée" ? "done" : ""
// Ligne 264: Ferme un bloc de code ou une structure de donnees.
                                        }
// Ligne 265: Execute cette instruction: >
                                    >
// Ligne 266: Execute cette instruction: Livrée
                                        Livrée
// Ligne 267: Ferme un element JSX dans l arborescence du rendu.
                                    </span>
// Ligne 268: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 269: Ouvre un element JSX qui compose l interface utilisateur.
                                <p>
// Ligne 270: Execute cette instruction: {currentOrder
                                    {currentOrder
// Ligne 271: Execute cette instruction: ? `Commande ${currentOrder.id} actuellement "${currentOrder.status}".`
                                        ? `Commande ${currentOrder.id} actuellement "${currentOrder.status}".`
// Ligne 272: Execute cette instruction: : "Aucune commande en cours."}
                                        : "Aucune commande en cours."}
// Ligne 273: Ferme un element JSX dans l arborescence du rendu.
                                </p>
// Ligne 274: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 275: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 276: Execute cette instruction: )}
                    )}
// Ligne 277: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 278: Effectue une affectation ou initialise une valeur.
                    {activeTab === "addresses" && (
// Ligne 279: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="account-panel">
// Ligne 280: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="panel-header">
// Ligne 281: Ouvre un element JSX qui compose l interface utilisateur.
                                <h2>Mes adresses</h2>
// Ligne 282: Ouvre un element JSX qui compose l interface utilisateur.
                                <button
// Ligne 283: Effectue une affectation ou initialise une valeur.
                                    type="button"
// Ligne 284: Effectue une affectation ou initialise une valeur.
                                    className="primary"
// Ligne 285: Declare une fonction (handler, utilitaire ou composant).
                                    onClick={() => {
// Ligne 286: Execute cette instruction: setEditingAddressId(null);
                                        setEditingAddressId(null);
// Ligne 287: Ouvre un bloc de code ou une structure de donnees.
                                        setAddressForm({
// Ligne 288: Execute cette instruction: label: "",
                                            label: "",
// Ligne 289: Execute cette instruction: street: "",
                                            street: "",
// Ligne 290: Execute cette instruction: postal: "",
                                            postal: "",
// Ligne 291: Execute cette instruction: city: "",
                                            city: "",
// Ligne 292: Ferme un bloc de code ou une structure de donnees.
                                        });
// Ligne 293: Effectue une affectation ou initialise une valeur.
                                        setIsAddressFormOpen((open) => !open);
// Ligne 294: Ferme un bloc de code ou une structure de donnees.
                                    }}
// Ligne 295: Execute cette instruction: >
                                >
// Ligne 296: Execute cette instruction: + Ajouter une adresse
                                    + Ajouter une adresse
// Ligne 297: Ferme un element JSX dans l arborescence du rendu.
                                </button>
// Ligne 298: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 299: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 300: Execute cette instruction: {isAddressFormOpen && (
                            {isAddressFormOpen && (
// Ligne 301: Ouvre un element JSX qui compose l interface utilisateur.
                                <form className="address-form" onSubmit={handleSaveAddress}>
// Ligne 302: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div className="form-row">
// Ligne 303: Ouvre un element JSX qui compose l interface utilisateur.
                                        <label>
// Ligne 304: Execute cette instruction: Libellé
                                            Libellé
// Ligne 305: Ouvre un element JSX qui compose l interface utilisateur.
                                            <input
// Ligne 306: Effectue une affectation ou initialise une valeur.
                                                type="text"
// Ligne 307: Effectue une affectation ou initialise une valeur.
                                                value={addressForm.label}
// Ligne 308: Associe une reaction a la modification d un champ de formulaire.
                                                onChange={(event) =>
// Ligne 309: Ouvre un bloc de code ou une structure de donnees.
                                                    setAddressForm({
// Ligne 310: Execute cette instruction: ...addressForm,
                                                        ...addressForm,
// Ligne 311: Execute cette instruction: label: event.target.value,
                                                        label: event.target.value,
// Ligne 312: Ferme un bloc de code ou une structure de donnees.
                                                    })
// Ligne 313: Ferme un bloc de code ou une structure de donnees.
                                                }
// Ligne 314: Execute cette instruction: required
                                                required
// Ligne 315: Execute cette instruction: />
                                            />
// Ligne 316: Ferme un element JSX dans l arborescence du rendu.
                                        </label>
// Ligne 317: Ouvre un element JSX qui compose l interface utilisateur.
                                        <label>
// Ligne 318: Execute cette instruction: Ville
                                            Ville
// Ligne 319: Ouvre un element JSX qui compose l interface utilisateur.
                                            <input
// Ligne 320: Effectue une affectation ou initialise une valeur.
                                                type="text"
// Ligne 321: Effectue une affectation ou initialise une valeur.
                                                value={addressForm.city}
// Ligne 322: Associe une reaction a la modification d un champ de formulaire.
                                                onChange={(event) =>
// Ligne 323: Ouvre un bloc de code ou une structure de donnees.
                                                    setAddressForm({
// Ligne 324: Execute cette instruction: ...addressForm,
                                                        ...addressForm,
// Ligne 325: Execute cette instruction: city: event.target.value,
                                                        city: event.target.value,
// Ligne 326: Ferme un bloc de code ou une structure de donnees.
                                                    })
// Ligne 327: Ferme un bloc de code ou une structure de donnees.
                                                }
// Ligne 328: Execute cette instruction: required
                                                required
// Ligne 329: Execute cette instruction: />
                                            />
// Ligne 330: Ferme un element JSX dans l arborescence du rendu.
                                        </label>
// Ligne 331: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 332: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 333: Execute cette instruction: Adresse
                                        Adresse
// Ligne 334: Ouvre un element JSX qui compose l interface utilisateur.
                                        <input
// Ligne 335: Effectue une affectation ou initialise une valeur.
                                            type="text"
// Ligne 336: Effectue une affectation ou initialise une valeur.
                                            value={addressForm.street}
// Ligne 337: Associe une reaction a la modification d un champ de formulaire.
                                            onChange={(event) =>
// Ligne 338: Ouvre un bloc de code ou une structure de donnees.
                                                setAddressForm({
// Ligne 339: Execute cette instruction: ...addressForm,
                                                    ...addressForm,
// Ligne 340: Execute cette instruction: street: event.target.value,
                                                    street: event.target.value,
// Ligne 341: Ferme un bloc de code ou une structure de donnees.
                                                })
// Ligne 342: Ferme un bloc de code ou une structure de donnees.
                                            }
// Ligne 343: Execute cette instruction: required
                                            required
// Ligne 344: Execute cette instruction: />
                                        />
// Ligne 345: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 346: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 347: Execute cette instruction: Code postal
                                        Code postal
// Ligne 348: Ouvre un element JSX qui compose l interface utilisateur.
                                        <input
// Ligne 349: Effectue une affectation ou initialise une valeur.
                                            type="text"
// Ligne 350: Effectue une affectation ou initialise une valeur.
                                            value={addressForm.postal}
// Ligne 351: Associe une reaction a la modification d un champ de formulaire.
                                            onChange={(event) =>
// Ligne 352: Ouvre un bloc de code ou une structure de donnees.
                                                setAddressForm({
// Ligne 353: Execute cette instruction: ...addressForm,
                                                    ...addressForm,
// Ligne 354: Execute cette instruction: postal: event.target.value,
                                                    postal: event.target.value,
// Ligne 355: Ferme un bloc de code ou une structure de donnees.
                                                })
// Ligne 356: Ferme un bloc de code ou une structure de donnees.
                                            }
// Ligne 357: Execute cette instruction: required
                                            required
// Ligne 358: Execute cette instruction: />
                                        />
// Ligne 359: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 360: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div className="form-actions">
// Ligne 361: Ouvre un element JSX qui compose l interface utilisateur.
                                        <button
// Ligne 362: Effectue une affectation ou initialise une valeur.
                                            type="button"
// Ligne 363: Effectue une affectation ou initialise une valeur.
                                            className="ghost"
// Ligne 364: Associe une action JavaScript a un clic utilisateur.
                                            onClick={() => setIsAddressFormOpen(false)}
// Ligne 365: Execute cette instruction: >
                                        >
// Ligne 366: Execute cette instruction: Annuler
                                            Annuler
// Ligne 367: Ferme un element JSX dans l arborescence du rendu.
                                        </button>
// Ligne 368: Ouvre un element JSX qui compose l interface utilisateur.
                                        <button type="submit" className="primary">
// Ligne 369: Execute cette instruction: {editingAddressId ? "Mettre à jour" : "Enregistrer"}
                                            {editingAddressId ? "Mettre à jour" : "Enregistrer"}
// Ligne 370: Ferme un element JSX dans l arborescence du rendu.
                                        </button>
// Ligne 371: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 372: Ferme un element JSX dans l arborescence du rendu.
                                </form>
// Ligne 373: Execute cette instruction: )}
                            )}
// Ligne 374: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 375: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="address-grid">
// Ligne 376: Parcourt une collection pour generer une liste d elements.
                                {addresses.map((address) => (
// Ligne 377: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div key={address.id} className="address-card">
// Ligne 378: Execute cette instruction: {address.isDefault && (
                                        {address.isDefault && (
// Ligne 379: Ouvre un element JSX qui compose l interface utilisateur.
                                            <div className="address-tag">Par défaut</div>
// Ligne 380: Execute cette instruction: )}
                                        )}
// Ligne 381: Ouvre un element JSX qui compose l interface utilisateur.
                                        <h4>{address.label}</h4>
// Ligne 382: Ouvre un element JSX qui compose l interface utilisateur.
                                        <p>{address.street}</p>
// Ligne 383: Ouvre un element JSX qui compose l interface utilisateur.
                                        <p>
// Ligne 384: Execute cette instruction: {address.postal} {address.city}
                                            {address.postal} {address.city}
// Ligne 385: Ferme un element JSX dans l arborescence du rendu.
                                        </p>
// Ligne 386: Ouvre un element JSX qui compose l interface utilisateur.
                                        <div className="address-actions">
// Ligne 387: Ouvre un element JSX qui compose l interface utilisateur.
                                            <button
// Ligne 388: Effectue une affectation ou initialise une valeur.
                                                type="button"
// Ligne 389: Associe une action JavaScript a un clic utilisateur.
                                                onClick={() => handleEditAddress(address)}
// Ligne 390: Execute cette instruction: >
                                            >
// Ligne 391: Execute cette instruction: Modifier
                                                Modifier
// Ligne 392: Ferme un element JSX dans l arborescence du rendu.
                                            </button>
// Ligne 393: Ouvre un element JSX qui compose l interface utilisateur.
                                            <button
// Ligne 394: Effectue une affectation ou initialise une valeur.
                                                type="button"
// Ligne 395: Effectue une affectation ou initialise une valeur.
                                                className="danger"
// Ligne 396: Associe une action JavaScript a un clic utilisateur.
                                                onClick={() => handleDeleteAddress(address.id)}
// Ligne 397: Execute cette instruction: >
                                            >
// Ligne 398: Execute cette instruction: Supprimer
                                                Supprimer
// Ligne 399: Ferme un element JSX dans l arborescence du rendu.
                                            </button>
// Ligne 400: Ferme un element JSX dans l arborescence du rendu.
                                        </div>
// Ligne 401: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 402: Execute cette instruction: ))}
                                ))}
// Ligne 403: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 404: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 405: Execute cette instruction: )}
                    )}
// Ligne 406: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 407: Effectue une affectation ou initialise une valeur.
                    {activeTab === "profile" && (
// Ligne 408: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="account-panel">
// Ligne 409: Ouvre un element JSX qui compose l interface utilisateur.
                            <h2>Informations personnelles</h2>
// Ligne 410: Ouvre un element JSX qui compose l interface utilisateur.
                            <form className="profile-form" onSubmit={handleSaveProfile}>
// Ligne 411: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="form-row">
// Ligne 412: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 413: Execute cette instruction: Prénom
                                        Prénom
// Ligne 414: Ouvre un element JSX qui compose l interface utilisateur.
                                        <input
// Ligne 415: Effectue une affectation ou initialise une valeur.
                                            type="text"
// Ligne 416: Effectue une affectation ou initialise une valeur.
                                            value={profileForm.prenom}
// Ligne 417: Associe une reaction a la modification d un champ de formulaire.
                                            onChange={(event) =>
// Ligne 418: Ouvre un bloc de code ou une structure de donnees.
                                                setProfileForm({
// Ligne 419: Execute cette instruction: ...profileForm,
                                                    ...profileForm,
// Ligne 420: Execute cette instruction: prenom: event.target.value,
                                                    prenom: event.target.value,
// Ligne 421: Ferme un bloc de code ou une structure de donnees.
                                                })
// Ligne 422: Ferme un bloc de code ou une structure de donnees.
                                            }
// Ligne 423: Execute cette instruction: />
                                        />
// Ligne 424: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 425: Ouvre un element JSX qui compose l interface utilisateur.
                                    <label>
// Ligne 426: Execute cette instruction: Nom
                                        Nom
// Ligne 427: Ouvre un element JSX qui compose l interface utilisateur.
                                        <input
// Ligne 428: Effectue une affectation ou initialise une valeur.
                                            type="text"
// Ligne 429: Effectue une affectation ou initialise une valeur.
                                            value={profileForm.nom}
// Ligne 430: Associe une reaction a la modification d un champ de formulaire.
                                            onChange={(event) =>
// Ligne 431: Ouvre un bloc de code ou une structure de donnees.
                                                setProfileForm({
// Ligne 432: Execute cette instruction: ...profileForm,
                                                    ...profileForm,
// Ligne 433: Execute cette instruction: nom: event.target.value,
                                                    nom: event.target.value,
// Ligne 434: Ferme un bloc de code ou une structure de donnees.
                                                })
// Ligne 435: Ferme un bloc de code ou une structure de donnees.
                                            }
// Ligne 436: Execute cette instruction: />
                                        />
// Ligne 437: Ferme un element JSX dans l arborescence du rendu.
                                    </label>
// Ligne 438: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 439: Ouvre un element JSX qui compose l interface utilisateur.
                                <label>
// Ligne 440: Execute cette instruction: Email
                                    Email
// Ligne 441: Ouvre un element JSX qui compose l interface utilisateur.
                                    <input
// Ligne 442: Effectue une affectation ou initialise une valeur.
                                        type="email"
// Ligne 443: Effectue une affectation ou initialise une valeur.
                                        value={profileForm.email}
// Ligne 444: Associe une reaction a la modification d un champ de formulaire.
                                        onChange={(event) =>
// Ligne 445: Ouvre un bloc de code ou une structure de donnees.
                                            setProfileForm({
// Ligne 446: Execute cette instruction: ...profileForm,
                                                ...profileForm,
// Ligne 447: Execute cette instruction: email: event.target.value,
                                                email: event.target.value,
// Ligne 448: Ferme un bloc de code ou une structure de donnees.
                                            })
// Ligne 449: Ferme un bloc de code ou une structure de donnees.
                                        }
// Ligne 450: Execute cette instruction: />
                                    />
// Ligne 451: Ferme un element JSX dans l arborescence du rendu.
                                </label>
// Ligne 452: Ouvre un element JSX qui compose l interface utilisateur.
                                <label>
// Ligne 453: Execute cette instruction: Téléphone
                                    Téléphone
// Ligne 454: Ouvre un element JSX qui compose l interface utilisateur.
                                    <input
// Ligne 455: Effectue une affectation ou initialise une valeur.
                                        type="tel"
// Ligne 456: Effectue une affectation ou initialise une valeur.
                                        value={profileForm.telephone}
// Ligne 457: Associe une reaction a la modification d un champ de formulaire.
                                        onChange={(event) =>
// Ligne 458: Ouvre un bloc de code ou une structure de donnees.
                                            setProfileForm({
// Ligne 459: Execute cette instruction: ...profileForm,
                                                ...profileForm,
// Ligne 460: Execute cette instruction: telephone: event.target.value,
                                                telephone: event.target.value,
// Ligne 461: Ferme un bloc de code ou une structure de donnees.
                                            })
// Ligne 462: Ferme un bloc de code ou une structure de donnees.
                                        }
// Ligne 463: Execute cette instruction: />
                                    />
// Ligne 464: Ferme un element JSX dans l arborescence du rendu.
                                </label>
// Ligne 465: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="form-actions">
// Ligne 466: Ouvre un element JSX qui compose l interface utilisateur.
                                    <button
// Ligne 467: Effectue une affectation ou initialise une valeur.
                                        type="button"
// Ligne 468: Effectue une affectation ou initialise une valeur.
                                        className="ghost"
// Ligne 469: Associe une action JavaScript a un clic utilisateur.
                                        onClick={() =>
// Ligne 470: Ouvre un bloc de code ou une structure de donnees.
                                            setProfileForm({
// Ligne 471: Execute cette instruction: prenom: user?.prenom ?? "",
                                                prenom: user?.prenom ?? "",
// Ligne 472: Execute cette instruction: nom: user?.nom ?? "",
                                                nom: user?.nom ?? "",
// Ligne 473: Execute cette instruction: email: user?.email ?? "",
                                                email: user?.email ?? "",
// Ligne 474: Execute cette instruction: telephone: profileForm.telephone,
                                                telephone: profileForm.telephone,
// Ligne 475: Ferme un bloc de code ou une structure de donnees.
                                            })
// Ligne 476: Ferme un bloc de code ou une structure de donnees.
                                        }
// Ligne 477: Execute cette instruction: >
                                    >
// Ligne 478: Execute cette instruction: Réinitialiser
                                        Réinitialiser
// Ligne 479: Ferme un element JSX dans l arborescence du rendu.
                                    </button>
// Ligne 480: Ouvre un element JSX qui compose l interface utilisateur.
                                    <button type="submit" className="primary">
// Ligne 481: Execute cette instruction: Enregistrer les modifications
                                        Enregistrer les modifications
// Ligne 482: Ferme un element JSX dans l arborescence du rendu.
                                    </button>
// Ligne 483: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 484: Ferme un element JSX dans l arborescence du rendu.
                            </form>
// Ligne 485: Execute cette instruction: {profileMessage && (
                            {profileMessage && (
// Ligne 486: Ouvre un element JSX qui compose l interface utilisateur.
                                <p className="form-feedback success">{profileMessage}</p>
// Ligne 487: Execute cette instruction: )}
                            )}
// Ligne 488: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 489: Ouvre un element JSX qui compose l interface utilisateur.
                            <h3>Changer le mot de passe</h3>
// Ligne 490: Ouvre un element JSX qui compose l interface utilisateur.
                            <form className="profile-form" onSubmit={handleSavePassword}>
// Ligne 491: Ouvre un element JSX qui compose l interface utilisateur.
                                <label>
// Ligne 492: Execute cette instruction: Mot de passe actuel
                                    Mot de passe actuel
// Ligne 493: Ouvre un element JSX qui compose l interface utilisateur.
                                    <input
// Ligne 494: Effectue une affectation ou initialise une valeur.
                                        type="password"
// Ligne 495: Effectue une affectation ou initialise une valeur.
                                        value={passwordForm.current}
// Ligne 496: Associe une reaction a la modification d un champ de formulaire.
                                        onChange={(event) =>
// Ligne 497: Ouvre un bloc de code ou une structure de donnees.
                                            setPasswordForm({
// Ligne 498: Execute cette instruction: ...passwordForm,
                                                ...passwordForm,
// Ligne 499: Execute cette instruction: current: event.target.value,
                                                current: event.target.value,
// Ligne 500: Ferme un bloc de code ou une structure de donnees.
                                            })
// Ligne 501: Ferme un bloc de code ou une structure de donnees.
                                        }
// Ligne 502: Execute cette instruction: required
                                        required
// Ligne 503: Execute cette instruction: />
                                    />
// Ligne 504: Ferme un element JSX dans l arborescence du rendu.
                                </label>
// Ligne 505: Ouvre un element JSX qui compose l interface utilisateur.
                                <label>
// Ligne 506: Execute cette instruction: Nouveau mot de passe
                                    Nouveau mot de passe
// Ligne 507: Ouvre un element JSX qui compose l interface utilisateur.
                                    <input
// Ligne 508: Effectue une affectation ou initialise une valeur.
                                        type="password"
// Ligne 509: Effectue une affectation ou initialise une valeur.
                                        value={passwordForm.next}
// Ligne 510: Associe une reaction a la modification d un champ de formulaire.
                                        onChange={(event) =>
// Ligne 511: Ouvre un bloc de code ou une structure de donnees.
                                            setPasswordForm({
// Ligne 512: Execute cette instruction: ...passwordForm,
                                                ...passwordForm,
// Ligne 513: Execute cette instruction: next: event.target.value,
                                                next: event.target.value,
// Ligne 514: Ferme un bloc de code ou une structure de donnees.
                                            })
// Ligne 515: Ferme un bloc de code ou une structure de donnees.
                                        }
// Ligne 516: Execute cette instruction: required
                                        required
// Ligne 517: Execute cette instruction: />
                                    />
// Ligne 518: Ferme un element JSX dans l arborescence du rendu.
                                </label>
// Ligne 519: Ouvre un element JSX qui compose l interface utilisateur.
                                <label>
// Ligne 520: Execute cette instruction: Confirmer le mot de passe
                                    Confirmer le mot de passe
// Ligne 521: Ouvre un element JSX qui compose l interface utilisateur.
                                    <input
// Ligne 522: Effectue une affectation ou initialise une valeur.
                                        type="password"
// Ligne 523: Effectue une affectation ou initialise une valeur.
                                        value={passwordForm.confirm}
// Ligne 524: Associe une reaction a la modification d un champ de formulaire.
                                        onChange={(event) =>
// Ligne 525: Ouvre un bloc de code ou une structure de donnees.
                                            setPasswordForm({
// Ligne 526: Execute cette instruction: ...passwordForm,
                                                ...passwordForm,
// Ligne 527: Execute cette instruction: confirm: event.target.value,
                                                confirm: event.target.value,
// Ligne 528: Ferme un bloc de code ou une structure de donnees.
                                            })
// Ligne 529: Ferme un bloc de code ou une structure de donnees.
                                        }
// Ligne 530: Execute cette instruction: required
                                        required
// Ligne 531: Execute cette instruction: />
                                    />
// Ligne 532: Ferme un element JSX dans l arborescence du rendu.
                                </label>
// Ligne 533: Ouvre un element JSX qui compose l interface utilisateur.
                                <div className="form-actions">
// Ligne 534: Ouvre un element JSX qui compose l interface utilisateur.
                                    <button type="submit" className="primary">
// Ligne 535: Execute cette instruction: Mettre à jour le mot de passe
                                        Mettre à jour le mot de passe
// Ligne 536: Ferme un element JSX dans l arborescence du rendu.
                                    </button>
// Ligne 537: Ferme un element JSX dans l arborescence du rendu.
                                </div>
// Ligne 538: Ferme un element JSX dans l arborescence du rendu.
                            </form>
// Ligne 539: Execute cette instruction: {passwordMessage && (
                            {passwordMessage && (
// Ligne 540: Ouvre un element JSX qui compose l interface utilisateur.
                                <p
// Ligne 541: Ouvre un bloc de code ou une structure de donnees.
                                    className={`form-feedback ${
// Ligne 542: Execute cette instruction: passwordMessage.includes("succès")
                                        passwordMessage.includes("succès")
// Ligne 543: Execute cette instruction: ? "success"
                                            ? "success"
// Ligne 544: Execute cette instruction: : "error"
                                            : "error"
// Ligne 545: Ferme un bloc de code ou une structure de donnees.
                                    }`}
// Ligne 546: Execute cette instruction: >
                                >
// Ligne 547: Execute cette instruction: {passwordMessage}
                                    {passwordMessage}
// Ligne 548: Ferme un element JSX dans l arborescence du rendu.
                                </p>
// Ligne 549: Execute cette instruction: )}
                            )}
// Ligne 550: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 551: Execute cette instruction: )}
                    )}
// Ligne 552: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 553: Effectue une affectation ou initialise une valeur.
                    {activeTab === "settings" && (
// Ligne 554: Ouvre un element JSX qui compose l interface utilisateur.
                        <div className="account-panel">
// Ligne 555: Ouvre un element JSX qui compose l interface utilisateur.
                            <h2>Paramètres</h2>
// Ligne 556: Ouvre un element JSX qui compose l interface utilisateur.
                            <p className="panel-subtitle">
// Ligne 557: Execute cette instruction: Gérez vos préférences et la sécurité de votre compte.
                                Gérez vos préférences et la sécurité de votre compte.
// Ligne 558: Ferme un element JSX dans l arborescence du rendu.
                            </p>
// Ligne 559: Ouvre un element JSX qui compose l interface utilisateur.
                            <div className="settings-list">
// Ligne 560: Ouvre un bloc de code ou une structure de donnees.
                                {[
// Ligne 561: Ouvre un bloc de code ou une structure de donnees.
                                    {
// Ligne 562: Execute cette instruction: title: "Notifications",
                                        title: "Notifications",
// Ligne 563: Execute cette instruction: subtitle:
                                        subtitle:
// Ligne 564: Execute cette instruction: "Gérer les emails et les alertes de commande.",
                                            "Gérer les emails et les alertes de commande.",
// Ligne 565: Ferme un bloc de code ou une structure de donnees.
                                    },
// Ligne 566: Ouvre un bloc de code ou une structure de donnees.
                                    {
// Ligne 567: Execute cette instruction: title: "Confidentialité et Sécurité",
                                        title: "Confidentialité et Sécurité",
// Ligne 568: Execute cette instruction: subtitle:
                                        subtitle:
// Ligne 569: Execute cette instruction: "Modifier le mot de passe et les accès du compte.",
                                            "Modifier le mot de passe et les accès du compte.",
// Ligne 570: Ferme un bloc de code ou une structure de donnees.
                                    },
// Ligne 571: Ouvre un bloc de code ou une structure de donnees.
                                    {
// Ligne 572: Execute cette instruction: title: "Langue et Région",
                                        title: "Langue et Région",
// Ligne 573: Execute cette instruction: subtitle:
                                        subtitle:
// Ligne 574: Execute cette instruction: "Sélectionnez votre langue et fuseau horaire préférés.",
                                            "Sélectionnez votre langue et fuseau horaire préférés.",
// Ligne 575: Execute cette instruction: value: "Français (FR)",
                                        value: "Français (FR)",
// Ligne 576: Ferme un bloc de code ou une structure de donnees.
                                    },
// Ligne 577: Ouvre un bloc de code ou une structure de donnees.
                                    {
// Ligne 578: Execute cette instruction: title: "Apparence",
                                        title: "Apparence",
// Ligne 579: Execute cette instruction: subtitle: "Personnaliser l'affichage de l'interface.",
                                        subtitle: "Personnaliser l'affichage de l'interface.",
// Ligne 580: Ferme un bloc de code ou une structure de donnees.
                                    },
// Ligne 581: Ouvre un bloc de code ou une structure de donnees.
                                    {
// Ligne 582: Execute cette instruction: title: "Aide et Support",
                                        title: "Aide et Support",
// Ligne 583: Execute cette instruction: subtitle: "FAQ, contact et assistance.",
                                        subtitle: "FAQ, contact et assistance.",
// Ligne 584: Ferme un bloc de code ou une structure de donnees.
                                    },
// Ligne 585: Ferme un bloc de code ou une structure de donnees.
                                ].map((item) => (
// Ligne 586: Ouvre un element JSX qui compose l interface utilisateur.
                                    <div key={item.title} className="settings-item">
// Ligne 587: Ouvre un element JSX qui compose l interface utilisateur.
                                        <div>
// Ligne 588: Ouvre un element JSX qui compose l interface utilisateur.
                                            <div className="settings-title">{item.title}</div>
// Ligne 589: Ouvre un element JSX qui compose l interface utilisateur.
                                            <div className="settings-subtitle">
// Ligne 590: Execute cette instruction: {item.subtitle}
                                                {item.subtitle}
// Ligne 591: Ferme un element JSX dans l arborescence du rendu.
                                            </div>
// Ligne 592: Ferme un element JSX dans l arborescence du rendu.
                                        </div>
// Ligne 593: Ouvre un element JSX qui compose l interface utilisateur.
                                        <div className="settings-value">
// Ligne 594: Execute cette instruction: {item.value ?? "›"}
                                            {item.value ?? "›"}
// Ligne 595: Ferme un element JSX dans l arborescence du rendu.
                                        </div>
// Ligne 596: Ferme un element JSX dans l arborescence du rendu.
                                    </div>
// Ligne 597: Execute cette instruction: ))}
                                ))}
// Ligne 598: Ferme un element JSX dans l arborescence du rendu.
                            </div>
// Ligne 599: Ouvre un element JSX qui compose l interface utilisateur.
                            <button type="button" className="settings-save">
// Ligne 600: Execute cette instruction: Sauvegarder les changements
                                Sauvegarder les changements
// Ligne 601: Ferme un element JSX dans l arborescence du rendu.
                            </button>
// Ligne 602: Ferme un element JSX dans l arborescence du rendu.
                        </div>
// Ligne 603: Execute cette instruction: )}
                    )}
// Ligne 604: Ferme un element JSX dans l arborescence du rendu.
                </section>
// Ligne 605: Ferme un element JSX dans l arborescence du rendu.
            </div>
// Ligne 606: Ferme un element JSX dans l arborescence du rendu.
        </main>
// Ligne 607: Execute cette instruction: );
    );
// Ligne 608: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 609: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 610: Expose ce composant comme export par defaut du fichier.
export default Account;
// Ligne 611: Ligne vide pour aerer le code et separer les blocs logiques.
