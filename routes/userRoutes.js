const express = require('express');
const router = express.Router();
const { createUser, listUsers, getUserDetails,barrowBook,returnBook } = require('../controllers/userControllers');
const validationHandler = require("../utils/validators")
const userValidator = require("../utils/validators/userValidator")


router.post('/', validationHandler(userValidator.postUser), createUser);
router.get('/', listUsers);
router.get('/:id',validationHandler(userValidator.getUser), getUserDetails);
router.post('/:id/borrow/:bookId', validationHandler(userValidator.addBorrowRecordForUser), barrowBook);
router.post('/:id/return/:bookId', validationHandler(userValidator.addReturnForUserBorrow), returnBook);

module.exports = router;
