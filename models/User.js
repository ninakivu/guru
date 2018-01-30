//user model

const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs')
    userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        gender: String,
        zip: Number,
        favorites: String,

        
    })