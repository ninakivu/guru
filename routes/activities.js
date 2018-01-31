// activities routes:

const
  express = require('express'),
  app = express(),
<<<<<<< HEAD
  activityRouter = new express.Router(),
=======
  activityRouter = new express.Router(),  
>>>>>>> 23193db98f1482fb3f0576fddd1f7f1ec345a891
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