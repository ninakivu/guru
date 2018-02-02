const
  mongoose = require('mongoose'),
  studioSchema = new mongoose.Schema({
    name: {type: String},
    location: {type: String}
  })

const Studio = mongoose.model('Studio', studioSchema)
module.exports = Studio