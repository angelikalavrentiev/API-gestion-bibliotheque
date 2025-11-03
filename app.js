const express = require('express');
const path = require('node:path');
const morgan = require('morgan');
const methodOverride = require('method-override');

const booksRoutes = require('./routes/routes');
const middleware = require('./middlewares/middleware');

const app = express();

// middleware fichiers statiques dans public
app.use(express.static(path.join(__dirname, 'public')));

// middleware de parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware method-override (utiliser des requetes via champ caché d'un form)
app.use(methodOverride('_method'));

// middleware Morgan (logs console)
app.use(morgan('dev'));

// middleware logs personnalisés
app.use(middleware.requestLogger);

// moteur de vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// routes principales
app.get('/', (req, res) => res.redirect('/books'));
app.use('/api/books', booksRoutes);

// middleware erreurs globales
app.use(middleware.errorHandler);

// lance le serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 