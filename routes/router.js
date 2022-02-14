const express = require('express')
const router = express.Router()
const { User_game, Biodata, History } = require('../models')
router.get('/api/user_game', async (req, res, next) => {
    try {
        const userGameList = await User_game.findAll({
            include: ['biodata', 'history']
        })
        res.status(200).json({
            message: 'SUCCESS',
            data: userGameList
        })
    } catch (error) {
        next(error)
    }
})

router.get('/api/biodata', async (req, res, next) => {
    try {
        const biodataList = await User_game.findAll({
            include: ['user_game']
        })
        res.status(200).json({
            message: 'SUCCESS',
            data: biodataList
        })
    } catch (error) {
        next(error)
    }
})

router.get('/api/history/:id', async (req, res, next) => {
    try {
        const historyList = await History.findOne({
            where: {
                user_game_uuid: req.params.id
            }
        })
        if (historyList) {
            res.status(200).json({
                message: 'SUCCESS',
                data: historyList
            })
        } else {
            res.status(404).json ({
                message: "User Not Found"
            })
        }
    } catch (error) {
        next(error)
    }
})

router.post('/api/user_game', async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        const newUserGame = await User_game.create({
            name,
            email: email,
            password
        })
        if (newUserGame) {
            res.status(201).json({
                message: "SUCCESS",
                data: newUserGame
            })
        } else {
            res.status(400).json ({
                message: "FAILED",
            })
        }
    }
    catch (error) {
        next(error)
    }
})

router.post('/api/biodata', async (req, res, next) => {
    const { first_name, last_name, age, gender, phone_number, user_game_uuid} = req.body
    try {
        const newBiodata = await Biodata.create ({
            first_name,
            last_name,
            age,
            gender,
            phone_number,
            user_game_uuid
        })
        if (newBiodata) {
            res.status(201).json ({
                message: "SUCCESS",
                data: newBiodata
            })
    } else {
        res.status(400).json ({
            message: 'FAILED'
        })
    }
} catch(error) {
    next(error)
    }
})

router.post('/api/history', async(req, res, next) => {
    const { score, user_game_uuid } = req.body
    try {
        const newHistory = await History.create ({
            time: new Date(),
            score,
            user_game_uuid
        })
        if (newHistory) {
            res.status(201).json ({
                message: "SUCCESS",
                data: newHistory
            })
        } else {
            res.status(400).json ({
                message: "FAILED"
            })

        }
    } catch(error) {
        next(error)
    }
})

router.put('/api/user_game/:id', async (req, res, next) => {

    const { name, email, password, first_name, last_name, age, gender, phone_number } = req.body
    try {
        const userGameToUpdate = await User_game.findByPk(req.params.id)
        if (userGameToUpdate) {
            const biodataToUpdate = await Biodata.findOne({
                where: {
                    user_game_uuid: req.params.id
                }
            })
            const updatedBiodata = await biodataToUpdate.update({
                first_name: first_name ?? biodataToUpdate.first_name,
                last_name: last_name ?? biodataToUpdate.last_name,
                age: age ?? biodataToUpdate.age,
                gender: gender ?? biodataToUpdate.gender,
                phone_number: phone_number ?? biodataToUpdate.phone_number
            })
            const updatedUserGame = await userGameToUpdate.update({
                name: name ?? userGameToUpdate.name,
                email: email ?? userGameToUpdate.email,
                password: password ?? userGameToUpdate.password
            })
            res.status(200).json ({
                message: "SUCCESS",
                data: {updatedUserGame, updatedBiodata}
            })    
        } else {
            res.status(404).json ({
                message: "User Not Found"
            })
        }
    } catch(error) {
        next(error)
    }
})

router.put('/api/history/:id', async (req, res, next) => {
    const { score } = req.body
    try {
    const historyToUpdate = await History.findOne({
            where: {
                user_game_uuid: req.params.id
            }
        })
    console.log(historyToUpdate)
    if (historyToUpdate) {
        const updatedHistory = await historyToUpdate.update({
            time: new Date(),
            score: score ?? historyToUpdate.score,
        })
        res.status(200).json ({
            message: "SUCCESS",
            data: updatedHistory
        })    
    } else {
        res.status(404).json ({
            message: "User Not Found"
        })
    }
    } catch(error) {
        next(error)
    }
})

router.delete('/api/user_game/:id', async (req, res, next) => {

    try {
        const userToDelete = await User_game.findByPk(req.params.id)
        if (userToDelete) {
            await Biodata.destroy ({
                where: { user_game_uuid: req.params.id }
            })

            const deleted = await User_game.destroy ({
                where: {
                    uuid: req.params.id
                }
            })

            console.log(deleted)
            res.status(200).json ({
                message: "SUCCESS"
            })

        } else {
            res.status(404).json ({
                message: "FAILED"
            })
        }
    } catch (error) {
        next(error)
    }
})
// })
// }) 

module.exports = router