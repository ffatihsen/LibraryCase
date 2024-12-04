const express = require("express")
const router = express.Router()
const { createBook,listBooks, getBookDetails} = require('../controllers/bookController');
const validationHandler = require("../utils/validators")
const bookValidator = require("../utils/validators/bookValidator")


router.post('/',validationHandler(bookValidator.postBook), createBook);
router.get('/', listBooks);
router.get('/:id',validationHandler(bookValidator.getBook), getBookDetails);



module.exports = router