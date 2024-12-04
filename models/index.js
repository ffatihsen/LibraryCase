const sequelize = require('../config/databaseconfig');
const User = require('./user');
const Book = require('./book');
const Borrow = require('./borrow');


User.hasMany(Borrow, { foreignKey: 'userId', as: 'borrows' });
Borrow.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Book.hasMany(Borrow, { foreignKey: 'bookId', as: 'borrows' });
Borrow.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });


module.exports = { sequelize, User, Book, Borrow };
