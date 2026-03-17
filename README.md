# CafThe

Boutique e-commerce cafe/the en React + Vite, realisee dans un cadre d apprentissage (dev junior / apprenti).

## Prerequis

- Node.js >= 18 (20 recommande)
- npm
- Une API back-end fonctionnelle (non fournie ici)

## Quickstart

```bash
# 1. Installer les dependances
npm install

# 2. Creer le fichier .env a la racine (Les Variables d'environnement)

# 3. Lancer le serveur de developpement
npm run dev
```

L'application est accessible sur `https://cafthefrontend.mlagier.dev-campus.fr/`.

### Variables d environnement

| Variable       | Description                | Exemple                 |
| -------------- | -------------------------- | ----------------------- |
| `VITE_API_URL` | URL de l API back-end      | `http://localhost:3000` |

### Endpoints API (indicatif)

- GET `/api/articles`
- GET `/api/articles/:id`
- POST `/api/clients/login`
- POST `/api/clients/register`
- GET `/api/clients/me`
- POST `/api/clients/logout`

## Scripts disponibles

| Commande          | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Lancer le serveur de developpement |
| `npm run build`   | Construire le projet pour la prod  |
| `npm run preview` | Previsualiser le build de prod     |
| `npm run lint`    | Lancer ESLint sur le projet        |

## Exemples d utilisation

| URL                                                                  | Description                                      |
|----------------------------------------------------------------------| ------------------------------------------------ |
| `https://cafthefrontend.mlagier.dev-campus.fr/`                      | Home (hero + sections)                           |
| `https://cafthefrontend.mlagier.dev-campus.fr/catalogue`             | Catalogue (recherche, filtres, tri, pagination)  |
| `https://cafthefrontend.mlagier.dev-campus.fr/produit/:id`           | Fiche produit                                    |
| `https://cafthefrontend.mlagier.dev-campus.fr/panier`                | Panier                                           |
| `https://cafthefrontend.mlagier.dev-campus.fr/checkout/livraison`    | Tunnel d achat - livraison                       |
| `https://cafthefrontend.mlagier.dev-campus.fr/checkout/paiement`     | Tunnel d achat - paiement (simule)               |
| `https://cafthefrontend.mlagier.dev-campus.fr/checkout/confirmation` | Tunnel d achat - confirmation                    |
| `https://cafthefrontend.mlagier.dev-campus.fr/login`                 | Connexion                                        |
| `https://cafthefrontend.mlagier.dev-campus.fr/inscription`           | Creation de compte                               |
| `https://cafthefrontend.mlagier.dev-campus.fr/profil`                | Compte client                                    |
| `https://cafthefrontend.mlagier.dev-campus.fr/profil/commande/:id`   | Details de commande                              |
| `https://cafthefrontend.mlagier.dev-campus.fr/thes-origine`          | Page Thes d origine                              |
| `https://cafthefrontend.mlagier.dev-campus.fr/cafes-specialite`      | Page Cafes de specialite                         |
| `https://cafthefrontend.mlagier.dev-campus.fr/accessoires`           | Page Accessoires                                 |
| `https://cafthefrontend.mlagier.dev-campus.fr/nouveautes`            | Page Nouveautes                                  |
| `https://cafthefrontend.mlagier.dev-campus.fr/livraison-retours`     | Page Livraison et retours                        |
| `https://cafthefrontend.mlagier.dev-campus.fr/faq`                   | FAQ                                              |
| `https://cafthefrontend.mlagier.dev-campus.fr/contact`               | Contact                                          |
| `https://cafthefrontend.mlagier.dev-campus.fr/mentions-legales`      | Mentions legales                                 |
| `https://cafthefrontend.mlagier.dev-campus.fr/privacy`               | Politique de confidentialite                     |
| `https://cafthefrontend.mlagier.dev-campus.fr/terms`                 | Conditions d utilisation                         |

## Structure du projet

```
src/
├── components/        # Composants reutilisables (Navbar, Footer, etc.)
├── context/           # Context global (auth, cart, search)
├── layout/            # Layout global
├── pages/             # Pages / routes
├── shims/             # Shims (react-helmet-async)
├── styles/            # CSS par page/composant
├── utils/             # Helpers (promo, shipping, images)
├── App.jsx            # Routing principal
└── main.jsx           # Point d entree
public/
└── img/               # Assets images
```

## Notes 

- Panier par utilisateur: localStorage `cafthe_cart_<email>`
- Commandes: localStorage `cafthe_orders`
- Compte client: `cafthe_profile`, `cafthe_addresses`
- Mode livraison: sessionStorage `cafthe_delivery_mode`

Identifiants de demo (dashboard):
- admin: `admin@cafthe.fr` / `Admin123!`
- vendeur: `vendeur@cafthe.fr` / `Vendeur123!`

## Deploiement

### Build de production

```bash
npm run build
```

Les fichiers statiques sont generes dans le dossier `dist/`.

### Hébergement

Le front-end est déployé sur Plesk et versionné sur GitHub.
Il suffit de publier le dossier `dist/` sur Plesk, puis de renseigner l'URL du site dans la variable `FRONT_END_URL` du serveur Node.js (sous-domaine API) afin d'établir la liaison entre le front et le back.


## Stack technique

- **React** - UI et composants
- **Vite** - build et dev server
- **React Router** - routing SPA
- **React Helmet Async** - SEO basique
- **React Loading Skeleton** - placeholders de chargement
- **ESLint** - qualite de code

## Auteurs

- Apprenant junior dev web Lagier Mathéo


## Liens utiles

- Documentation React
- Documentation Vite
- Documentation React Router

