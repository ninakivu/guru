const
  mongoose = require('mongoose')
  activitySchema = new mongoose.Schema({
    type: {type: 'string'}
  })
  guruSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    email: {type: 'string'},
    activities: {type: [activitySchema], required: true},
    studio: [String],
    reviews: [String],
    picture: {type: 'string'}
  })

const Guru = mongoose.model('Guru', guruSchema)
module.exports = Guru
