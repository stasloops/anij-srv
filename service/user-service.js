const short = require('shortid');
const userModel = require('../models/user-model');
const tokenService = require('./token-service');
const bcrypt = require('bcrypt');

const userService = {
    registration: async ({password, username}) => {
        // const id = short()
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await userModel.create({ username, password: hashPassword })
        const tokens = await tokenService.generateTokens({ user });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return { tokens, user }
    },

    login: async ({password, username}) => {
        const user = await userModel.findOne({ username })
        if (!user) {
            return {user}
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            return {isPassEquals}
        }

        const tokens = await tokenService.generateTokens({ user });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return { tokens, user, isPassEquals }
    },

    refresh: async (refreshToken) => {
        const userData = await tokenService.validateRefreshToken(refreshToken);
        if (!userData) {
            return {userData}
        }

        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!tokenFromDb) {
            return {tokenFromDb}
        }
        
        const user = await userModel.findById(userData.user._id);
        const tokens = await tokenService.generateTokens({ user });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return { tokens, user, tokenFromDb, userData }
    }

}

module.exports = userService