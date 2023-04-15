const userModel = require("../models/userModel");
const uuid = require('uuid')
const bcrypt = require('bcrypt');
const MailService = require("./mailService");
const TokenService = require("./TokenService");
const UserDto = require("../dtos/userDto");

class UserService {
    async registration(password, email) {
        const condidate = await userModel.findOne({email})
        if(condidate) {
            throw new Error(`Пользователь с таким ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await userModel.create({email, password: hashPassword, activationLink}) 
        await MailService.sendActivationLink(email, activationLink)
        const data = new UserDto(user)
        const tokens = TokenService.generateToken({...data})
        await TokenService.saveToken(data.id, tokens.refreshToken)
        console.log(data)
        return {...tokens, user: data}
    }
}

module.exports = new UserService()