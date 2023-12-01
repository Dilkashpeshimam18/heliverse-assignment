const express = require('express')
const userController = require('../controllers/user')

const router = express.Router()

router.get('/allUser', userController.getAllUser)
router.get('/userDetail/:id', userController.getUserDetail)
router.post('/addUser', userController.addNewUser)
router.put('/updateUser/:id', userController.updateUser)
router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router