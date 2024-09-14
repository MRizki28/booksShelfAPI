const BookService = require('../service/booksService');
const bookService = new BookService();

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: bookService.createData.bind(bookService),
    },
    {
        method: 'GET',
        path: '/books',
        handler: bookService.getAllData.bind(bookService),
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: bookService.getDataById.bind(bookService),
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: bookService.updateData.bind(bookService),
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: bookService.deleteData.bind(bookService),
    },
]

module.exports = routes;