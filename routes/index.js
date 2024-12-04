
const express = require("express");
const router = express.Router();

const userRouter = require("./userRoutes")
const bookRouter = require("./bookRoutes")

router.use("/users", userRouter);
router.use("/books", bookRouter);

module.exports = router;