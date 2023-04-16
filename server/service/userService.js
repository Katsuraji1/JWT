const userModel = require("../models/userModel");
const uuid = require('uuid')
const bcrypt = require('bcrypt');
const MailService = require("./mailService");
const TokenService = require("./TokenService");
const UserDto = require("../dtos/userDto");
const ApiError = require('../exceptions/apiError')

class UserService {

    async registration(password, email) {
        const condidate = await userModel.findOne({email})
        if(condidate) {
            throw ApiError.BadRequest(`Пользователь с таким ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await userModel.create({email, password: hashPassword, activationLink}) 
        await MailService.sendActivationLink(email, `${process.env.MAIN_HOST}/api/activate/${activationLink}`)
        const data = new UserDto(user)
        const tokens = TokenService.generateToken({...data})
        await TokenService.saveToken(data.id, tokens.refreshToken)
        return {...tokens, user: data}
    }

    async activate(activationLink) {
        const user = await userModel.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest('Неверная ссылка')
        }

        user.isActivated = true
        await user.save()
    }

    async login(password, email) {
        const user = await userModel.findOne({email})
        if(!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if(!isPasswordEqual) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const data = new UserDto(user)
        const tokens = TokenService.generateToken({...data})
        await TokenService.saveToken(data.id, tokens.refreshToken)
        return {...tokens, user: data}
    }

    async logout(refreshToken) {
        const data = await TokenService.removeToken(refreshToken)
        return data
    }

    async refresh (refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDataBase = await TokenService.findToken(refreshToken)
        if(!userData || !tokenFromDataBase) {
            throw ApiError.UnauthorizedError()
        }

        const user = await userModel.findById(userData.id)

        const data = new UserDto(user)
        const tokens = TokenService.generateToken({...data})
        await TokenService.saveToken(data.id, tokens.refreshToken)
        return {...tokens, user: data}
    }
}

module.exports = new UserService()