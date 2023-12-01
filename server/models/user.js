const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    },
    gender: String,
    avatar: String,
    domain: String,
    available: Boolean,
   
})

module.exports = mongoose.model('User', userSchema)