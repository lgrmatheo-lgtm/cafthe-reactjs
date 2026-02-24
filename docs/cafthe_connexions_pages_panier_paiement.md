# CafThe - Resume technique des connexions de pages, panier et paiement

Date: 2026-02-17
Projet: CafThe (front React)

## 1) Objectif du document

Ce document explique:
- comment les pages du site sont reliees entre elles,
- quelles fonctions principales pilotent la navigation,
- comment le panier est implemente (ajout, +/-, suppression, popup, vider),
- comment le tunnel de commande et le paiement sont implementes.

References principales:
- routes: src/App.jsx:48
- layout global: src/layout/Layout.jsx:23
- navbar + popup panier: src/components/Navbar.jsx:20
- contexte panier: src/context/cartContext.jsx:17
- tunnel commande: src/pages/CheckoutIdentification.jsx:71, src/pages/CheckoutLivraison.jsx:57, src/pages/CheckoutPaiement.jsx:48, src/pages/CheckoutConfirmation.jsx:22

## 2) Architecture globale

L'application est montee ainsi:
1. `main.jsx` rend `App` dans `#root` et enveloppe avec `HelmetProvider` pour le SEO.
2. `App.jsx` declare toutes les routes avec React Router.
3. `Layout.jsx` affiche sur toutes les pages publiques:
   - `RouteSeo`
   - `Navbar`
   - `Outlet` (la page courante)
   - `Footer`

Providers globaux:
- `AuthProvider` (session utilisateur), src/App.jsx:42
- `CartProvider` (etat panier), src/App.jsx:43
- `SearchProvider` (etat recherche), src/App.jsx:44

## 3) Carte complete des pages (routes)

Definition des routes: src/App.jsx:48-72

- `/` -> `Home`
- `/catalogue` -> `Catalogue`
- `/thes-origine` -> `ThesOrigine`
- `/cafes-specialite` -> `CafesSpecialite`
- `/accessoires` -> `Accessoires`
- `/nouveautes` -> `Nouveautes`
- `/livraison-retours` -> `LivraisonRetours`
- `/faq` -> `Faq`
- `/contact` -> `Contact`
- `/mentions-legales` -> `MentionsLegales`
- `/dashboard` -> `Dashboard`
- `/privacy` -> `Privacy`
- `/terms` -> `Terms`
- `/produit/:id` -> `ProductDetails`
- `/login` -> `Login`
- `/inscription` -> `Register`
- `/profil` -> `Account`
- `/panier` -> `Cart`
- `/commande/identification` -> `CheckoutIdentification`
- `/commande/livraison` -> `CheckoutLivraison`
- `/commande/paiement` -> `CheckoutPaiement`
- `/commande/confirmation` -> `CheckoutConfirmation`
- `/profil/commande/:id` -> `OrderDetails`

Note: `ProductList.jsx` existe mais n'est pas branche dans le routeur (pas de route active dans `App.jsx`).

## 4) Connexions entre pages (navigation)

### 4.1 Navigation globale (header)

Fichier: src/components/Navbar.jsx

Liens directs:
- logo -> `/` (src/components/Navbar.jsx:57)
- menu -> `/` et `/catalogue` (src/components/Navbar.jsx:87, 90)
- compte:
  - connecte -> `/profil` (src/components/Navbar.jsx:115)
  - non connecte -> `/login`, `/inscription` (src/components/Navbar.jsx:124, 127)
- panier:
  - bouton "Voir le panier" -> `/panier` (src/components/Navbar.jsx:195)
  - bouton "Commander" -> `/commande/identification` (src/components/Navbar.jsx:205)

Recherche:
- `handleSearchSubmit` envoie sur `/catalogue` si on n'y est pas deja (src/components/Navbar.jsx:42, 45).

### 4.2 Navigation globale (footer)

Fichier: src/components/Footer.jsx

Liens produits:
- `/thes-origine`, `/cafes-specialite`, `/accessoires`, `/nouveautes`

Liens aide/legal:
- `/livraison-retours`, `/faq`, `/contact`, `/mentions-legales`, `/privacy`, `/terms`

Lien admin:
- `/dashboard`

### 4.3 Connexions de pages "info"

Pages: `ThesOrigine`, `CafesSpecialite`, `Accessoires`, `Nouveautes`, `LivraisonRetours`, `Faq`, `Contact`, `MentionsLegales`, `Privacy`, `Terms`.

Ces pages utilisent `InfoPage` (src/components/InfoPage.jsx:19, 34):
- `actions[]` genere des liens call-to-action,
- `sections[]` structure le contenu.

Exemples d'actions:
- vers `/catalogue` et `/contact` pour les pages categories (src/pages/Accessoires.jsx:17-18, src/pages/CafesSpecialite.jsx:17-18, src/pages/ThesOrigine.jsx:17-18)
- vers `/profil` depuis livraison/retours (src/pages/LivraisonRetours.jsx:17)
- vers `/login` depuis contact (src/pages/Contact.jsx:17)

## 5) Fiche technique des pages principales

### 5.1 Home (`/`)

Fichier: src/pages/Home.jsx

Fonctions/liaisons:
- lit `query` via `SearchContext` (filtrage local), src/pages/Home.jsx:83
- ajoute un produit via `addItem(item)` depuis les cartes "Selection du moment", src/pages/Home.jsx:206
- CTA hero scroll interne vers sections de la meme page (pas de changement de route)

### 5.2 Catalogue (`/catalogue`)

Fichier: src/pages/Catalogue.jsx

Fonctions/liaisons:
- charge les produits API `GET /api/articles`, src/pages/Catalogue.jsx:65
- filtres, tri, pagination (`toggleSelection`, `setPage`), src/pages/Catalogue.jsx:133, 281
- navigation fiche produit via `Link to=/produit/:id`, src/pages/Catalogue.jsx:245
- popup "apercu rapide" avec `quickView`, src/pages/Catalogue.jsx:58, 288
- ajout panier depuis popup via `addItem(...)`, src/pages/Catalogue.jsx:309

### 5.3 Fiche produit (`/produit/:id`)

Fichier: src/pages/ProductDetails.jsx

Fonctions/liaisons:
- recupere `id` URL via `useParams`, src/pages/ProductDetails.jsx:47
- charge detail produit API `GET /api/articles/:id`, src/pages/ProductDetails.jsx:63
- charge produits lies API `GET /api/articles`, src/pages/ProductDetails.jsx:87
- gere `selectedWeight` et `quantity` localement, src/pages/ProductDetails.jsx:54-55
- ajout panier boucle sur la quantite choisie (`for ... addItem`), src/pages/ProductDetails.jsx:198-204

### 5.4 Panier page complete (`/panier`)

Fichier: src/pages/Cart.jsx

Fonctions/liaisons:
- lit panier global via `CartContext`, src/pages/Cart.jsx:16
- calcule `subtotal`, `shipping`, `discount`, `total`, src/pages/Cart.jsx:20-23
- promo code `CAFTHE10` dans `handleApplyPromo`, src/pages/Cart.jsx:25, 32
- quantite +/- via `decreaseItem` et `addItem`, src/pages/Cart.jsx:71, 73
- suppression ligne via `removeItem`, src/pages/Cart.jsx:82
- validation panier -> `/commande/identification`, src/pages/Cart.jsx:150

### 5.5 Espace client (`/profil`)

Fichier: src/pages/Account.jsx

Fonctions/liaisons:
- page protegee: redirection `/login` si non connecte, src/pages/Account.jsx:81
- onglets internes (`orders`, `addresses`, `profile`, `settings`) avec `activeTab`, src/pages/Account.jsx:29, 177+
- sauvegardes locales:
  - adresses: `cafthe_addresses`, src/pages/Account.jsx:103
  - profil: `cafthe_profile`, src/pages/Account.jsx:128
  - mot de passe local demo: `cafthe_profile_password`, src/pages/Account.jsx:147
- details commande -> `/profil/commande/:id`, src/pages/Account.jsx:237

### 5.6 Detail commande (`/profil/commande/:id`)

Fichier: src/pages/OrderDetails.jsx

Fonctions/liaisons:
- lit l'id via URL (`useParams`), src/pages/OrderDetails.jsx:14
- recharge commande depuis `cafthe_orders`
- bouton "Commander a l'identique": `replaceCart(order.items)` puis `/panier`, src/pages/OrderDetails.jsx:68-69

### 5.7 Auth client (`/login`, `/inscription`)

Fichiers: src/pages/Login.jsx, src/pages/Register.jsx

Fonctions/liaisons:
- login API: `POST /api/clients/login` puis `login(data.client)` et navigation `/`, src/pages/Login.jsx:20, 40
- register API: `POST /api/clients/register` puis navigation `/login`, src/pages/Register.jsx:19, 39

### 5.8 Dashboard vendeur (`/dashboard`)

Fichier: src/pages/Dashboard.jsx

Fonctions/liaisons:
- auth dashboard locale (admin/vendeur) via etat `session`, src/pages/Dashboard.jsx:54, 131
- expiration auto session 30 min, src/pages/Dashboard.jsx:11, 99+
- onglets metier (`kpi`, `products`, `sales`, `orders`, `clients`, `profile`, `users` admin), src/pages/Dashboard.jsx:229
- import des commandes web depuis `cafthe_orders` pour les traiter cote dashboard, src/pages/Dashboard.jsx:40+

## 6) Comment le panier est implemente (detail demandé)

### 6.1 Etat global du panier

Fichier cle: src/context/cartContext.jsx

Fonctions exposees:
- `addItem(item)` (src/context/cartContext.jsx:17)
- `decreaseItem(keyOrId)` (src/context/cartContext.jsx:32)
- `removeItem(keyOrId)` (src/context/cartContext.jsx:44)
- `clear()` (src/context/cartContext.jsx:48)
- `replaceCart(nextItems)` (src/context/cartContext.jsx:49)
- derives: `totalItems`, `totalPrice` (src/context/cartContext.jsx:68, 73)

Logique importante:
- cle unique par ligne: `id + variant` pour differencier 250g/500g,
- si meme cle -> incremente `quantity`, sinon cree une nouvelle ligne,
- persistance par utilisateur: `cafthe_cart_<email>` en localStorage (src/context/cartContext.jsx:53, 65).

### 6.2 D'ou vient l'ajout panier

- Home: bouton "Ajouter" sur les cartes (src/pages/Home.jsx:206)
- Catalogue popup rapide: bouton "Ajouter au panier" (src/pages/Catalogue.jsx:309)
- Fiche produit: bouton "Ajouter au panier" avec quantite et poids (src/pages/ProductDetails.jsx:198)

### 6.3 Augmenter / diminuer quantite

- dans le popup panier navbar:
  - `-` -> `decreaseItem(...)`
  - `+` -> `addItem(...)`
  (src/components/Navbar.jsx:176, 178)

- dans la page panier:
  - `-` -> `decreaseItem(...)`
  - `+` -> `addItem(...)`
  - suppression ligne -> `removeItem(...)`
  (src/pages/Cart.jsx:71, 73, 82)

### 6.4 Panier en popup (drawer)

Fichier: src/components/Navbar.jsx

Comment c'est fait:
- etat local `isCartOpen` (src/components/Navbar.jsx:20)
- clic icone panier -> toggle `isCartOpen` (src/components/Navbar.jsx:140+)
- rendu conditionnel du drawer: `{isCartOpen && !isAccountOpen && (...)}` (src/components/Navbar.jsx:155)
- container popup: `div.cart-drawer` (src/components/Navbar.jsx:156)

### 6.5 Bouton vider et bouton valider

Dans popup navbar:
- `Vider` appelle `clear()` (src/components/Navbar.jsx:190)
- `Voir le panier` -> `/panier` (src/components/Navbar.jsx:195)
- `Commander` -> `/commande/identification` (src/components/Navbar.jsx:205)

Dans page panier:
- bouton "Passer la commande" -> `/commande/identification` (src/pages/Cart.jsx:150)

## 7) Comment le paiement est implemente (detail demandé)

Le paiement est un tunnel en 4 etapes.

### Etape 1 - Identification (`/commande/identification`)

Fichier: src/pages/CheckoutIdentification.jsx

- verifie que le panier n'est pas vide,
- sauvegarde `checkout_email` en `sessionStorage`,
- passe a l'etape 2 via `navigate("/commande/livraison")`.

References:
- src/pages/CheckoutIdentification.jsx:17
- src/pages/CheckoutIdentification.jsx:71
- src/pages/CheckoutIdentification.jsx:73

### Etape 2 - Livraison (`/commande/livraison`)

Fichier: src/pages/CheckoutLivraison.jsx

- choisit `deliveryMode` (`home` ou `pickup`),
- choisit methode (`standard` / `express` / `pickup`),
- calcule les frais via `getShippingCost(...)`,
- sauvegarde en session:
  - `deliveryMode`
  - `shippingMethod`
  - `pickupStore`
- puis `navigate("/commande/paiement")`.

References:
- src/pages/CheckoutLivraison.jsx:57-60
- src/utils/shipping.js:7

### Etape 3 - Paiement (`/commande/paiement`)

Fichier: src/pages/CheckoutPaiement.jsx

- methodes: carte, PayPal, ou paiement differe (si retrait magasin),
- au submit, cree un objet `order` complet:
  - id, date, statut, items,
  - sous-total, livraison, total,
  - mode livraison et methode paiement,
- stocke `last_order` en session,
- redirige vers confirmation.

References:
- src/pages/CheckoutPaiement.jsx:48 (construction `order`)
- src/pages/CheckoutPaiement.jsx:63 (`paymentMethod`)
- src/pages/CheckoutPaiement.jsx:68-69

### Etape 4 - Confirmation (`/commande/confirmation`)

Fichier: src/pages/CheckoutConfirmation.jsx

- lit `last_order` depuis session,
- persiste dans `localStorage`:
  - `cafthe_orders`
  - `cafthe_emails` (simulation email confirmation),
- boutons fin de parcours:
  - "Voir mes commandes" -> vide panier + `/profil`
  - "Retour a l'accueil" -> vide panier + `/`

References:
- src/pages/CheckoutConfirmation.jsx:22
- src/pages/CheckoutConfirmation.jsx:27
- src/pages/CheckoutConfirmation.jsx:52-58

## 8) Donnees stockees (memo technique)

### localStorage
- panier connecte: `cafthe_cart_<email>`
- commandes: `cafthe_orders`
- emails commandes (simulation): `cafthe_emails`
- compte client local:
  - `cafthe_addresses`
  - `cafthe_profile`
  - `cafthe_profile_password`
- dashboard:
  - `cafthe_dash_data_v2`
  - `cafthe_dash_session_v2`

### sessionStorage
- `checkout_email`
- `deliveryMode`
- `shippingMethod`
- `pickupStore`
- `last_order`

## 9) Schema de flux (vue rapide)

Navigation produit:
`Home/Catalogue -> ProductDetails -> addItem -> CartContext`

Panier popup:
`Navbar cart icon -> isCartOpen -> cart-drawer -> clear / voir panier / commander`

Tunnel de commande:
`/panier -> /commande/identification -> /commande/livraison -> /commande/paiement -> /commande/confirmation -> /profil`

Recommande rapide:
`/profil/commande/:id -> replaceCart(order.items) -> /panier`

## 10) Conclusion

Le site est structure autour d'un routeur central (`App.jsx`) et de 3 contextes globaux:
- Auth,
- Panier,
- Recherche.

Le panier est implemente proprement avec un etat partage (`CartContext`) et est utilisable depuis plusieurs pages (Home, Catalogue, Fiche produit, Navbar popup, Page panier).

Le paiement est un tunnel multi-etapes coherent, avec conservation de l'etat via `sessionStorage` et finalisation dans `localStorage` pour l'historique client et le dashboard.

Ce document peut servir de base de soutenance technique DWWM (front) pour expliquer les liens entre pages et le parcours d'achat de bout en bout.
