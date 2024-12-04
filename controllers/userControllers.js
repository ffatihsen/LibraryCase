const userLogic = require('../Logic/userLogic');

const createUser = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newUser = await userLogic.createUserLogic(name);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const listUsers = async (req, res, next) => {
    try {
        const users = await userLogic.listUsersLogic();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getUserDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDetails = await userLogic.getUserDetailsLogic(id);
        res.status(200).json(userDetails);
    } catch (error) {
        next(error);
    }
};

const barrowBook = async (req, res, next) => {
    try {
        const { id, bookId } = req.params;
        const borrow = await userLogic.borrowBookLogic(id, bookId);
        res.status(200).json({ message: 'Book borrowed successfully.', borrow });
    } catch (error) {
        next(error);
    }
};

const returnBook = async (req, res, next) => {
    try {
        const { id, bookId } = req.params;
        const { score } = req.body;
        const borrow = await userLogic.returnBookLogic(id, bookId, score);
        res.status(200).json({ message: 'Book returned successfully.', borrow });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    listUsers,
    getUserDetails,
    barrowBook,
    returnBook,
};
