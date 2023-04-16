const ApiError = require("../exceptions/apiError");
const userService = require("../service/userService");
const {validationResult} = require('express-validator')

class UserContoller {
    async registration (req, res, next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации',errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(password, email)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } 
        catch(e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try{

        } 
        catch(e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try{

        } 
        catch(e) {
            next(e)
        }
    }

    async refresh (req, res, next) {
        try{

        } 
        catch(e) {
            next(e)
        }
    }

    async users (req, res, next) {
        try{
            res.json(['1','1'])
        } 
        catch(e) {
            next(e)
        }
    }

    async activate (req, res, next) {
        try{
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.FRONTEND_HOST)
        } 
        catch(e) {
            next(e)
        }
    }
}

module.exports = new UserContoller()