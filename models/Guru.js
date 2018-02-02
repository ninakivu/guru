const
  bcrypt = require('bcrypt-nodejs'),
  mongoose = require('mongoose'),
  guruSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}], 
    studios: [String],
    reviews: [String],
    picture: {type: 'string'}
  })

guruSchema.methods.generateHash = function(password){   //takes password and encodes it. Make Hash of the user
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

guruSchema.methods.validPassword = function(password){
    console.log("checking password...")
    return bcrypt.compareSync(password, this.password)  //compares password provided with password in database
}

const Guru = mongoose.model('Guru', guruSchema)
module.exports = Guru
