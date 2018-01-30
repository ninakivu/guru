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
        picture_url: String,
        background_url: String

        
    })

    userSchema.methods.generateHash = function(password){   //takes password and encodes it. Make HAsh of the user

        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }
    
    userSchema.methods.validPassword = function(password){
    
        return bcrypt.compareSync(password, this.password)  //compares password provided with password in database
    }

    const User = mongoose.model('User', userSchema)

    module.exports = User