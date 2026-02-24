// Fichier annote automatiquement pour revision junior: src\pages\Dashboard.jsx
// Ligne 1: Execute cette instruction: /**
/**
// Ligne 2: Execute cette instruction: * @file Dashboard.jsx
 * @file Dashboard.jsx
// Ligne 3: Execute cette instruction: * Role: Back-office vendeur/admin.
 * Role: Back-office vendeur/admin.
// Ligne 4: Execute cette instruction: * Comment c est fait: Regroupe auth dashboard, CRUD produits, commandes, clients et KPI dans des modules relies.
 * Comment c est fait: Regroupe auth dashboard, CRUD produits, commandes, clients et KPI dans des modules relies.
// Ligne 5: Execute cette instruction: * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
// Ligne 6: Execute cette instruction: */
 */
// Ligne 7: Importe un module necessaire au composant ou a sa logique.
import React, { useEffect, useMemo, useState } from "react";
// Ligne 8: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 9: Declare une variable locale utilisee par le composant.
const DATA_KEY = "cafthe_dash_data_v2";
// Ligne 10: Declare une variable locale utilisee par le composant.
const SESSION_KEY = "cafthe_dash_session_v2";
// Ligne 11: Declare une variable locale utilisee par le composant.
const ORDER_KEY = "cafthe_orders";
// Ligne 12: Declare une variable locale utilisee par le composant.
const TIMEOUT_MS = 30 * 60 * 1000;
// Ligne 13: Declare une variable locale utilisee par le composant.
const STATUSES = ["En attente", "En pr�paration", "Exp�di�e", "Livr�e"];
// Ligne 14: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 15: Declare une variable locale utilisee par le composant.
const readJson = (k, fb) => { try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fb; } catch { return fb; } };
// Ligne 16: Declare une variable locale utilisee par le composant.
const round = (v) => Math.round((Number(v) + Number.EPSILON) * 100) / 100;
// Ligne 17: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 18: Declare une variable locale utilisee par le composant.
const defaults = {
// Ligne 19: Ouvre un bloc de code ou une structure de donnees.
  users: [
// Ligne 20: Execute cette instruction: { id: "u_admin", role: "admin", name: "Admin CafTh�", email: "admin@cafthe.fr", password: "Admin123!", active: true },
    { id: "u_admin", role: "admin", name: "Admin CafTh�", email: "admin@cafthe.fr", password: "Admin123!", active: true },
// Ligne 21: Execute cette instruction: { id: "u_seller", role: "seller", name: "Vendeur CafTh�", email: "vendeur@cafthe.fr", password: "Vendeur123!", active...
    { id: "u_seller", role: "seller", name: "Vendeur CafTh�", email: "vendeur@cafthe.fr", password: "Vendeur123!", active: true },
// Ligne 22: Ferme un bloc de code ou une structure de donnees.
  ],
// Ligne 23: Ouvre un bloc de code ou une structure de donnees.
  products: [
// Ligne 24: Execute cette instruction: { id: "p1", sku: "CAF-ARA-250", name: "Arabica Premium", category: "Caf�", priceHt: 10.42, tvaRate: 5.5, priceTtc: 10...
    { id: "p1", sku: "CAF-ARA-250", name: "Arabica Premium", category: "Caf�", priceHt: 10.42, tvaRate: 5.5, priceTtc: 10.99, stock: 1800, active: true },
// Ligne 25: Execute cette instruction: { id: "p2", sku: "THE-EAR-100", name: "Earl Grey Imp�rial", category: "Th�", priceHt: 9, tvaRate: 5.5, priceTtc: 9.5,...
    { id: "p2", sku: "THE-EAR-100", name: "Earl Grey Imp�rial", category: "Th�", priceHt: 9, tvaRate: 5.5, priceTtc: 9.5, stock: 2200, active: true },
// Ligne 26: Execute cette instruction: { id: "p3", sku: "ACC-MUG-001", name: "Mug d�gustation", category: "Accessoire", priceHt: 12.5, tvaRate: 20, priceTtc...
    { id: "p3", sku: "ACC-MUG-001", name: "Mug d�gustation", category: "Accessoire", priceHt: 12.5, tvaRate: 20, priceTtc: 15, stock: 35, active: true },
// Ligne 27: Ferme un bloc de code ou une structure de donnees.
  ],
// Ligne 28: Execute cette instruction: clients: [{ id: "c1", name: "Marie Dupont", email: "marie@cafthe.fr" }],
  clients: [{ id: "c1", name: "Marie Dupont", email: "marie@cafthe.fr" }],
// Ligne 29: Execute cette instruction: inStoreSales: [],
  inStoreSales: [],
// Ligne 30: Execute cette instruction: onlineOrders: [],
  onlineOrders: [],
// Ligne 31: Execute cette instruction: stockAlertThreshold: 10,
  stockAlertThreshold: 10,
// Ligne 32: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 33: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 34: Declare une variable locale utilisee par le composant.
const loadData = () => {
// Ligne 35: Declare une variable locale utilisee par le composant.
  const raw = readJson(DATA_KEY, null);
// Ligne 36: Declare une variable locale utilisee par le composant.
  const base = raw ? { ...defaults, ...raw } : defaults;
// Ligne 37: Declare une variable locale utilisee par le composant.
  const incoming = readJson(ORDER_KEY, []).map((o) => ({
// Ligne 38: Execute cette instruction: id: o.id ?? `WEB-${Date.now()}`,
    id: o.id ?? `WEB-${Date.now()}`,
// Ligne 39: Effectue une affectation ou initialise une valeur.
    status: STATUSES.includes(o.status) ? o.status : o.status === "En cours" ? "En attente" : "En attente",
// Ligne 40: Execute cette instruction: total: Number(o.total ?? 0),
    total: Number(o.total ?? 0),
// Ligne 41: Execute cette instruction: clientEmail: o.clientEmail ?? "",
    clientEmail: o.clientEmail ?? "",
// Ligne 42: Execute cette instruction: createdAt: o.createdAt ?? o.emailSentAt ?? new Date().toISOString(),
    createdAt: o.createdAt ?? o.emailSentAt ?? new Date().toISOString(),
// Ligne 43: Parcourt une collection pour generer une liste d elements.
    items: (o.items ?? []).map((i) => ({ id: i.id, name: i.name ?? "Produit", quantity: Number(i.quantity ?? 1), price: Number(i.price ?? 0) })),
// Ligne 44: Ferme un bloc de code ou une structure de donnees.
  }));
// Ligne 45: Declare une variable locale utilisee par le composant.
  const map = new Map();
// Ligne 46: Effectue une affectation ou initialise une valeur.
  [...(base.onlineOrders ?? []), ...incoming].forEach((o) => map.set(String(o.id), o));
// Ligne 47: Retourne une valeur depuis la fonction en cours.
  return { ...base, onlineOrders: Array.from(map.values()) };
// Ligne 48: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 49: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 50: Declare une variable locale utilisee par le composant.
const emptyProduct = { id: "", sku: "", name: "", category: "Th�", priceHt: "", tvaRate: "5.5", stock: "" };
// Ligne 51: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 52: Declare une variable locale utilisee par le composant.
const Dashboard = () => {
// Ligne 53: Declare une variable locale utilisee par le composant.
  const [data, setData] = useState(loadData);
// Ligne 54: Declare une variable locale utilisee par le composant.
  const [session, setSession] = useState(() => readJson(SESSION_KEY, null));
// Ligne 55: Declare une variable locale utilisee par le composant.
  const [tab, setTab] = useState("kpi");
// Ligne 56: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 57: Declare une variable locale utilisee par le composant.
  const [email, setEmail] = useState("");
// Ligne 58: Declare une variable locale utilisee par le composant.
  const [password, setPassword] = useState("");
// Ligne 59: Declare une variable locale utilisee par le composant.
  const [authMessage, setAuthMessage] = useState("");
// Ligne 60: Declare une variable locale utilisee par le composant.
  const [resetEmail, setResetEmail] = useState("");
// Ligne 61: Declare une variable locale utilisee par le composant.
  const [resetMessage, setResetMessage] = useState("");
// Ligne 62: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 63: Declare une variable locale utilisee par le composant.
  const [pf, setPf] = useState(emptyProduct);
// Ligne 64: Declare une variable locale utilisee par le composant.
  const [ps, setPs] = useState("");
// Ligne 65: Declare une variable locale utilisee par le composant.
  const [showInactive, setShowInactive] = useState(false);
// Ligne 66: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 67: Declare une variable locale utilisee par le composant.
  const [saleProductId, setSaleProductId] = useState("");
// Ligne 68: Declare une variable locale utilisee par le composant.
  const [saleQty, setSaleQty] = useState("1");
// Ligne 69: Declare une variable locale utilisee par le composant.
  const [saleItems, setSaleItems] = useState([]);
// Ligne 70: Declare une variable locale utilisee par le composant.
  const [saleMessage, setSaleMessage] = useState("");
// Ligne 71: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 72: Declare une variable locale utilisee par le composant.
  const [newClientName, setNewClientName] = useState("");
// Ligne 73: Declare une variable locale utilisee par le composant.
  const [newClientEmail, setNewClientEmail] = useState("");
// Ligne 74: Declare une variable locale utilisee par le composant.
  const [clientMessage, setClientMessage] = useState("");
// Ligne 75: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 76: Declare une variable locale utilisee par le composant.
  const [profileName, setProfileName] = useState("");
// Ligne 77: Declare une variable locale utilisee par le composant.
  const [profileEmail, setProfileEmail] = useState("");
// Ligne 78: Declare une variable locale utilisee par le composant.
  const [profileMessage, setProfileMessage] = useState("");
// Ligne 79: Declare une variable locale utilisee par le composant.
  const [oldPwd, setOldPwd] = useState("");
// Ligne 80: Declare une variable locale utilisee par le composant.
  const [newPwd, setNewPwd] = useState("");
// Ligne 81: Declare une variable locale utilisee par le composant.
  const [confirmPwd, setConfirmPwd] = useState("");
// Ligne 82: Declare une variable locale utilisee par le composant.
  const [pwdMessage, setPwdMessage] = useState("");
// Ligne 83: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 84: Declare une variable locale utilisee par le composant.
  const [sellerName, setSellerName] = useState("");
// Ligne 85: Declare une variable locale utilisee par le composant.
  const [sellerEmail, setSellerEmail] = useState("");
// Ligne 86: Declare une variable locale utilisee par le composant.
  const [sellerPwd, setSellerPwd] = useState("");
// Ligne 87: Declare une variable locale utilisee par le composant.
  const [sellerRole, setSellerRole] = useState("seller");
// Ligne 88: Declare une variable locale utilisee par le composant.
  const [sellerMessage, setSellerMessage] = useState("");
// Ligne 89: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 90: Declare une variable locale utilisee par le composant.
  const user = useMemo(() => session?.userId ? (data.users.find((u) => u.id === session.userId && u.active !== false) ?? null) : null, [data.users, session?.userId]);
// Ligne 91: Declare une variable locale utilisee par le composant.
  const isAdmin = user?.role === "admin";
// Ligne 92: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 93: Declare une fonction (handler, utilitaire ou composant).
  useEffect(() => { localStorage.setItem(DATA_KEY, JSON.stringify(data)); }, [data]);
// Ligne 94: Declare une fonction (handler, utilitaire ou composant).
  useEffect(() => { if (!session) localStorage.removeItem(SESSION_KEY); else localStorage.setItem(SESSION_KEY, JSON.stringify(session)); }, [session]);
// Ligne 95: Declare une fonction (handler, utilitaire ou composant).
  useEffect(() => { if (!user) return; setProfileName(user.name || ""); setProfileEmail(user.email || ""); }, [user?.name, user?.email]);
// Ligne 96: Declare une fonction (handler, utilitaire ou composant).
  useEffect(() => {
// Ligne 97: Applique une condition pour brancher le flux d execution.
    if (!user) return undefined;
// Ligne 98: Declare une variable locale utilisee par le composant.
    const ping = () => setSession((s) => s ? { ...s, lastActivityAt: Date.now() } : s);
// Ligne 99: Declare une variable locale utilisee par le composant.
    const i = setInterval(() => setSession((s) => {
// Ligne 100: Applique une condition pour brancher le flux d execution.
      if (!s) return s;
// Ligne 101: Declare une variable locale utilisee par le composant.
      const last = s.lastActivityAt ?? s.loginAt ?? Date.now();
// Ligne 102: Applique une condition pour brancher le flux d execution.
      if (Date.now() - last > TIMEOUT_MS) { setAuthMessage("Session expir�e (30 minutes)."); return null; }
// Ligne 103: Retourne une valeur depuis la fonction en cours.
      return s;
// Ligne 104: Ferme un bloc de code ou une structure de donnees.
    }), 30000);
// Ligne 105: Effectue une affectation ou initialise une valeur.
    ["click", "keydown", "mousemove"].forEach((e) => window.addEventListener(e, ping, { passive: true }));
// Ligne 106: Declare une fonction (handler, utilitaire ou composant).
    return () => { clearInterval(i); ["click", "keydown", "mousemove"].forEach((e) => window.removeEventListener(e, ping)); };
// Ligne 107: Ferme un bloc de code ou une structure de donnees.
  }, [user]);
// Ligne 108: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 109: Declare une variable locale utilisee par le composant.
  const products = useMemo(() => data.products.filter((p) => showInactive ? true : p.active !== false).filter((p) => !ps.trim() || `${p.sku} ${p.name} ${p.category}`.toLowerCase().includes(ps.toLowerCase())), [data.products, ps, showInactive]);
// Ligne 110: Declare une variable locale utilisee par le composant.
  const saleTotals = useMemo(() => {
// Ligne 111: Declare une variable locale utilisee par le composant.
    const ht = round(saleItems.reduce((s, i) => s + i.unitPriceHt * i.quantity, 0));
// Ligne 112: Declare une variable locale utilisee par le composant.
    const tva = round(saleItems.reduce((s, i) => s + i.unitPriceHt * i.quantity * (i.tvaRate / 100), 0));
// Ligne 113: Retourne une valeur depuis la fonction en cours.
    return { ht, tva, ttc: round(ht + tva) };
// Ligne 114: Ferme un bloc de code ou une structure de donnees.
  }, [saleItems]);
// Ligne 115: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 116: Declare une variable locale utilisee par le composant.
  const kpi = useMemo(() => {
// Ligne 117: Declare une variable locale utilisee par le composant.
    const totalRevenue = data.inStoreSales.reduce((s, v) => s + Number(v.totalTtc ?? 0), 0) + data.onlineOrders.reduce((s, o) => s + Number(o.total ?? 0), 0);
// Ligne 118: Declare une variable locale utilisee par le composant.
    const salesCount = data.inStoreSales.length + data.onlineOrders.length;
// Ligne 119: Declare une variable locale utilisee par le composant.
    const averageBasket = salesCount ? round(totalRevenue / salesCount) : 0;
// Ligne 120: Retourne une valeur depuis la fonction en cours.
    return {
// Ligne 121: Execute cette instruction: totalRevenue,
      totalRevenue,
// Ligne 122: Execute cette instruction: salesCount,
      salesCount,
// Ligne 123: Execute cette instruction: averageBasket,
      averageBasket,
// Ligne 124: Execute cette instruction: clients: data.clients.length,
      clients: data.clients.length,
// Ligne 125: Effectue une affectation ou initialise une valeur.
      low: data.products.filter((p) => p.active !== false && p.stock <= data.stockAlertThreshold && p.stock > 0).length,
// Ligne 126: Effectue une affectation ou initialise une valeur.
      out: data.products.filter((p) => p.active !== false && p.stock <= 0).length,
// Ligne 127: Effectue une affectation ou initialise une valeur.
      pending: data.onlineOrders.filter((o) => o.status === "En attente").length,
// Ligne 128: Ferme un bloc de code ou une structure de donnees.
    };
// Ligne 129: Ferme un bloc de code ou une structure de donnees.
  }, [data]);
// Ligne 130: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 131: Declare une variable locale utilisee par le composant.
  const login = (e) => {
// Ligne 132: Execute cette instruction: e.preventDefault();
    e.preventDefault();
// Ligne 133: Declare une variable locale utilisee par le composant.
    const found = data.users.find((u) => u.active !== false && u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
// Ligne 134: Applique une condition pour brancher le flux d execution.
    if (!found) { setAuthMessage("Identifiants invalides."); return; }
// Ligne 135: Execute cette instruction: setSession({ userId: found.id, loginAt: Date.now(), lastActivityAt: Date.now() });
    setSession({ userId: found.id, loginAt: Date.now(), lastActivityAt: Date.now() });
// Ligne 136: Execute cette instruction: setEmail(""); setPassword(""); setAuthMessage(""); setTab("kpi");
    setEmail(""); setPassword(""); setAuthMessage(""); setTab("kpi");
// Ligne 137: Ferme un bloc de code ou une structure de donnees.
  };
// Ligne 138: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 139: Declare une variable locale utilisee par le composant.
  const sendReset = (e) => {
// Ligne 140: Execute cette instruction: e.preventDefault();
    e.preventDefault();
// Ligne 141: Declare une variable locale utilisee par le composant.
    const ok = data.users.some((u) => u.active !== false && u.email.toLowerCase() === resetEmail.trim().toLowerCase());
// Ligne 142: Execute cette instruction: setResetMessage(ok ? `Lien temporaire envoy� � ${resetEmail.trim().toLowerCase()} (simulation).` : "Aucun compte corr...
    setResetMessage(ok ? `Lien temporaire envoy� � ${resetEmail.trim().toLowerCase()} (simulation).` : "Aucun compte correspondant.");
// Ligne 143: Ferme un bloc de code ou une structure de donnees.
  };
// Ligne 144: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 145: Declare une variable locale utilisee par le composant.
  const saveProduct = (e) => {
// Ligne 146: Execute cette instruction: e.preventDefault();
    e.preventDefault();
// Ligne 147: Declare une variable locale utilisee par le composant.
    const ht = Number(pf.priceHt); const tva = Number(pf.tvaRate); const stock = Number(pf.stock);
// Ligne 148: Applique une condition pour brancher le flux d execution.
    if (!pf.sku || !pf.name || Number.isNaN(ht) || Number.isNaN(tva) || Number.isNaN(stock)) return;
// Ligne 149: Declare une variable locale utilisee par le composant.
    const p = { id: pf.id || `p_${Date.now()}`, sku: pf.sku, name: pf.name, category: pf.category, priceHt: round(ht), tvaRate: round(tva), priceTtc: round(ht * (1 + tva / 100)), stock: round(stock), active: true };
// Ligne 150: Parcourt une collection pour generer une liste d elements.
    setData((d) => ({ ...d, products: d.products.some((x) => x.id === p.id) ? d.products.map((x) => x.id === p.id ? { ...x, ...p } : x) : [p, ...d.products] }));
// Ligne 151: Execute cette instruction: setPf(emptyProduct);
    setPf(emptyProduct);
// Ligne 152: Ferme un bloc de code ou une structure de donnees.
  };
// Ligne 153: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 154: Declare une variable locale utilisee par le composant.
  const addSaleItem = () => {
// Ligne 155: Declare une variable locale utilisee par le composant.
    const p = data.products.find((x) => x.id === saleProductId); const q = Number(saleQty);
// Ligne 156: Applique une condition pour brancher le flux d execution.
    if (!p || !q || q <= 0 || q > Number(p.stock)) { setSaleMessage("Produit/quantit� invalide ou stock insuffisant."); return; }
// Ligne 157: Declare une fonction (handler, utilitaire ou composant).
    setSaleItems((prev) => {
// Ligne 158: Declare une variable locale utilisee par le composant.
      const ex = prev.find((i) => i.productId === p.id);
// Ligne 159: Retourne une valeur depuis la fonction en cours.
      return ex ? prev.map((i) => i.productId === p.id ? { ...i, quantity: i.quantity + q } : i) : [...prev, { productId: p.id, name: p.name, unitPriceHt: Number(p.priceHt), unitPriceTtc: Number(p.priceTtc), tvaRate: Number(p.tvaRate), quantity: q }];
// Ligne 160: Ferme un bloc de code ou une structure de donnees.
    });
// Ligne 161: Execute cette instruction: setSaleProductId(""); setSaleQty("1"); setSaleMessage("");
    setSaleProductId(""); setSaleQty("1"); setSaleMessage("");
// Ligne 162: Ferme un bloc de code ou une structure de donnees.
  };
// Ligne 163: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 164: Declare une variable locale utilisee par le composant.
  const registerSale = (e) => {
// Ligne 165: Execute cette instruction: e.preventDefault();
    e.preventDefault();
// Ligne 166: Applique une condition pour brancher le flux d execution.
    if (!saleItems.length) { setSaleMessage("Ajoutez des produits � la vente."); return; }
// Ligne 167: Declare une variable locale utilisee par le composant.
    const sale = { id: `MAG-${Date.now().toString().slice(-6)}`, createdAt: new Date().toISOString(), totalHt: saleTotals.ht, totalTva: saleTotals.tva, totalTtc: saleTotals.ttc, items: saleItems };
// Ligne 168: Declare une fonction (handler, utilitaire ou composant).
    setData((d) => ({ ...d, inStoreSales: [sale, ...d.inStoreSales], products: d.products.map((p) => { const line = saleItems.find((i) => i.productId === p.id); return line ? { ...p, stock: round(Math.max(0, Number(p.stock) - line.quantity)) } : p; }) }));
// Ligne 169: Execute cette instruction: setSaleItems([]); setSaleMessage(`Vente ${sale.id} enregistr�e.`);
    setSaleItems([]); setSaleMessage(`Vente ${sale.id} enregistr�e.`);
// Ligne 170: Ferme un bloc de code ou une structure de donnees.
  };
// Ligne 171: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 172: Declare une variable locale utilisee par le composant.
  const addClient = (e) => {
// Ligne 173: Execute cette instruction: e.preventDefault();
    e.preventDefault();
// Ligne 174: Applique une condition pour brancher le flux d execution.
    if (!newClientName.trim() || !newClientEmail.trim()) { setClientMessage("Nom et email obligatoires."); return; }
// Ligne 175: Applique une condition pour brancher le flux d execution.
    if (data.clients.some((c) => c.email.toLowerCase() === newClientEmail.trim().toLowerCase())) { setClientMessage("Client d�j� existant."); return; }
// Ligne 176: Declare une variable locale utilisee par le composant.
    const c = { id: `c_${Date.now()}`, name: newClientName.trim(), email: newClientEmail.trim() };
// Ligne 177: Effectue une affectation ou initialise une valeur.
    setData((d) => ({ ...d, clients: [c, ...d.clients] }));
// Ligne 178: Execute cette instruction: setNewClientName(""); setNewClientEmail(""); setClientMessage("Client cr��.");
    setNewClientName(""); setNewClientEmail(""); setClientMessage("Client cr��.");
// Ligne 179: Ferme un bloc de code ou une structure de donnees.
  };
// Ligne 180: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 181: Declare une variable locale utilisee par le composant.
  const saveProfile = (e) => {
// Ligne 182: Execute cette instruction: e.preventDefault();
    e.preventDefault();
// Ligne 183: Parcourt une collection pour generer une liste d elements.
    setData((d) => ({ ...d, users: d.users.map((u) => u.id === user.id ? { ...u, name: profileName.trim(), email: profileEmail.trim() } : u) }));
// Ligne 184: Execute cette instruction: setProfileMessage("Profil mis � jour.");
    setProfileMessage("Profil mis � jour.");
// Ligne 185: Ferme un bloc de code ou une structure de donnees.
  };
// Ligne 186: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 187: Declare une variable locale utilisee par le composant.
  const changePwd = (e) => {
// Ligne 188: Execute cette instruction: e.preventDefault();
    e.preventDefault();
// Ligne 189: Applique une condition pour brancher le flux d execution.
    if (oldPwd !== user.password) { setPwdMessage("Ancien mot de passe incorrect."); return; }
// Ligne 190: Applique une condition pour brancher le flux d execution.
    if (newPwd.length < 8) { setPwdMessage("Minimum 8 caract�res."); return; }
// Ligne 191: Applique une condition pour brancher le flux d execution.
    if (newPwd !== confirmPwd) { setPwdMessage("La confirmation ne correspond pas."); return; }
// Ligne 192: Parcourt une collection pour generer une liste d elements.
    setData((d) => ({ ...d, users: d.users.map((u) => u.id === user.id ? { ...u, password: newPwd } : u) }));
// Ligne 193: Execute cette instruction: setOldPwd(""); setNewPwd(""); setConfirmPwd(""); setPwdMessage("Mot de passe modifi�.");
    setOldPwd(""); setNewPwd(""); setConfirmPwd(""); setPwdMessage("Mot de passe modifi�.");
// Ligne 194: Ferme un bloc de code ou une structure de donnees.
  };
// Ligne 195: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 196: Declare une variable locale utilisee par le composant.
  const createSeller = (e) => {
// Ligne 197: Execute cette instruction: e.preventDefault();
    e.preventDefault();
// Ligne 198: Applique une condition pour brancher le flux d execution.
    if (!isAdmin) return;
// Ligne 199: Applique une condition pour brancher le flux d execution.
    if (!sellerName.trim() || !sellerEmail.trim() || !sellerPwd.trim()) { setSellerMessage("Nom, email, mot de passe obligatoires."); return; }
// Ligne 200: Applique une condition pour brancher le flux d execution.
    if (data.users.some((u) => u.email.toLowerCase() === sellerEmail.trim().toLowerCase())) { setSellerMessage("Email d�j� utilis�."); return; }
// Ligne 201: Declare une variable locale utilisee par le composant.
    const nu = { id: `u_${Date.now()}`, role: sellerRole, name: sellerName.trim(), email: sellerEmail.trim(), password: sellerPwd.trim(), active: true };
// Ligne 202: Effectue une affectation ou initialise une valeur.
    setData((d) => ({ ...d, users: [nu, ...d.users] }));
// Ligne 203: Execute cette instruction: setSellerName(""); setSellerEmail(""); setSellerPwd(""); setSellerRole("seller"); setSellerMessage("Compte cr��.");
    setSellerName(""); setSellerEmail(""); setSellerPwd(""); setSellerRole("seller"); setSellerMessage("Compte cr��.");
// Ligne 204: Ferme un bloc de code ou une structure de donnees.
  };
// Ligne 205: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 206: Applique une condition pour brancher le flux d execution.
  if (!user) {
// Ligne 207: Commence le JSX retourne pour l affichage de l interface.
    return (
// Ligne 208: Ouvre un element JSX qui compose l interface utilisateur.
      <main className="dashboard-auth-page">
// Ligne 209: Ouvre un element JSX qui compose l interface utilisateur.
        <section className="dashboard-auth-card">
// Ligne 210: Ouvre un element JSX qui compose l interface utilisateur.
          <h1>Dashboard Vendeur CafTh�</h1>
// Ligne 211: Ouvre un element JSX qui compose l interface utilisateur.
          <p>Connexion s�curis�e avec expiration de session (30 min).</p>
// Ligne 212: Ouvre un element JSX qui compose l interface utilisateur.
          <form className="dashboard-auth-form" onSubmit={login}>
// Ligne 213: Ouvre un element JSX qui compose l interface utilisateur.
            <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
// Ligne 214: Ouvre un element JSX qui compose l interface utilisateur.
            <label>Mot de passe<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
// Ligne 215: Effectue une affectation ou initialise une valeur.
            {authMessage && <p className="form-feedback error">{authMessage}</p>}
// Ligne 216: Ouvre un element JSX qui compose l interface utilisateur.
            <button type="submit" className="primary">Se connecter</button>
// Ligne 217: Ferme un element JSX dans l arborescence du rendu.
          </form>
// Ligne 218: Ouvre un element JSX qui compose l interface utilisateur.
          <form className="dashboard-auth-reset" onSubmit={sendReset}>
// Ligne 219: Ouvre un element JSX qui compose l interface utilisateur.
            <h3>Mot de passe oubli�</h3>
// Ligne 220: Ouvre un element JSX qui compose l interface utilisateur.
            <div className="form-row"><input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="email@cafthe.fr" required /><button type="submit" className="ghost">Envoyer lien</button></div>
// Ligne 221: Effectue une affectation ou initialise une valeur.
            {resetMessage && <p className="form-feedback success">{resetMessage}</p>}
// Ligne 222: Ferme un element JSX dans l arborescence du rendu.
          </form>
// Ligne 223: Ouvre un element JSX qui compose l interface utilisateur.
          <div className="dashboard-auth-help"><p>`admin@cafthe.fr / Admin123!`</p><p>`vendeur@cafthe.fr / Vendeur123!`</p></div>
// Ligne 224: Ferme un element JSX dans l arborescence du rendu.
        </section>
// Ligne 225: Ferme un element JSX dans l arborescence du rendu.
      </main>
// Ligne 226: Execute cette instruction: );
    );
// Ligne 227: Ferme un bloc de code ou une structure de donnees.
  }
// Ligne 228: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 229: Declare une variable locale utilisee par le composant.
  const tabs = [{ key: "kpi", label: "Dashboard" }, { key: "products", label: "Produits" }, { key: "sales", label: "Ventes magasin" }, { key: "orders", label: "Commandes web" }, { key: "clients", label: "Clients" }, { key: "profile", label: "Profil" }, ...(isAdmin ? [{ key: "users", label: "Comptes vendeurs" }] : [])];
// Ligne 230: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 231: Commence le JSX retourne pour l affichage de l interface.
  return (
// Ligne 232: Ouvre un element JSX qui compose l interface utilisateur.
    <main className="dashboard-page">
// Ligne 233: Ouvre un element JSX qui compose l interface utilisateur.
      <header className="dashboard-header"><div><h1>Dashboard CafTh�</h1><p>{user.name} - {isAdmin ? "Administrateur" : "Vendeur"}</p></div><button type="button" className="primary" onClick={() => setSession(null)}>D�connexion</button></header>
// Ligne 234: Ouvre un element JSX qui compose l interface utilisateur.
      <div className="dashboard-layout">
// Ligne 235: Ouvre un element JSX qui compose l interface utilisateur.
        <aside className="dashboard-sidebar">{tabs.map((t) => <button key={t.key} type="button" className={tab === t.key ? "active" : ""} onClick={() => setTab(t.key)}>{t.label}</button>)}</aside>
// Ligne 236: Ouvre un element JSX qui compose l interface utilisateur.
        <section className="dashboard-content">
// Ligne 237: Effectue une affectation ou initialise une valeur.
          {tab === "kpi" && <div className="dashboard-section"><h2>KPI</h2><div className="dashboard-kpi-grid"><article className="kpi-card"><span>CA global</span><strong>{kpi.totalRevenue.toFixed(2)} �</strong></article><article className="kpi-card"><span>Ventes</span><strong>{kpi.salesCount}</strong></article><article className="kpi-card"><span>Panier moyen</span><strong>{kpi.averageBasket.toFixed(2)} �</strong></article><article className="kpi-card"><span>Clients</span><strong>{kpi.clients}</strong></article></div><div className="dashboard-alert-grid"><div className="alert-box"><h4>Stock faible</h4><p>{kpi.low}</p></div><div className="alert-box"><h4>Rupture</h4><p>{kpi.out}</p></div><div className="alert-box"><h4>Commandes en attente</h4><p>{kpi.pending}</p></div></div></div>}
// Ligne 238: Declare une fonction (handler, utilitaire ou composant).
          {tab === "products" && <div className="dashboard-section"><h2>Produits (CRUD)</h2><form className="dashboard-form" onSubmit={saveProduct}><div className="form-grid"><label>SKU*<input value={pf.sku} onChange={(e) => setPf((p) => ({ ...p, sku: e.target.value }))} required /></label><label>Nom*<input value={pf.name} onChange={(e) => setPf((p) => ({ ...p, name: e.target.value }))} required /></label><label>Cat�gorie*<select value={pf.category} onChange={(e) => { const c = e.target.value; setPf((p) => ({ ...p, category: c, tvaRate: c === "Accessoire" ? "20" : "5.5" })); }}><option>Th�</option><option>Caf�</option><option>Accessoire</option></select></label><label>Prix HT*<input type="number" step="0.01" value={pf.priceHt} onChange={(e) => setPf((p) => ({ ...p, priceHt: e.target.value }))} required /></label><label>TVA*<input type="number" step="0.1" value={pf.tvaRate} onChange={(e) => setPf((p) => ({ ...p, tvaRate: e.target.value }))} required /></label><label>Stock*<input type="number" value={pf.stock} onChange={(e) => setPf((p) => ({ ...p, stock: e.target.value }))} required /></label></div><div className="form-actions"><button type="submit" className="primary">{pf.id ? "Mettre � jour" : "Cr�er"}</button><button type="button" className="ghost" onClick={() => setPf(emptyProduct)}>R�initialiser</button></div></form><div className="table-toolbar"><input type="search" value={ps} onChange={(e) => setPs(e.target.value)} placeholder="Recherche" /><label className="inline-check"><input type="checkbox" checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)} />Afficher d�sactiv�s</label></div><div className="table-wrap"><table className="dashboard-table"><thead><tr><th>SKU</th><th>Nom</th><th>Cat�gorie</th><th>Prix TTC</th><th>Stock</th><th>�tat</th><th>Actions</th></tr></thead><tbody>{products.map((p) => <tr key={p.id}><td>{p.sku}</td><td>{p.name}</td><td>{p.category}</td><td>{p.priceTtc.toFixed(2)} �</td><td>{p.stock}</td><td><span className={`badge ${p.active !== false ? "ok" : "muted"}`}>{p.active !== false ? "Actif" : "D�sactiv�"}</span></td><td className="table-actions"><button type="button" onClick={() => setPf({ id: p.id, sku: p.sku, name: p.name, category: p.category, priceHt: String(p.priceHt), tvaRate: String(p.tvaRate), stock: String(p.stock) })}>�diter</button>{p.active !== false ? <button type="button" className="danger" onClick={() => setData((d) => ({ ...d, products: d.products.map((x) => x.id === p.id ? { ...x, active: false } : x) }))}>D�sactiver</button> : <button type="button" onClick={() => setData((d) => ({ ...d, products: d.products.map((x) => x.id === p.id ? { ...x, active: true } : x) }))}>R�activer</button>}</td></tr>)}</tbody></table></div></div>}
// Ligne 239: Parcourt une collection pour generer une liste d elements.
          {tab === "sales" && <div className="dashboard-section"><h2>Ventes magasin</h2><form className="dashboard-form" onSubmit={registerSale}><div className="form-row"><select value={saleProductId} onChange={(e) => setSaleProductId(e.target.value)}><option value="">Choisir produit</option>{data.products.filter((p) => p.active !== false).map((p) => <option key={p.id} value={p.id}>{p.name} ({p.stock})</option>)}</select><input type="number" min="1" value={saleQty} onChange={(e) => setSaleQty(e.target.value)} /><button type="button" className="ghost" onClick={addSaleItem}>Ajouter</button></div><div className="table-wrap"><table className="dashboard-table compact"><thead><tr><th>Produit</th><th>Qt�</th><th>Total TTC</th><th /></tr></thead><tbody>{saleItems.map((i) => <tr key={i.productId}><td>{i.name}</td><td>{i.quantity}</td><td>{round(i.unitPriceTtc * i.quantity).toFixed(2)} �</td><td><button type="button" className="danger" onClick={() => setSaleItems((arr) => arr.filter((x) => x.productId !== i.productId))}>Retirer</button></td></tr>)}</tbody></table></div><div className="summary-block"><div><span>Total HT</span><strong>{saleTotals.ht.toFixed(2)} �</strong></div><div><span>TVA</span><strong>{saleTotals.tva.toFixed(2)} �</strong></div><div><span>Total TTC</span><strong>{saleTotals.ttc.toFixed(2)} �</strong></div></div><button type="submit" className="primary">Enregistrer vente</button>{saleMessage && <p className="form-feedback success">{saleMessage}</p>}</form></div>}
// Ligne 240: Parcourt une collection pour generer une liste d elements.
          {tab === "orders" && <div className="dashboard-section"><h2>Commandes en ligne</h2><div className="table-wrap"><table className="dashboard-table"><thead><tr><th>Commande</th><th>Client</th><th>Total</th><th>Statut</th></tr></thead><tbody>{data.onlineOrders.map((o) => <tr key={o.id}><td>{o.id}</td><td>{o.clientEmail || "-"}</td><td>{Number(o.total).toFixed(2)} �</td><td><select value={o.status} onChange={(e) => setData((d) => ({ ...d, onlineOrders: d.onlineOrders.map((x) => String(x.id) === String(o.id) ? { ...x, status: e.target.value } : x) }))}>{STATUSES.map((s) => <option key={`${o.id}-${s}`} value={s}>{s}</option>)}</select></td></tr>)}</tbody></table></div></div>}
// Ligne 241: Parcourt une collection pour generer une liste d elements.
          {tab === "clients" && <div className="dashboard-section"><h2>Clients</h2><form className="dashboard-form" onSubmit={addClient}><div className="form-row"><input value={newClientName} onChange={(e) => setNewClientName(e.target.value)} placeholder="Nom" /><input type="email" value={newClientEmail} onChange={(e) => setNewClientEmail(e.target.value)} placeholder="Email" /><button type="submit" className="primary">Ajouter</button></div>{clientMessage && <p className="form-feedback success">{clientMessage}</p>}</form><div className="table-wrap"><table className="dashboard-table"><thead><tr><th>Nom</th><th>Email</th></tr></thead><tbody>{data.clients.map((c) => <tr key={c.id}><td>{c.name}</td><td>{c.email}</td></tr>)}</tbody></table></div></div>}
// Ligne 242: Associe une reaction a la modification d un champ de formulaire.
          {tab === "profile" && <div className="dashboard-section"><h2>Mon profil</h2><form className="dashboard-form" onSubmit={saveProfile}><div className="form-row"><input value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Nom" /><input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} placeholder="Email" /><button type="submit" className="primary">Enregistrer</button></div>{profileMessage && <p className="form-feedback success">{profileMessage}</p>}</form><form className="dashboard-form" onSubmit={changePwd}><h3>Changer mot de passe</h3><div className="form-row"><input type="password" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} placeholder="Ancien" required /><input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} placeholder="Nouveau" required /><input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} placeholder="Confirmation" required /><button type="submit" className="primary">Mettre � jour</button></div>{pwdMessage && <p className={`form-feedback ${pwdMessage.includes("modifi�") ? "success" : "error"}`}>{pwdMessage}</p>}</form></div>}
// Ligne 243: Parcourt une collection pour generer une liste d elements.
          {tab === "users" && isAdmin && <div className="dashboard-section"><h2>Comptes vendeurs</h2><form className="dashboard-form" onSubmit={createSeller}><div className="form-row"><input value={sellerName} onChange={(e) => setSellerName(e.target.value)} placeholder="Nom" /><input type="email" value={sellerEmail} onChange={(e) => setSellerEmail(e.target.value)} placeholder="Email" /><select value={sellerRole} onChange={(e) => setSellerRole(e.target.value)}><option value="seller">Vendeur</option><option value="admin">Admin</option></select><input value={sellerPwd} onChange={(e) => setSellerPwd(e.target.value)} placeholder="Mot de passe" /><button type="submit" className="primary">Cr�er</button></div>{sellerMessage && <p className="form-feedback success">{sellerMessage}</p>}</form><div className="table-wrap"><table className="dashboard-table"><thead><tr><th>Nom</th><th>Email</th><th>R�le</th><th>�tat</th><th>Action</th></tr></thead><tbody>{data.users.map((u) => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td><span className={`badge ${u.active !== false ? "ok" : "muted"}`}>{u.active !== false ? "Actif" : "D�sactiv�"}</span></td><td>{u.active !== false ? <button type="button" className="danger" onClick={() => setData((d) => ({ ...d, users: d.users.map((x) => x.id === u.id ? { ...x, active: false } : x) }))}>D�sactiver</button> : <button type="button" onClick={() => setData((d) => ({ ...d, users: d.users.map((x) => x.id === u.id ? { ...x, active: true } : x) }))}>R�activer</button>}</td></tr>)}</tbody></table></div></div>}
// Ligne 244: Ferme un element JSX dans l arborescence du rendu.
        </section>
// Ligne 245: Ferme un element JSX dans l arborescence du rendu.
      </div>
// Ligne 246: Ferme un element JSX dans l arborescence du rendu.
    </main>
// Ligne 247: Execute cette instruction: );
  );
// Ligne 248: Ferme un bloc de code ou une structure de donnees.
};
// Ligne 249: Ligne vide pour aerer le code et separer les blocs logiques.

// Ligne 250: Expose ce composant comme export par defaut du fichier.
export default Dashboard;
// Ligne 251: Ligne vide pour aerer le code et separer les blocs logiques.
