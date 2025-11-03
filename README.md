# TP — API REST + SSR Pug + JSON (Bibliothèque)

- Prérequis
 Node.js ≥ 18
 NPM installé
 Port libre : 5000 (API + SSR)

# Installer les dépendances
 npm install
 npm i express morgan pug nodemon method-override

# Lancer le serveur
    node app.js

    L’API et le SSR sont disponibles sur : http://localhost:5000

   - Routes API

GET	/books/api/all	 Lister tous les livres
POST	/books/api	 Ajouter un livre
GET	/books/api/:id	 Récupérer un livre spécifique
PUT	/books/api/:id	 Modifier un livre
DELETE	/books/api/:id	Supprimer un livre

   - SSR (Pug)

Liste des livres	/books	    Affichage des livres + ajout
Détail d’un livre	/books/:id	Affichage + modification/suppression
Organisation du projet
.
├── app.js                  # Point d’entrée
├── controllers/
│   └── booksController.js  # Logique pour API + SSR
├── routes/
│   └── routes.js           # Définition des routes API et SSR
├── services/
│   └── booksService.js     # Gestion des livres + EventEmitter + persistance JSON
├── events/
│   └── booksEmitter.js     # Événements bookCreated, bookUpdated, bookDeleted
├── middlewares/
│   └── middleware.js       # Middleware (ex : validation, logs)
├── views/
│   ├── index.pug           # Liste des livres + formulaire ajout
│   └── detail.pug          # Détail + modification + suppression
├── public/
│   └── css/style.css       # Style
└── data/
    └── books.json          # Persistance des livres

- Fonctionnalités

API REST complète pour gestion des livres

Rendu SSR avec Pug pour affichage web

Validation des formulaires et routes API

Logging avec Morgan

EventEmitter pour les événements bookCreated, bookUpdated, bookDeleted

Persistance automatique dans books.json à chaque modification

Application extensible et modulaire

# Testes Postman

![test tt les livres](/images/image.png)

![test ajout livre](/images/image-1.png)

![livre par id](/images/image-2.png)

![modifier livre](/images/image-3.png)

![delete livre](/images/image-4.png)