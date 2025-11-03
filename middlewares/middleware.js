const fs = require('node:fs');
const path = require('node:path');

// enregistre les logs dans un fichier requests.log
const requestLogger = (req, res, next) => {
    const now = new Date().toISOString();
    const logMessage = `[${now}] ${req.method} ${req.originalUrl}\n`;

    console.log(logMessage.trim());

    const logFilePath = path.join(__dirname, '../logs/requests.log');
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) console.error('Erreur d’écriture du log:', err);
    });

    next();
};

// gère les erreurs globales
const errorHandler = (err, req, res, next) => {
    console.error('Erreur détectée :', err.message);

    if (req.originalUrl.startsWith('/books/api')) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
    } else {
        res.status(500).render('error', { message: 'Erreur interne du serveur' });
    }
};

// vérifie les champs des livres
const validateBook = (req, res, next) => {
    const { title, author } = req.body;
    if (!title || !author) {
        if (req.originalUrl.startsWith('/books/api')) {
            return res.status(400).json({ error: 'Titre et auteur requis' });
        }
        return res.status(400).render('error', { message: 'Titre et auteur requis' });
    }
    next();
};

module.exports = {
    requestLogger,
    errorHandler,
    validateBook
};
