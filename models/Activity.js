const
  mongoose = require('mongoose'),
  activitySchema = new mongoose.Schema({
    type: {type: String}
  })

const Activity = mongoose.model('Activity', activitySchema)
module.exports = Activity