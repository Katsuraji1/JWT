const ApiError = require("../exceptions/apiError")
const TokenService = require("../service/TokenService")


module.exports = function( req, res, next) {
    try{
        const authHeader = req.headers.authorization
        if(!authHeader) {
            return next(ApiError.UnauthorizedError())
        }
        const authToken = authHeader.split(' ')[1]
        if(!authToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = TokenService.validateAccessToken(authToken)
        if(!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData
        next()

    } catch(e) {
        next(ApiError.UnauthorizedError())
    }
}