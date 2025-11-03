const fs = require('node:fs');
const path = require('node:path');
const booksEmitter = require('../events/booksEmitter');

class BooksService {
    constructor() {
        this.filePath = path.join(__dirname, '../data/books.json');
        this.books = this.loadBooks();
        this.emitter = booksEmitter;

        //sauvegarde automatique
        this.emitter.on('bookCreated', () => this.saveBooks());
        this.emitter.on('bookDeleted', () => this.saveBooks());
        this.emitter.on('bookUpdated', () => this.saveBooks());
    }

    // charge les livres de book.json
loadBooks() {
    try {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf8').trim();

            if (!data) {
                console.warn('books.json est vide. Utilisation des valeurs par défaut.');
                return this.getDefaultBooks();
            }

            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Erreur de lecture ou de parsing du fichier books.json', err);
    }

    return this.getDefaultBooks();
}

getDefaultBooks() {
    return [
        { id: 1, title: "1984", author: "George Orwell", disponible: true },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", disponible: false },
        { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", disponible: true }
    ];
}

// sauvegarde la liste des livres dans book.json
saveBooks() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.books, null, 2));
    console.log('Sauvegarde effectuée dans books.json');
}


getAllBooks() {
    return this.books;
}

getBookById(id) {
    return this.books.find(book => book.id === id);
}

createBook(book) {
    const newBook = {
            id: this.books.length ? this.books[this.books.length - 1].id + 1 : 1,
            title: book.title,
            author: book.author,
            disponible: book.disponible === true
    };
    this.books.push(newBook);
    this.emitter.emit('bookCreated', newBook);
    return newBook;
}

updateBook(id, updatedInfo) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return null;
    }
    this.books[bookIndex] = {
        ...this.books[bookIndex],
        ...updatedInfo, 
        disponible: updatedInfo.disponible === true
    };
    const updatedBook = this.books[bookIndex];
    this.emitter.emit('bookUpdated', updatedBook);
    return updatedBook;
}   

deleteBook(id) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return false;
    }
    this.books.splice(bookIndex, 1);
    this.emitter.emit('bookDeleted', id);
    return true;
}
}
module.exports = new BooksService();