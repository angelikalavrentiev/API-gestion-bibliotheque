const EventEmitter = require('events');

class booksEmitter extends EventEmitter {
    constructor() {
        super();

        // evènements déclanchés lors de la création/modification/suppression
        this.on('bookCreated', (book) => {
            console.log(`New book created: ${book.title} by ${book.author}`);
        });

        this.on('bookUpdated', (book) => {
            console.log(`Book updated: ${book.title} by ${book.author}`);
        });

        this.on('bookDeleted', (bookId) => {
            console.log(`Book deleted with ID: ${bookId}`);
        });
    }
}

module.exports = new booksEmitter();