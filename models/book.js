const { DataTypes } = require('sequelize');
const sequelize = require("../config/databaseconfig");

const Book = sequelize.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
});


module.exports = Book;
