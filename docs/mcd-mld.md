# MCD / MLD - CafThé

## Entités principales (MCD)
- Utilisateur(id, nom, email, mot_de_passe_hash, role, actif, created_at)
- Client(id, nom, email, telephone, preferences, created_at)
- Produit(id, sku, nom, description, categorie, type_vente, prix_ht, taux_tva, prix_ttc, stock, origine, actif, created_at)
- ProduitImage(id, produit_id, url, ordre)
- Commande(id, client_id, type_commande[online|magasin], statut, total_ht, total_tva, total_ttc, mode_paiement, mode_livraison, created_at)
- LigneCommande(id, commande_id, produit_id, quantite, prix_unitaire_ht, taux_tva, prix_unitaire_ttc)
- Adresse(id, client_id, libelle, rue, cp, ville, pays, is_default)

## Relations (MCD)
- Un client possède 0..n commandes.
- Une commande contient 1..n lignes de commande.
- Une ligne de commande référence 1 produit.
- Un produit possède 0..n images.
- Un client possède 0..n adresses.

## MLD (SQL simplifié)
- utilisateurs(id PK, nom, email UNIQUE, mot_de_passe_hash, role, actif, created_at)
- clients(id PK, nom, email UNIQUE, telephone, preferences, created_at)
- produits(id PK, sku UNIQUE, nom, description, categorie, type_vente, prix_ht DECIMAL(10,2), taux_tva DECIMAL(4,1), prix_ttc DECIMAL(10,2), stock DECIMAL(10,2), origine, actif, created_at)
- produit_images(id PK, produit_id FK -> produits.id, url, ordre)
- commandes(id PK, client_id FK -> clients.id, type_commande, statut, total_ht DECIMAL(10,2), total_tva DECIMAL(10,2), total_ttc DECIMAL(10,2), mode_paiement, mode_livraison, created_at)
- lignes_commandes(id PK, commande_id FK -> commandes.id, produit_id FK -> produits.id, quantite DECIMAL(10,2), prix_unitaire_ht DECIMAL(10,2), taux_tva DECIMAL(4,1), prix_unitaire_ttc DECIMAL(10,2))
- adresses(id PK, client_id FK -> clients.id, libelle, rue, cp, ville, pays, is_default BOOL)
