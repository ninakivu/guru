const
  mongoose = require('mongoose')
  guruSchema = new mongoose.Schema({
    name: {type: 'string'},
    email: {type: 'string'},
    activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}], 
    studio: [String],
    reviews: [String],
    picture: {type: 'string'}
  })

const Guru = mongoose.model('Guru', guruSchema)
module.exports = Guru
