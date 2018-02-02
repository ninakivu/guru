const
  express = require('express'),
  app = express(),
  gurusAllRouter = new express.Router(),
  Guru = require('../models/Guru.js'),
  Activity = require('../models/Activity.js')

// Get all gurus:
gurusAllRouter.get('/', (req, res) => {
  Guru.find({}, (err, allDemGurus) => {
    if(err) return console.log(err)
    res.json(allDemGurus)
  })
})

// Create a guru:
gurusAllRouter.post('/', (req,res) => {
  var newGuru = new Guru(req.body)
  newGuru.name = req.body.name
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
  Guru.findById(req.params.id, (err, thatGuru) => {
    res.json(thatGuru)
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
module.exports = gurusAllRouter