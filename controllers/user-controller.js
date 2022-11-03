const userModel = require("../models/user-model");
const tokenService = require("../service/token-service");
const userService = require("../service/user-service");

const userController = {
    registration: async ({ input }) => {
        try {
            const { password, username } = input
            const userData = await userModel.findOne({ username })

            if (password.length < 8) {
                return { errors: { code: 400, message: 'Пароль должен быть больше 8 символов' } }
            }
            if (username.length < 2) {
                return { errors: { code: 400, message: 'Имя должно быть больше 2 символов' } }
            }
            if (userData) {
                return { errors: { code: 400, message: 'Такое имя уже существует' } }
            }

            const data = await userService.registration({ password, username })

            return { user: data.user, tokens: data.tokens }
        } catch (e) {
            console.log(e);
            return { errors: { code: 500, message: 'Не предусмотренная ошибка' } }
        }

    },
    login: async ({ input }) => {
        try {
            const { password, username } = input;

            const data = await userService.login({ username, password });
            if (!data.user) {
                return { errors: { code: 400, message: 'Не верно указан e-mail или пароль' } }
            }
            if (!data.isPassEquals) {
                return { errors: { code: 400, message: 'Не верно указан e-mail или пароль' } }
            }

            return { user: data.user, tokens: data.tokens }
        } catch (e) {
            console.log(e);
            return { errors: { code: 500, message: 'Не предусмотренная ошибка' } }
        }
    },

    logout: async ({ input }) => {
        try {
            const { refreshToken } = input

            await tokenService.removeToken(refreshToken);

            return { errors: { code: 200, message: 'ok' } }
        } catch (e) {
            console.log(e);
            return { errors: { code: 500, message: 'Не предусмотренная ошибка' } }
        }
    },

    refreshToken: async ({ input }) => {
        try {
            const { refreshToken } = input
            if (!refreshToken) {
                return { errors: { code: 401, message: 'Пользователь не авторизован' } }
            }

            const data = await userService.refresh(refreshToken);
            if (!data.tokenFromDb || !data.userData) {
                return { errors: { code: 401, message: 'Пользователь не авторизован' } }
            }
            console.log(data.user, 'data.user');
            return { user: data.user, tokens: data.tokens }
        } catch (e) {
            console.log(e);
            return { code: 500, message: 'Не предусмотренная ошибка' }
        }
    },

    update: async ({ input }) => {
        try {
            const { avatar, userid } = input

            console.log(avatar);
            const user = await userModel.findByIdAndUpdate({_id: userid}, { avatar: avatar }, { new: true })
            console.log(user, 'user');
            return { errors: { code: 5300, message: 'предусмотренная ошибка' } }
        } catch (e) {
            console.log(e);
            return { errors: { code: 500, message: 'Не предусмотренная ошибка' } }
        }
    }
}




module.exports = userController
