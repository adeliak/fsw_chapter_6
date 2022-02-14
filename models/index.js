const User_game = require('./user_game')
const Biodata = require('./biodata')
const History = require('./history')

User_game.hasOne(Biodata, {
    foreignKey: 'user_game_uuid',
    as: 'biodata'
})

Biodata.belongsTo(User_game, {
    foreignKey: 'user_game_uuid',
    as: 'user_game'
})

User_game.hasOne(History, {
    foreignKey: 'user_game_uuid',
    as: 'history'
})

History.belongsTo(User_game, {
    foreignKey: 'user_game_uuid',
    as: 'user_game'
})

module.exports = {
    User_game,
    Biodata,
    History
}