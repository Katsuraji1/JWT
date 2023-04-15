const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')


class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({refreshToken, user: userId})
        return token
    }
}

module.exports = new TokenService()