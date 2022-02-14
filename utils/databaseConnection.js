const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB, process.env.DBUSERNAME, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: process.env.DBDIALECT,
    port: process.env.DBPORT
});

module.exports = sequelize