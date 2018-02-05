const
  mongoose = require('mongoose'),
  activitySchema = new mongoose.Schema({
    type: {type: String},
    picture_URL: {type: String},
    css: {type: String},
    description:{type: String}
  })

const Activity = mongoose.model('Activity', activitySchema)
module.exports = Activity