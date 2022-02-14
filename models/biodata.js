const {Sequelize, DataTypes, Model} = require('sequelize')
const sequelize = require('../utils/databaseConnection')

class Biodata extends Model {}

Biodata.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    first_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    age: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
    },

    gender: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    user_game_uuid: {
        type: DataTypes.UUID,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'biodata',
    freezeTableName: true,
    createdAt: true,
    updatedAt: true
});

module.exports = Biodata