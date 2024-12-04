const { DataTypes } = require('sequelize');
const sequelize = require("../config/databaseconfig");
const User = require('./user');
const Book = require('./book');

const Borrow = sequelize.define('Borrow', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        }
    },
    borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 10
        }
    }
}, {
    timestamps: true
}); 


module.exports = Borrow;
