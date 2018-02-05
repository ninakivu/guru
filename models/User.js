//user model

const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs')
    userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        gender: String,
        zip: {type: String},
        favorites: [String],
        picture_url: String,
        background_url: String,
        class: {type: String},
        facebookId: String

        
    })

    userSchema.methods.generateHash = function(password){   //takes password and encodes it. Make HAsh of the user
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }
    
    userSchema.methods.validPassword = function(password){
        return bcrypt.compareSync(password, this.password)  //compares password provided with password in database
    }


    // MONGOOSE MIDDLEWARE: before updating a user, check to see if password was modified.
    // if so, rehash it into sdlkfsdlkfnsldfnsldkfnsdlfknsdf before saving.

// To rehash the password (if you want to change the password):

    userSchema.pre('save', function(next) {
        if(this.isModified('password')) {
            this.password = this.generateHash(this.password)
        }
        next()
    })


    const User = mongoose.model('User', userSchema)
    module.exports = User


    
