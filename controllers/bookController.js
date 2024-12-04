const bookLogic = require('../Logic/bookLogic');

const createBook = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newBook = await bookLogic.createBook(name);
        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
};

const listBooks = async (req, res, next) => {
    try {
        const books = await bookLogic.listBooks();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

const getBookDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await bookLogic.getBookDetails(id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBook,
    listBooks,
    getBookDetails,
};
