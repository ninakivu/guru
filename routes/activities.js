// activities routes:

const
  express = require('express'),
  app = express(),
  activityRouter = new express.Router(),
  Guru = require('../models/Guru.js'),
  Activity = require('../models/Activity.js')

// SHOW all activities:
activityRouter.get('/', (req, res) => {

  Activity.find({}, (err, allDemActivities) => {
    if(err) return console.log(err)   
    // console.log('PRINT   :', allDemActivities)
    res.render('activities', {user: req.user, activities: allDemActivities})
  })
})// END SHOW Activities


// POST/SEARCH all activities:
activityRouter.get('/search/:term', (req, res) => {
    const regex = new RegExp(req.params.term,'i');
    console.log('Search Term (server side)  :' , req.params.term)
    Activity.find({$or: [{type: regex}]}, (err, results) => {
      console.log('RESULTS   :', results  )
      
      res.json(results)
    })

})// END POST/SEARCH all activities:



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

// Index of all GURUs for certain activity:
activityRouter.get('/:id/gurus', (req, res) => {
  Guru.find({activities: req.params.id}, (err, allActiveGuru) => {
    console.log(allActiveGuru)
    res.render('activity-gurus', {guru: allActiveGuru})
  })
})

module.exports = activityRouter