# Fake Paradox Coaching - Backend

Ce projet constitue le backend de Paradox Coaching, une plateforme de formation interactive combinant développement personnel et technologie. Le backend est construit avec NestJS, TypeORM et PostgreSQL. Il gère l'authentification, la gestion des utilisateurs et des cours, ainsi que l'intégration de Stripe pour les abonnements et les paiements.

## Table des matières :

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Scripts disponibles](#scripts-disponibles)
- [Contact](#contact)

## Présentation :

Le backend de Paradox Coaching fournit une API RESTful qui permet aux clients (applications frontend) de gérer l'inscription et l'authentification des utilisateurs (via JWT), de consulter, créer, mettre à jour et supprimer des cours, de suivre la progression des utilisateurs dans les cours, et de gérer les abonnements et les paiements avec Stripe.

## Fonctionnalités :

- **Authentification et gestion des utilisateurs** : Inscription, connexion, récupération du profil, et suppression de compte.
- **Gestion des cours** : Création, mise à jour, consultation et suppression des cours. Calcul automatique de la progression et suivi des cours suivis par chaque utilisateur.
- **Intégration Stripe** : Création de sessions Checkout pour les abonnements, mise à jour de l'abonnement de l'utilisateur, annulation d'abonnement et envoi de factures.
- **Sécurité** : Utilisation de JWT et de Guards pour protéger les endpoints sensibles.
- **Documentation API** : Swagger est intégré pour documenter et tester l'API.

## Technologies :

- **NestJS** pour la structure du backend.
- **TypeScript** pour une meilleure robustesse du code.
- **TypeORM** et **PostgreSQL** pour la gestion de la base de données.
- **Stripe API** (mode test) pour gérer les paiements et les abonnements.
- **JWT** pour l'authentification.
- **Swagger** pour la documentation de l'API.

## Installation :

1. **Cloner le dépôt** :

```bash
git clone https://github.com/wassb92/ParadoxTest
cd server
```

2. **Installer les dépendances** :

```bash
npm install
```

<!-- # Port used -->
<!-- PORT=5000 -->
<!--  -->
<!-- # Environment -->
<!-- JWT_SECRET='thisIsASecretKey' -->
<!--  -->
<!-- # Local Database connection -->
<!-- PGUSER=postgres -->
<!-- PGHOST=localhost -->
<!-- PGPASSWORD=postgres -->
<!-- PGDATABASE=ParadoxDB -->
<!-- PGPORT=5432 -->
<!--  -->
<!-- # Cloud Database connection -->
<!-- # PGUSER=paradox_test_db_user -->
<!-- # PGHOST=dpg-cvo56semcj7s73fttde0-a.frankfurt-postgres.render.com -->
<!-- # PGPASSWORD=zDhcnduHfSTfPwC5pYGmMpL4wFB8x2I9 -->
<!-- # PGDATABASE=paradox_test_db -->
<!-- # PGPORT=5432 -->
<!--  -->
<!-- # Stripe -->
<!-- STRIPE_PUBLISHABLE_KEY=pk_test_51RAaUvKsRGYDWNO8ZzFso54OrVyyxV8aaGIANR3EO3RRHgkbmaD90Gc1cQBLVoFnjiFQj36M8axJ042XGzVv7oKR0008rBXRLI -->
<!-- STRIPE_SECRET_KEY=sk_test_51RAaUvKsRGYDWNO8agJkyoARGALhqjvYtmK50y7O3oCIZPlHL9HSJvx4eWD8bymZU2wxJVS1aye4wHNS88bGZU9l00msw2Vnyl -->
<!-- STRIPE_PRICE_MONTHLY=price_1RAadcKsRGYDWNO8yfAkBh6i -->
<!-- STRIPE_PRICE_ANNUAL=price_1RAaeIKsRGYDWNO8zHra3RRA -->
<!-- FRONTEND_URL=http://localhost:3000 -->

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` à la racine du projet et ajoutez-y vos variables, par exemple :

```bash
PORT=
JWT_SECRET=
PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=
PGPORT=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_PRICE_MONTHLY=
STRIPE_PRICE_ANNUAL=
FRONTEND_URL=
```

4. **Lancer la migration et initialiser la base de données (si nécessaire)** :
   Selon votre configuration TypeORM, exécutez les migrations ou synchronisez la base de données.

```bash
npm run typeorm migration:run
```

5. **Démarrer l'application** :

```bash
npm run start
```

## Utilisation :

L'API est accessible via `http://localhost:5000` (ou le port configuré).
Accédez à la documentation Swagger à l'adresse `http://localhost:5000/api-docs` pour visualiser et tester l'ensemble des endpoints.
Le backend gère l'authentification, la gestion des cours et des abonnements. Il est également prévu d'envoyer automatiquement les factures pour les paiements via Stripe.

## Scripts disponibles :

- `npm run start` : Lance l'application en mode développement.
- `npm run build` : Compile l'application en mode production dans le dossier `dist`.
- `npm run start:dev` : Lance l'application en mode développement avec redémarrage automatique (watch mode).
- `npm run test` : Lance les tests unitaires (si configurés).
- `npm run test:e2e` : Lance les tests end-to-end (si configurés).

## Contact :

## ![Author](https://img.shields.io/badge/Author-3498db?style=flat&logo=&logoColor=white)

[Wassini Bouzidi](https://github.com/wassb92)

---

## Connect

### 🔧 Wassini Bouzidi

[![Portfolio](https://img.shields.io/badge/Portfolio-Portfolio_De_Wassini-4031D9?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.wassini-bouzidi.com/)  
[![GitHub](https://img.shields.io/badge/GitHub-wassb92-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/wassb92)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-wassini_bouzidi-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wassini-bouzidi/)
