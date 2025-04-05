<!-- without formatting README.md -->
<!-- Fake Paradox Coaching - Root README

Ce projet est un projet full-stack composé de deux parties : le frontend et le backend. Le dépôt est organisé de la manière suivante :

client/ : Application frontend construite en React avec TypeScript, Tailwind CSS et React Router.

server/ : Application backend construite en NestJS avec TypeScript, TypeORM, PostgreSQL et intégration Stripe.

Table des matières :

Présentation

Fonctionnalités

Architecture du projet

Technologies

Installation a. Frontend Setup b. Backend Setup

Utilisation

Scripts disponibles

Contributing

Licence

Contact

Présentation : Fake Paradox Coaching est une plateforme de formation interactive combinant développement personnel et technologie. L’application permet aux utilisateurs de s’inscrire, de consulter des cours, de suivre leur progression et de souscrire à des abonnements mensuels ou annuels via Stripe (mode test).

Fonctionnalités :

Inscription et authentification : création de compte, connexion et gestion du profil.

Gestion des cours : consultation, création, mise à jour et suppression des cours avec suivi de progression.

Abonnements et paiements : intégration de Stripe pour gérer des abonnements mensuels (9,99€) et annuels (99,99€), ainsi que l’envoi de factures.

Administration : accès aux fonctionnalités de gestion des cours réservé aux administrateurs.

Documentation API : Swagger intégré pour documenter et tester l’API backend.

Responsive Design : interfaces optimisées pour tous les appareils.

Architecture du projet : Frontend (client/) :

Construit avec React et TypeScript.

Stylisé avec Tailwind CSS et animations avec Framer Motion.

Navigation assurée par React Router.

Communication avec le backend via Axios.

Intégration Stripe en mode test pour les abonnements. Backend (server/) :

Construit avec NestJS et TypeScript.

Gestion de la base de données avec TypeORM et PostgreSQL.

Authentification via JWT et sécurisation des endpoints.

Endpoints REST pour la gestion des utilisateurs, des cours et des abonnements.

Intégration Stripe (mode test) pour la création de sessions de paiement, la gestion des abonnements et l’envoi de factures.

Documentation de l’API via Swagger.

Installation :

Frontend Setup :

Cloner le dépôt et naviguer dans le dossier client : git clone https://github.com/votre-utilisateur/paradox-coaching.git cd paradox-coaching/client

Installer les dépendances : npm install

Créer un fichier .env dans le dossier client et définir les variables nécessaires, par exemple : REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXX REACT_APP_API_URL=http://localhost:5000

Démarrer l’application : npm start

Backend Setup :

Naviguer dans le dossier server : cd ../server

Installer les dépendances : npm install

Créer un fichier .env dans le dossier server et définir les variables nécessaires, par exemple : PORT=5000 DATABASE_HOST=localhost DATABASE_PORT=5432 DATABASE_USERNAME=your_username DATABASE_PASSWORD=your_password DATABASE_NAME=your_database STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXX STRIPE_PRICE_MONTHLY=price_XXXXXXXXXXXX_monthly STRIPE_PRICE_ANNUAL=price_XXXXXXXXXXXX_annual FRONTEND_URL=http://localhost:3000 JWT_SECRET=your_jwt_secret

Lancer les migrations et initialiser la base de données (selon votre configuration TypeORM).

Démarrer l’application : npm run start:dev

Utilisation : Frontend :

L’application est accessible via http://localhost:3000.

Utilisez le menu pour naviguer entre les pages (inscription, connexion, liste des cours, profil, abonnements, etc.). Backend :

L’API est accessible via http://localhost:5000.

La documentation Swagger est disponible à http://localhost:5000/api-docs. Abonnements :

Les utilisateurs peuvent souscrire à un abonnement mensuel (9,99€) ou annuel (99,99€) via Stripe en mode test.

Le backend gère la création des sessions de checkout, la mise à jour des abonnements et l’envoi des factures.

Scripts disponibles :

Frontend (client/) :

npm start : Lance l’application en mode développement sur http://localhost:3000.

npm run build : Compile l’application en mode production.

npm test : Lance les tests unitaires (si configurés).

npm run storybook : Lance Storybook pour visualiser et tester les composants.

Backend (server/) :

npm run start : Lance l’application en mode développement.

npm run start:dev : Lance l’application avec rechargement automatique (watch mode).

npm run build : Compile l’application en mode production (dans le dossier dist).

npm run test : Lance les tests unitaires.

npm run test:e2e : Lance les tests end-to-end.

Contributing : Les contributions sont les bienvenues ! Pour contribuer :

Forkez le dépôt.

Créez une branche pour votre fonctionnalité (par exemple, git checkout -b feature/ma-nouvelle-fonctionnalité).

Commitez vos modifications (git commit -m 'Ajouter une nouvelle fonctionnalité').

Poussez la branche (git push origin feature/ma-nouvelle-fonctionnalité).

Ouvrez une Pull Request.

Licence : Ce projet est sous licence MIT.

Contact : Wassini Bouzidi GitHub : https://github.com/wassb92 LinkedIn : https://www.linkedin.com/in/wassini-bouzidi/ -->

# Fake Paradox Coaching

## Présentation

Fake Paradox Coaching est une plateforme de formation interactive combinant développement personnel et technologie. L’application permet aux utilisateurs de s’inscrire, de consulter des cours, de suivre leur progression et de souscrire à des abonnements mensuels ou annuels via Stripe (mode test).

## Fonctionnalités

- Inscription et authentification : création de compte, connexion et gestion du profil.
- Gestion des cours : consultation, création, mise à jour et suppression des cours avec suivi de progression.
- Abonnements et paiements : intégration de Stripe pour gérer des abonnements mensuels (9,99€) et annuels (99,99€), ainsi que l’envoi de factures.
- Administration : accès aux fonctionnalités de gestion des cours réservé aux administrateurs.
- Documentation API : Swagger intégré pour documenter et tester l’API backend.
- Responsive Design : interfaces optimisées pour tous les appareils.

## Architecture du projet

### Frontend (client/)

- Construit avec React et TypeScript.
- Stylisé avec Tailwind CSS et animations avec Framer Motion.
- Navigation assurée par React Router.
- Communication avec le backend via Axios.
- Intégration Stripe en mode test pour les abonnements.

### Backend (server/)

- Construit avec NestJS et TypeScript.
- Gestion de la base de données avec TypeORM et PostgreSQL.
- Authentification via JWT et sécurisation des endpoints.
- Endpoints REST pour la gestion des utilisateurs, des cours et des abonnements.
- Intégration Stripe (mode test) pour la création de sessions de paiement, la gestion des abonnements et l’envoi de factures.
- Documentation de l’API via Swagger.

## Technologies

### Frontend

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- Stripe.js

### Backend

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT
- Stripe
- Swagger

## Contact :

## ![Author](https://img.shields.io/badge/Author-3498db?style=flat&logo=&logoColor=white)

[Wassini Bouzidi](https://github.com/wassb92)

---

## Connect

### 🔧 Wassini Bouzidi

[![Portfolio](https://img.shields.io/badge/Portfolio-Portfolio_De_Wassini-4031D9?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.wassini-bouzidi.com/)  
[![GitHub](https://img.shields.io/badge/GitHub-wassb92-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/wassb92)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-wassini_bouzidi-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wassini-bouzidi/)
