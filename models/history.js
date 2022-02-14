const {Sequelize, DataTypes, Model} = require('sequelize')
const sequelize = require('../utils/databaseConnection')

class History extends Model {}

History.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    time: {
        type: DataTypes.DATE,
        allowNull: false
    },

    score: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
    },

    user_game_uuid: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'history',
    freezeTableName: true,
    createdAt: true,
    updatedAt: true
});

module.exports = History