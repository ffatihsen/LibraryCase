const { DataTypes } = require('sequelize');
const sequelize = require("../config/databaseconfig");


const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
});


module.exports = User;
