const
  mongoose = require('mongoose')
  activitySchema = new mongoose.Schema({
    type: {type: 'string'}
  })
  guruSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    email: {type: 'string'},
    activities: [activitySchema],
    studio: [String],
    Reviews: [String],
    Picture: {type: 'string'}
  })


const Guru = mongoose.model('Guru', guruSchema)
module.exports = Album
