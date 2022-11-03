const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

const tokenService = {
    generateTokens: async (payload) => {
        const accessToken = jwt.sign(payload, 'process.env.SECRET', { expiresIn: '1min' })
        const refreshToken = jwt.sign(payload, 'process.env.SECRET', { expiresIn: '30d' })
        const tokens = { accessToken, refreshToken }
        return tokens
    },

    saveToken: async (userId, refreshToken) => {
        const tokenData = await tokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ user: userId, refreshToken })
        return token;
    },

    removeToken: async (refreshToken) => {
        await tokenModel.deleteOne({ refreshToken })
    },

    validateRefreshToken: async (refreshToken) => {
        try {
            const userData = jwt.verify(refreshToken, 'process.env.SECRET');
            return userData;
        } catch (e) {
            const userData = null
            return userData
        }
    },

    findToken: async (refreshToken) => {
        const tokenData = await tokenModel.findOne({ refreshToken })
        return tokenData;
    }
}

module.exports = tokenService