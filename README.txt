# CafThe Front

Application front-end e-commerce pour CafThe, developpee avec React et Vite.
Le projet couvre le catalogue produits, le panier, le tunnel de commande et un dashboard vendeur/admin.

<!-- ATTENTION PAS ENCORE VU EN COURS -->
<!-- Decommenter et adapter les badges selon votre CI/CD -->
<!-- ![Build](https://img.shields.io/github/actions/workflow/status/USER/REPO/ci.yml?branch=main) -->
<!-- ![Tests](https://img.shields.io/github/actions/workflow/status/USER/REPO/tests.yml?branch=main&label=tests) -->
<!-- ![License](https://img.shields.io/github/license/USER/REPO) -->

## Fonctionnalites principales

- Catalogue produits avec recherche, filtres et detail produit
- Panier global (context React) avec persistance locale par utilisateur
- Tunnel de commande en 4 etapes (identification, livraison, paiement, confirmation)
- Authentification client (inscription, connexion, profil)
- Dashboard vendeur/admin (KPI, produits, commandes, clients)
- Pages informatives (FAQ, livraison/retours, mentions legales, etc.)

## Prerequis

- [Node.js](https://nodejs.org/) >= 20
- npm >= 10
- Une API back-end fonctionnelle

API attendue (minimum):
- `GET /api/articles`
- `GET /api/articles/:id`
- `POST /api/clients/register`
- `POST /api/clients/login`
- `GET /api/clients/me`
- `POST /api/clients/logout`

## Quickstart

```bash
# 1. Cloner le depot
git clone <URL_DU_REPO>
cd <DOSSIER_DU_PROJET>

# 2. Installer les dependances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Sous PowerShell:
# Copy-Item .env.example .env

# 4. Lancer le serveur de developpement
npm run dev
```

Application disponible sur `http://localhost:5173`.

## Variables d'environnement

| Variable | Description | Exemple |
| --- | --- | --- |
| `VITE_API_URL` | URL de base de l'API back-end | `https://api.cafthe.local` |

## Scripts disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Lance le serveur de developpement |
| `npm run build` | Construit le projet pour la production |
| `npm run preview` | Previsualise le build de production |
| `npm run lint` | Lance ESLint sur le projet |

## Exemples d'utilisation

| URL | Description |
| --- | --- |
| `http://localhost:5173/` | Page d'accueil |
| `http://localhost:5173/catalogue` | Catalogue produits |
| `http://localhost:5173/produit/:id` | Detail d'un produit |
| `http://localhost:5173/panier` | Panier |
| `http://localhost:5173/commande/identification` | Debut du tunnel de commande |
| `http://localhost:5173/login` | Connexion client |
| `http://localhost:5173/profil` | Espace client |
| `http://localhost:5173/dashboard` | Dashboard vendeur/admin |

Comptes demo dashboard (simulation locale):
- `admin@cafthe.fr` / `Admin123!`
- `vendeur@cafthe.fr` / `Vendeur123!`

## Structure du projet

```text
src/
|-- assets/
|-- components/
|-- context/
|-- layout/
|-- pages/
|-- shims/
|-- utils/
|-- App.jsx
|-- index.css
`-- main.jsx

docs/
|-- cafthe_connexions_pages_panier_paiement.md
|-- guide-deploiement.md
|-- manuel-vendeur.md
|-- mcd-mld.md
`-- openapi.yaml
```

## Deploiement

### Build de production

```bash
npm run build
```

Les fichiers statiques sont generes dans `dist/`.

### Hebergement

- Deployer le contenu de `dist/` sur votre serveur web (Nginx, Apache, VPS, Plesk, o2Switch...)
- Configurer un fallback SPA vers `index.html`
- Activer HTTPS

## Tests

Aucun script de test automatise n'est configure pour le moment.
Verification qualite minimale disponible:

```bash
npm run lint
```

## Stack technique

- **React 19** - UI et composants
- **React Router DOM 7** - routage client
- **Vite 7** - bundler et serveur de dev
- **react-helmet-async** - SEO par route
- **react-loading-skeleton** - etats de chargement
- **ESLint 9** - qualite de code

## Documentation interne

- [`docs/cafthe_connexions_pages_panier_paiement.md`](docs/cafthe_connexions_pages_panier_paiement.md)
- [`docs/manuel-vendeur.md`](docs/manuel-vendeur.md)
- [`docs/mcd-mld.md`](docs/mcd-mld.md)
- [`docs/openapi.yaml`](docs/openapi.yaml)
- [`docs/guide-deploiement.md`](docs/guide-deploiement.md)

## Auteurs

- Equipe projet CafThe

## Licence

Aucune licence n'est definie actuellement dans ce depot.
Ajoutez un fichier `LICENSE` pour clarifier les conditions d'utilisation.

## Liens utiles

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vite.dev/)
