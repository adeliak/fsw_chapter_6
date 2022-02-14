const {Sequelize, DataTypes, Model} = require('sequelize')
const sequelize = require('../utils/databaseConnection')

class User_game extends Model {}

User_game.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
            msg: "Email Already Existed!"
        }
    },

    password: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user_game',
    freezeTableName: true,
    createdAt: true,
    updatedAt: true
});

module.exports = User_game