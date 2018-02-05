const
  bcrypt = require('bcrypt-nodejs'),
  mongoose = require('mongoose'),
  guruSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    zip: {type: String},
    activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}], 
    studios: [{type: mongoose.Schema.Types.ObjectId, ref: 'Studio'}], 
    reviews: [String],
    picture_url: {type: String},
    class: {type: String},
    facebookId: String

  })

guruSchema.methods.generateHash = function(password){   //takes password and encodes it. Make Hash of the user
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

guruSchema.methods.validPassword = function(password){
    console.log("checking password...")
    return bcrypt.compareSync(password, this.password)  //compares password provided with password in database
}

// To rehash the password (if you want to change the password):
guruSchema.pre('save', function(next) {
  if(this.isModified('password')) {
      this.password = this.generateHash(this.password)
  }
  next()
})

const Guru = mongoose.model('Guru', guruSchema)
module.exports = Guru
