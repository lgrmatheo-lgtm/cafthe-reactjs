/**
 * @file Dashboard.jsx
 * Role: Back-office vendeur/admin.
 * Comment c est fait: Regroupe auth dashboard, CRUD produits, commandes, clients et KPI dans des modules relies.
 * Note junior: commence par ce resume, puis lis les hooks et les handlers dans l ordre.
 */
import React, { useEffect, useMemo, useState } from "react";
import "../styles/Dashboard.css";

const DATA_KEY = "cafthe_dash_data_v2";
const SESSION_KEY = "cafthe_dash_session_v2";
const ORDER_KEY = "cafthe_orders";
const TIMEOUT_MS = 30 * 60 * 1000;
const STATUSES = ["En attente", "En préparation", "Expédiée", "Livrée"];

const readJson = (k, fb) => { try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fb; } catch { return fb; } };
const round = (v) => Math.round((Number(v) + Number.EPSILON) * 100) / 100;

const defaults = {
  users: [
    { id: "u_admin", role: "admin", name: "Admin CafThé", email: "admin@cafthe.fr", password: "Admin123!", active: true },
    { id: "u_seller", role: "seller", name: "Vendeur CafThé", email: "vendeur@cafthe.fr", password: "Vendeur123!", active: true },
  ],
  products: [
    { id: "p1", sku: "CAF-ARA-250", name: "Arabica Premium", category: "Café", priceHt: 10.42, tvaRate: 5.5, priceTtc: 10.99, stock: 1800, active: true },
    { id: "p2", sku: "THE-EAR-100", name: "Earl Grey Impérial", category: "Thé", priceHt: 9, tvaRate: 5.5, priceTtc: 9.5, stock: 2200, active: true },
    { id: "p3", sku: "ACC-MUG-001", name: "Mug dégustation", category: "Accessoire", priceHt: 12.5, tvaRate: 20, priceTtc: 15, stock: 35, active: true },
  ],
  clients: [{ id: "c1", name: "Marie Dupont", email: "marie@cafthe.fr" }],
  inStoreSales: [],
  onlineOrders: [],
  stockAlertThreshold: 10,
};

const loadData = () => {
  const raw = readJson(DATA_KEY, null);
  const base = raw ? { ...defaults, ...raw } : defaults;
  const incoming = readJson(ORDER_KEY, []).map((o) => ({
    id: o.id ?? `WEB-${Date.now()}`,
    status: STATUSES.includes(o.status) ? o.status : o.status === "En cours" ? "En attente" : "En attente",
    total: Number(o.total ?? 0),
    clientEmail: o.clientEmail ?? "",
    createdAt: o.createdAt ?? o.emailSentAt ?? new Date().toISOString(),
    items: (o.items ?? []).map((i) => ({ id: i.id, name: i.name ?? "Produit", quantity: Number(i.quantity ?? 1), price: Number(i.price ?? 0) })),
  }));
  const map = new Map();
  [...(base.onlineOrders ?? []), ...incoming].forEach((o) => map.set(String(o.id), o));
  return { ...base, onlineOrders: Array.from(map.values()) };
};

const emptyProduct = { id: "", sku: "", name: "", category: "Thé", priceHt: "", tvaRate: "5.5", stock: "" };

const Dashboard = () => {
  const [data, setData] = useState(loadData);
  const [session, setSession] = useState(() => readJson(SESSION_KEY, null));
  const [tab, setTab] = useState("kpi");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const [pf, setPf] = useState(emptyProduct);
  const [ps, setPs] = useState("");
  const [showInactive, setShowInactive] = useState(false);

  const [saleProductId, setSaleProductId] = useState("");
  const [saleQty, setSaleQty] = useState("1");
  const [saleItems, setSaleItems] = useState([]);
  const [saleMessage, setSaleMessage] = useState("");

  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [clientMessage, setClientMessage] = useState("");

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMessage, setPwdMessage] = useState("");

  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPwd, setSellerPwd] = useState("");
  const [sellerRole, setSellerRole] = useState("seller");
  const [sellerMessage, setSellerMessage] = useState("");

  const user = useMemo(() => session?.userId ? (data.users.find((u) => u.id === session.userId && u.active !== false) ?? null) : null, [data.users, session?.userId]);
  const isAdmin = user?.role === "admin";

  useEffect(() => { localStorage.setItem(DATA_KEY, JSON.stringify(data)); }, [data]);
  useEffect(() => { if (!session) localStorage.removeItem(SESSION_KEY); else localStorage.setItem(SESSION_KEY, JSON.stringify(session)); }, [session]);
  useEffect(() => { if (!user) return; setProfileName(user.name || ""); setProfileEmail(user.email || ""); }, [user?.name, user?.email]);
  useEffect(() => {
    if (!user) return undefined;
    const ping = () => setSession((s) => s ? { ...s, lastActivityAt: Date.now() } : s);
    const i = setInterval(() => setSession((s) => {
      if (!s) return s;
      const last = s.lastActivityAt ?? s.loginAt ?? Date.now();
      if (Date.now() - last > TIMEOUT_MS) { setAuthMessage("Session expirée (30 minutes)."); return null; }
      return s;
    }), 30000);
    ["click", "keydown", "mousemove"].forEach((e) => window.addEventListener(e, ping, { passive: true }));
    return () => { clearInterval(i); ["click", "keydown", "mousemove"].forEach((e) => window.removeEventListener(e, ping)); };
  }, [user]);

  const products = useMemo(() => data.products.filter((p) => showInactive ? true : p.active !== false).filter((p) => !ps.trim() || `${p.sku} ${p.name} ${p.category}`.toLowerCase().includes(ps.toLowerCase())), [data.products, ps, showInactive]);
  const saleTotals = useMemo(() => {
    const ht = round(saleItems.reduce((s, i) => s + i.unitPriceHt * i.quantity, 0));
    const tva = round(saleItems.reduce((s, i) => s + i.unitPriceHt * i.quantity * (i.tvaRate / 100), 0));
    return { ht, tva, ttc: round(ht + tva) };
  }, [saleItems]);

  const kpi = useMemo(() => {
    const totalRevenue = data.inStoreSales.reduce((s, v) => s + Number(v.totalTtc ?? 0), 0) + data.onlineOrders.reduce((s, o) => s + Number(o.total ?? 0), 0);
    const salesCount = data.inStoreSales.length + data.onlineOrders.length;
    const averageBasket = salesCount ? round(totalRevenue / salesCount) : 0;
    return {
      totalRevenue,
      salesCount,
      averageBasket,
      clients: data.clients.length,
      low: data.products.filter((p) => p.active !== false && p.stock <= data.stockAlertThreshold && p.stock > 0).length,
      out: data.products.filter((p) => p.active !== false && p.stock <= 0).length,
      pending: data.onlineOrders.filter((o) => o.status === "En attente").length,
    };
  }, [data]);

  const login = (e) => {
    e.preventDefault();
    const found = data.users.find((u) => u.active !== false && u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
    if (!found) { setAuthMessage("Identifiants invalides."); return; }
    setSession({ userId: found.id, loginAt: Date.now(), lastActivityAt: Date.now() });
    setEmail(""); setPassword(""); setAuthMessage(""); setTab("kpi");
  };

  const sendReset = (e) => {
    e.preventDefault();
    const ok = data.users.some((u) => u.active !== false && u.email.toLowerCase() === resetEmail.trim().toLowerCase());
    setResetMessage(ok ? `Lien temporaire envoyé à ${resetEmail.trim().toLowerCase()} (simulation).` : "Aucun compte correspondant.");
  };

  const saveProduct = (e) => {
    e.preventDefault();
    const ht = Number(pf.priceHt); const tva = Number(pf.tvaRate); const stock = Number(pf.stock);
    if (!pf.sku || !pf.name || Number.isNaN(ht) || Number.isNaN(tva) || Number.isNaN(stock)) return;
    const p = { id: pf.id || `p_${Date.now()}`, sku: pf.sku, name: pf.name, category: pf.category, priceHt: round(ht), tvaRate: round(tva), priceTtc: round(ht * (1 + tva / 100)), stock: round(stock), active: true };
    setData((d) => ({ ...d, products: d.products.some((x) => x.id === p.id) ? d.products.map((x) => x.id === p.id ? { ...x, ...p } : x) : [p, ...d.products] }));
    setPf(emptyProduct);
  };

  const addSaleItem = () => {
    const p = data.products.find((x) => x.id === saleProductId); const q = Number(saleQty);
    if (!p || !q || q <= 0 || q > Number(p.stock)) { setSaleMessage("Produit/quantité invalide ou stock insuffisant."); return; }
    setSaleItems((prev) => {
      const ex = prev.find((i) => i.productId === p.id);
      return ex ? prev.map((i) => i.productId === p.id ? { ...i, quantity: i.quantity + q } : i) : [...prev, { productId: p.id, name: p.name, unitPriceHt: Number(p.priceHt), unitPriceTtc: Number(p.priceTtc), tvaRate: Number(p.tvaRate), quantity: q }];
    });
    setSaleProductId(""); setSaleQty("1"); setSaleMessage("");
  };

  const registerSale = (e) => {
    e.preventDefault();
    if (!saleItems.length) { setSaleMessage("Ajoutez des produits à la vente."); return; }
    const sale = { id: `MAG-${Date.now().toString().slice(-6)}`, createdAt: new Date().toISOString(), totalHt: saleTotals.ht, totalTva: saleTotals.tva, totalTtc: saleTotals.ttc, items: saleItems };
    setData((d) => ({ ...d, inStoreSales: [sale, ...d.inStoreSales], products: d.products.map((p) => { const line = saleItems.find((i) => i.productId === p.id); return line ? { ...p, stock: round(Math.max(0, Number(p.stock) - line.quantity)) } : p; }) }));
    setSaleItems([]); setSaleMessage(`Vente ${sale.id} enregistrée.`);
  };

  const addClient = (e) => {
    e.preventDefault();
    if (!newClientName.trim() || !newClientEmail.trim()) { setClientMessage("Nom et email obligatoires."); return; }
    if (data.clients.some((c) => c.email.toLowerCase() === newClientEmail.trim().toLowerCase())) { setClientMessage("Client déjà existant."); return; }
    const c = { id: `c_${Date.now()}`, name: newClientName.trim(), email: newClientEmail.trim() };
    setData((d) => ({ ...d, clients: [c, ...d.clients] }));
    setNewClientName(""); setNewClientEmail(""); setClientMessage("Client créé.");
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setData((d) => ({ ...d, users: d.users.map((u) => u.id === user.id ? { ...u, name: profileName.trim(), email: profileEmail.trim() } : u) }));
    setProfileMessage("Profil mis à jour.");
  };

  const changePwd = (e) => {
    e.preventDefault();
    if (oldPwd !== user.password) { setPwdMessage("Ancien mot de passe incorrect."); return; }
    if (newPwd.length < 8) { setPwdMessage("Minimum 8 caractères."); return; }
    if (newPwd !== confirmPwd) { setPwdMessage("La confirmation ne correspond pas."); return; }
    setData((d) => ({ ...d, users: d.users.map((u) => u.id === user.id ? { ...u, password: newPwd } : u) }));
    setOldPwd(""); setNewPwd(""); setConfirmPwd(""); setPwdMessage("Mot de passe modifié.");
  };

  const createSeller = (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    if (!sellerName.trim() || !sellerEmail.trim() || !sellerPwd.trim()) { setSellerMessage("Nom, email, mot de passe obligatoires."); return; }
    if (data.users.some((u) => u.email.toLowerCase() === sellerEmail.trim().toLowerCase())) { setSellerMessage("Email déjà utilisé."); return; }
    const nu = { id: `u_${Date.now()}`, role: sellerRole, name: sellerName.trim(), email: sellerEmail.trim(), password: sellerPwd.trim(), active: true };
    setData((d) => ({ ...d, users: [nu, ...d.users] }));
    setSellerName(""); setSellerEmail(""); setSellerPwd(""); setSellerRole("seller"); setSellerMessage("Compte créé.");
  };

  if (!user) {
    return (
      <main className="dashboard-auth-page">
        <section className="dashboard-auth-card">
          <h1>Dashboard Vendeur CafThé</h1>
          <p>Connexion sécurisée avec expiration de session (30 min).</p>
          <form className="dashboard-auth-form" onSubmit={login}>
            <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
            <label>Mot de passe<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
            {authMessage && <p className="form-feedback error">{authMessage}</p>}
            <button type="submit" className="primary">Se connecter</button>
          </form>
          <form className="dashboard-auth-reset" onSubmit={sendReset}>
            <h3>Mot de passe oublié</h3>
            <div className="form-row"><input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="email@cafthe.fr" required /><button type="submit" className="ghost">Envoyer lien</button></div>
            {resetMessage && <p className="form-feedback success">{resetMessage}</p>}
          </form>
          <div className="dashboard-auth-help"><p>`admin@cafthe.fr / Admin123!`</p><p>`vendeur@cafthe.fr / Vendeur123!`</p></div>
        </section>
      </main>
    );
  }

  const tabs = [{ key: "kpi", label: "Dashboard" }, { key: "products", label: "Produits" }, { key: "sales", label: "Ventes magasin" }, { key: "orders", label: "Commandes web" }, { key: "clients", label: "Clients" }, { key: "profile", label: "Profil" }, ...(isAdmin ? [{ key: "users", label: "Comptes vendeurs" }] : [])];

  return (
    <main className="dashboard-page">
      <header className="dashboard-header"><div><h1>Dashboard CafThé</h1><p>{user.name} - {isAdmin ? "Administrateur" : "Vendeur"}</p></div><button type="button" className="primary" onClick={() => setSession(null)}>Déconnexion</button></header>
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">{tabs.map((t) => <button key={t.key} type="button" className={tab === t.key ? "active" : ""} onClick={() => setTab(t.key)}>{t.label}</button>)}</aside>
        <section className="dashboard-content">
          {tab === "kpi" && <div className="dashboard-section"><h2>KPI</h2><div className="dashboard-kpi-grid"><article className="kpi-card"><span>CA global</span><strong>{kpi.totalRevenue.toFixed(2)} €</strong></article><article className="kpi-card"><span>Ventes</span><strong>{kpi.salesCount}</strong></article><article className="kpi-card"><span>Panier moyen</span><strong>{kpi.averageBasket.toFixed(2)} €</strong></article><article className="kpi-card"><span>Clients</span><strong>{kpi.clients}</strong></article></div><div className="dashboard-alert-grid"><div className="alert-box"><h4>Stock faible</h4><p>{kpi.low}</p></div><div className="alert-box"><h4>Rupture</h4><p>{kpi.out}</p></div><div className="alert-box"><h4>Commandes en attente</h4><p>{kpi.pending}</p></div></div></div>}
          {tab === "products" && <div className="dashboard-section"><h2>Produits (CRUD)</h2><form className="dashboard-form" onSubmit={saveProduct}><div className="form-grid"><label>SKU*<input value={pf.sku} onChange={(e) => setPf((p) => ({ ...p, sku: e.target.value }))} required /></label><label>Nom*<input value={pf.name} onChange={(e) => setPf((p) => ({ ...p, name: e.target.value }))} required /></label><label>Catégorie*<select value={pf.category} onChange={(e) => { const c = e.target.value; setPf((p) => ({ ...p, category: c, tvaRate: c === "Accessoire" ? "20" : "5.5" })); }}><option>Thé</option><option>Café</option><option>Accessoire</option></select></label><label>Prix HT*<input type="number" step="0.01" value={pf.priceHt} onChange={(e) => setPf((p) => ({ ...p, priceHt: e.target.value }))} required /></label><label>TVA*<input type="number" step="0.1" value={pf.tvaRate} onChange={(e) => setPf((p) => ({ ...p, tvaRate: e.target.value }))} required /></label><label>Stock*<input type="number" value={pf.stock} onChange={(e) => setPf((p) => ({ ...p, stock: e.target.value }))} required /></label></div><div className="form-actions"><button type="submit" className="primary">{pf.id ? "Mettre à jour" : "Créer"}</button><button type="button" className="ghost" onClick={() => setPf(emptyProduct)}>Réinitialiser</button></div></form><div className="table-toolbar"><input type="search" value={ps} onChange={(e) => setPs(e.target.value)} placeholder="Recherche" /><label className="inline-check"><input type="checkbox" checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)} />Afficher désactivés</label></div><div className="table-wrap"><table className="dashboard-table"><thead><tr><th>SKU</th><th>Nom</th><th>Catégorie</th><th>Prix TTC</th><th>Stock</th><th>État</th><th>Actions</th></tr></thead><tbody>{products.map((p) => <tr key={p.id}><td>{p.sku}</td><td>{p.name}</td><td>{p.category}</td><td>{p.priceTtc.toFixed(2)} €</td><td>{p.stock}</td><td><span className={`badge ${p.active !== false ? "ok" : "muted"}`}>{p.active !== false ? "Actif" : "Désactivé"}</span></td><td className="table-actions"><button type="button" onClick={() => setPf({ id: p.id, sku: p.sku, name: p.name, category: p.category, priceHt: String(p.priceHt), tvaRate: String(p.tvaRate), stock: String(p.stock) })}>Éditer</button>{p.active !== false ? <button type="button" className="danger" onClick={() => setData((d) => ({ ...d, products: d.products.map((x) => x.id === p.id ? { ...x, active: false } : x) }))}>Désactiver</button> : <button type="button" onClick={() => setData((d) => ({ ...d, products: d.products.map((x) => x.id === p.id ? { ...x, active: true } : x) }))}>Réactiver</button>}</td></tr>)}</tbody></table></div></div>}
          {tab === "sales" && <div className="dashboard-section"><h2>Ventes magasin</h2><form className="dashboard-form" onSubmit={registerSale}><div className="form-row"><select value={saleProductId} onChange={(e) => setSaleProductId(e.target.value)}><option value="">Choisir produit</option>{data.products.filter((p) => p.active !== false).map((p) => <option key={p.id} value={p.id}>{p.name} ({p.stock})</option>)}</select><input type="number" min="1" value={saleQty} onChange={(e) => setSaleQty(e.target.value)} /><button type="button" className="ghost" onClick={addSaleItem}>Ajouter</button></div><div className="table-wrap"><table className="dashboard-table compact"><thead><tr><th>Produit</th><th>Qté</th><th>Total TTC</th><th /></tr></thead><tbody>{saleItems.map((i) => <tr key={i.productId}><td>{i.name}</td><td>{i.quantity}</td><td>{round(i.unitPriceTtc * i.quantity).toFixed(2)} €</td><td><button type="button" className="danger" onClick={() => setSaleItems((arr) => arr.filter((x) => x.productId !== i.productId))}>Retirer</button></td></tr>)}</tbody></table></div><div className="summary-block"><div><span>Total HT</span><strong>{saleTotals.ht.toFixed(2)} €</strong></div><div><span>TVA</span><strong>{saleTotals.tva.toFixed(2)} €</strong></div><div><span>Total TTC</span><strong>{saleTotals.ttc.toFixed(2)} €</strong></div></div><button type="submit" className="primary">Enregistrer vente</button>{saleMessage && <p className="form-feedback success">{saleMessage}</p>}</form></div>}
          {tab === "orders" && <div className="dashboard-section"><h2>Commandes en ligne</h2><div className="table-wrap"><table className="dashboard-table"><thead><tr><th>Commande</th><th>Client</th><th>Total</th><th>Statut</th></tr></thead><tbody>{data.onlineOrders.map((o) => <tr key={o.id}><td>{o.id}</td><td>{o.clientEmail || "-"}</td><td>{Number(o.total).toFixed(2)} €</td><td><select value={o.status} onChange={(e) => setData((d) => ({ ...d, onlineOrders: d.onlineOrders.map((x) => String(x.id) === String(o.id) ? { ...x, status: e.target.value } : x) }))}>{STATUSES.map((s) => <option key={`${o.id}-${s}`} value={s}>{s}</option>)}</select></td></tr>)}</tbody></table></div></div>}
          {tab === "clients" && <div className="dashboard-section"><h2>Clients</h2><form className="dashboard-form" onSubmit={addClient}><div className="form-row"><input value={newClientName} onChange={(e) => setNewClientName(e.target.value)} placeholder="Nom" /><input type="email" value={newClientEmail} onChange={(e) => setNewClientEmail(e.target.value)} placeholder="Email" /><button type="submit" className="primary">Ajouter</button></div>{clientMessage && <p className="form-feedback success">{clientMessage}</p>}</form><div className="table-wrap"><table className="dashboard-table"><thead><tr><th>Nom</th><th>Email</th></tr></thead><tbody>{data.clients.map((c) => <tr key={c.id}><td>{c.name}</td><td>{c.email}</td></tr>)}</tbody></table></div></div>}
          {tab === "profile" && <div className="dashboard-section"><h2>Mon profil</h2><form className="dashboard-form" onSubmit={saveProfile}><div className="form-row"><input value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Nom" /><input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} placeholder="Email" /><button type="submit" className="primary">Enregistrer</button></div>{profileMessage && <p className="form-feedback success">{profileMessage}</p>}</form><form className="dashboard-form" onSubmit={changePwd}><h3>Changer mot de passe</h3><div className="form-row"><input type="password" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} placeholder="Ancien" required /><input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} placeholder="Nouveau" required /><input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} placeholder="Confirmation" required /><button type="submit" className="primary">Mettre à jour</button></div>{pwdMessage && <p className={`form-feedback ${pwdMessage.includes("modifié") ? "success" : "error"}`}>{pwdMessage}</p>}</form></div>}
          {tab === "users" && isAdmin && <div className="dashboard-section"><h2>Comptes vendeurs</h2><form className="dashboard-form" onSubmit={createSeller}><div className="form-row"><input value={sellerName} onChange={(e) => setSellerName(e.target.value)} placeholder="Nom" /><input type="email" value={sellerEmail} onChange={(e) => setSellerEmail(e.target.value)} placeholder="Email" /><select value={sellerRole} onChange={(e) => setSellerRole(e.target.value)}><option value="seller">Vendeur</option><option value="admin">Admin</option></select><input value={sellerPwd} onChange={(e) => setSellerPwd(e.target.value)} placeholder="Mot de passe" /><button type="submit" className="primary">Créer</button></div>{sellerMessage && <p className="form-feedback success">{sellerMessage}</p>}</form><div className="table-wrap"><table className="dashboard-table"><thead><tr><th>Nom</th><th>Email</th><th>Rôle</th><th>État</th><th>Action</th></tr></thead><tbody>{data.users.map((u) => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td><span className={`badge ${u.active !== false ? "ok" : "muted"}`}>{u.active !== false ? "Actif" : "Désactivé"}</span></td><td>{u.active !== false ? <button type="button" className="danger" onClick={() => setData((d) => ({ ...d, users: d.users.map((x) => x.id === u.id ? { ...x, active: false } : x) }))}>Désactiver</button> : <button type="button" onClick={() => setData((d) => ({ ...d, users: d.users.map((x) => x.id === u.id ? { ...x, active: true } : x) }))}>Réactiver</button>}</td></tr>)}</tbody></table></div></div>}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;




