const
  express = require('express'),
  gurusAllRouter = new express.Router(),
  Guru = require('../models/Guru.js'),
  flash = require('connect-flash'),
  Activity = require('../models/Activity.js'),
  Studio = require('../models/Studio.js')

// Get all gurus:
gurusAllRouter.get('/', (req, res) => {
  Guru.find({}, (err, allDemGurus) => {
    if(err) return console.log(err)
    res.render('guru-index', {gurus: allDemGurus})
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