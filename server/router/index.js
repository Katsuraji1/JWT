const userController = require('../controllers/userController')
const {body} = require('express-validator')

const Router = require('express').Router

const router = new Router()

router.post('/registration',body('email').isEmail(), body('password').isLength({min:4, max: 16}) ,userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/users', userController.users)
router.get('/refresh', userController.refresh)

module.exports = router