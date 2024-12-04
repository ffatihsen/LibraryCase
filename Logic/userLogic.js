const User = require('../models/user');
const Book = require('../models/book');
const Borrow = require('../models/borrow');


const createUserLogic = async (name) => {
    const newUser = await User.create({ name });
    return newUser;
};


const listUsersLogic = async () => {
    const users = await User.findAll();
    return users;
};


const getUserDetailsLogic = async (id) => {
    const user = await User.findByPk(id, {
        attributes: ['id', 'name'],
        include: [
            {
                model: Borrow,
                as: 'borrows',
                include: [
                    {
                        model: Book,
                        as: 'book',
                        attributes: ['name'],
                    },
                ],
            },
        ],
    });

    if (!user) {
        throw new Error('User not found');
    }

    return {
        id: user.id,
        name: user.name,
        books: {
            past: user.borrows
                .filter((borrow) => borrow.returnDate !== null)
                .map((borrow) => ({
                    name: borrow.book.name,
                    userScore: borrow.score || -1,
                })),
            present: user.borrows
                .filter((borrow) => borrow.returnDate === null)
                .map((borrow) => ({
                    name: borrow.book.name,
                })),
        },
    };
};


const borrowBookLogic = async (userId, bookId) => {
    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);

    if (!user) throw new Error('User not found');
    if (!book) throw new Error('Book not found');

    const existingBorrow = await Borrow.findOne({
        where: { bookId, returnDate: null },
    });

    if (existingBorrow) {
        throw new Error('Book is already borrowed');
    }

    const borrow = await Borrow.create({
        userId,
        bookId,
        borrowDate: new Date(),
    });

    return borrow;
};


const returnBookLogic = async (userId, bookId, score) => {
    if (score && (score < 1 || score > 10)) {
        throw new Error('Score must be between 1 and 10');
    }

    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);

    if (!user) throw new Error('User not found');
    if (!book) throw new Error('Book not found');

    const borrow = await Borrow.findOne({
        where: { userId, bookId, returnDate: null },
    });

    if (!borrow) throw new Error('Borrow record not found');

    borrow.returnDate = new Date();
    if (score) borrow.score = score;

    await borrow.save();
    return borrow;
};

module.exports = {
    createUserLogic,
    listUsersLogic,
    getUserDetailsLogic,
    borrowBookLogic,
    returnBookLogic,
};
