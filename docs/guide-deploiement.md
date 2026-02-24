# Guide de Déploiement - CafThé Front

## Prérequis
- Node.js 20+
- npm 10+

## 1. Installation
```bash
npm install
```

## 2. Configuration
Créer `.env` depuis `.env.example`.
Variables minimales:
- `VITE_API_URL=https://votre-api`

## 3. Démarrage dev
```bash
npm run dev
```

## 4. Build production
```bash
npm run build
```
Artifacts dans `dist/`.

## 5. Publication
- Déployer `dist/` sur serveur web (Nginx/Apache/VPS).
- Configurer fallback SPA vers `index.html`.
- Activer HTTPS (obligatoire).

## 6. Points sécurité
- API protégée par JWT.
- Mots de passe hashés côté backend (bcrypt).
- Validation et sanitation de toutes les entrées API.
