const userController = require('../controllers/user-controller.js')

const root = {
    registration: userController.registration,
    login: userController.login,
    logout: userController.logout,
    refresh: userController.refreshToken,
    update: userController.update,
}

module.exports = root