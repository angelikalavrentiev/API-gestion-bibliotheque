const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const middleware = require('../middlewares/middleware');

// routes des api
router.get('/all', booksController.getAllBooks);
router.post('/', middleware.validateBook, booksController.createBookAPI);
router.get('/:id', booksController.getBookById);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

// routes view (pug)
router.get('/', booksController.renderBooksList);
router.get('/:id', booksController.renderBookDetail);
router.post('/', middleware.validateBook, booksController.createBookForm); 
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;