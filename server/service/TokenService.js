const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')
require('dotenv').config()


class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try{
            const data = jwt.verify(token, process.env.SECRET_ACCESS_KEY)
            return data
        } catch(e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try{
            const data = jwt.verify(token, process.env.SECRET_REFRESH_KEY)
            return data
        } catch(e) {
            return null
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

    async removeToken(refreshToken) {
        const TokenData = await tokenModel.deleteOne({refreshToken})
        return TokenData
    }

    async findToken(refreshToken) {
        const data = await tokenModel.findOne({refreshToken})
        return data
    }
}

module.exports = new TokenService()