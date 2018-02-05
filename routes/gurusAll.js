const
  express = require('express'),
  gurusAllRouter = new express.Router(),
  flash = require('connect-flash'),

  Activity = require('../models/Activity.js'),
  Guru = require('../models/Guru.js'),
  User = require('../models/User.js'),
  Studio = require('../models/Studio.js')

// Get all gurus:
gurusAllRouter.get('/', (req, res) => {
  Guru.find({}, (err, allDemGurus) => {
    if(err) return console.log(err)
          Activity.find({}, (err, allDemActivities) => {
            if(err) return console.log(err)   
             console.log('PRINT ACTIVITIES  :', allDemActivities)
            console.log('Current User:  ', req.user)
            res.render('guru-index', {gurus: allDemGurus, user: req.user, activities: allDemActivities})
        
          })
    
    
  })
})

// POST/SEARCH all GURUS:
gurusAllRouter.get('/search/:term', (req, res) => {
  const regex1 = new RegExp(req.params.term,'i');
  console.log('Search Term (server side)  :' , req.params.term)
  Guru.find({$or: [{name: regex1}, {studio: regex1}, {zip: regex1}]}, (err, results) => {
    console.log('RESULTS   :', results  )
    res.json(results)
  })
})



// Create a guru:
gurusAllRouter.post('/', (req,res) => {
  var newGuru = new Guru(req.body)
  newGuru.name = req.body.name
  newGuru.picture_url = "http://ww1.prweb.com/prfiles/2015/04/27/12682663/Hot-Spot-Guru-Icon-Logo.png"
  Activity.find({type: req.body.activities}, (err, thatActivity) => {
    newGuru.activities = thatActivity._id
  })
  newGuru.save((err, brandNewGuru) => {
    if(err) return console.log(err)
    res.json({message: "Guru born! ", guru: brandNewGuru})
  })
})

// Show a specific Guru:    
gurusAllRouter.get('/:id', (req, res) => {
  Guru.findById(req.params.id).populate('activities').populate('studios').exec((err, thatGuru) => {
    if(err) return console.log(err)
    res.render('guru-profile', {guru: thatGuru})
  })
})

// Add activity to a specific guru:
gurusAllRouter.post('/:id/activities', (req, res) => {
  Guru.findById(req.params.id, (err, thatGuru) => {
    thatGuru.activities.push(req.body.activity)
    thatGuru.save((err, savedGuru) => {
      res.redirect(`/gurus/${req.params.id}`)
    })
  })
})

// Add studio to a specific guru:
gurusAllRouter.post('/:id/studios', (req, res) => {
  Guru.findById(req.params.id, (err, thatGuru) => {
    thatGuru.studios.push(req.body.studio)
    thatGuru.save((err, savedGuru) => {
      res.redirect(`/gurus/${req.params.id}`)
    })
  })
})


module.exports = gurusAllRouter