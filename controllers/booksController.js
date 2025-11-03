const booksService = require('../services/booksService');

exports.getAllBooks = (req, res) => {
    const books = booksService.getAllBooks();
    res.json(books);
}

exports.getBookById = (req, res) => {
    const book = booksService.getBookById(parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
}

exports.createBookForm = (req, res) => {
    const book = booksService.createBook(req.body);
    res.redirect('/books');
}

exports.createBookAPI = (req, res) => {
    const book = booksService.createBook(req.body);
    res.status(201).json(book);
}

exports.updateBook = (req, res) => {
    const id = parseInt(req.params.id); 
    const book = booksService.updateBook(id, req.body);

    if (req.originalUrl.startsWith('/books/api')) {
        return res.json(book);
    }

    res.redirect(`/books/${id}`);
}

exports.deleteBook = (req, res) => {
    const success = booksService.deleteBook(parseInt(req.params.id));
    if (!success) {
        return res.status(404).json({ message: 'Book not found' });
    }   
    if (req.originalUrl.startsWith('/books/api')) {
        return res.status(204).send();
    }
    res.redirect('/books');
}

exports.renderBooksList = (req, res) => {
    const books = booksService.getAllBooks();
    res.render('index', { books });
}

exports.renderBookDetail = (req, res) => {
    const book = booksService.getBookById(parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.render('detail', { book });
}