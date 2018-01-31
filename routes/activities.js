// activities routes:

const
  express = require('express'),
  app = express(),
  activityRouter = new express.Router(),
  Guru = require('../models/Guru.js'),
  Activity = require('../models/Activity.js')

// Show all activities:
activityRouter.get('/', (req, res) => {
  Activity.find({}, (err, allDemActivities) => {
    res.json(allDemActivities)
  })
})

// Show a specific activity:
activityRouter.get('/:id', (req, res) => {
  Activity.findById(req.params.id, (err, datActivity) => {
    res.json(datActivity)
  })
})

// Create activity:
activityRouter.post('/', (req, res) => {
  Activity.create(req.body, (err, brandNewActivity) => {
    res.json({message: "Activity created", Activity: brandNewActivity})
  })
})

// Index of al GURUs for certain activity:
activityRouter.get('/:id/gurus', (req, res) => {
  Guru.find({activities: req.params.id}, (err, allGuruForThis) => {
    res.json(allGuruForThis)
  })
})

module.exports = activityRouter