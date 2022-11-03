const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    // id: {type: String},
    status: {type: String, default: 'test'},
    avatar: {type: Object, default: {}},
    username: {type: String, required: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model('User', UserSchema);
