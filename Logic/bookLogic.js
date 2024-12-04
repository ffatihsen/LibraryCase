const Book = require('../models/book');
const Borrow = require('../models/borrow');
const User = require('../models/user');
const { Sequelize } = require('sequelize');

const createBook = async (name) => {
    return await Book.create({ name });
};


const listBooks = async () => {
    return await Book.findAll();
};


const getBookDetails = async (id) => {
    try {

        const book = await Book.findByPk(id, {
            attributes: ['id', 'name'],
            raw: true,
            nest: true,
        });

        if (!book) {
            return null;
        }

        const scores = await Borrow.findAll({
            where: { bookId: id, score: { [Sequelize.Op.ne]: null } },
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('score')), 'averageScore'],
            ],
        });


        const averageScore = scores[0] ? scores[0].get('averageScore') : null;

        return {
            id: book.id,
            name: book.name,
            score: averageScore ? Number(averageScore).toFixed(2) : 0.0, 
        };
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createBook,
    listBooks,
    getBookDetails,
};
