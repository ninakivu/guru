//guru routes
const
  express = require('express'),
  app = express(),
  guruRouter = new express.Router(),
  Guru = require('../models/Guru.js'),
  Activity = require('../models/Activity.js')

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/guru-login')
}

guruRouter.get('/guru-login', (req, res) => {
  res.render('guru-login')
})

guruRouter.post('/guru-login', passport.authenticate('guru-local-login', {
  successRedirect: '/guru-profile',
  failureRedirect: '/guru-login'
}))

guruRouter.get('/guru-signup', (req, res) => {
  res.render('guru-signup')
})

guruRouter.post('/guru-signup', passport.authenticate('guru-local-signup', {
  successRedirect: '/guru-profile',
  failureRedirect: '/guru-signup'
}))

guruRouter.get('/guru-profile', isLoggedIn, (req, res) => {
  res.render('guru-profile', {guru: req.user})
})

guruRouter.get('/guru-logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// Get all gurus:
guruRouter.get('/', (req, res) => {
  Guru.find({}, (err, allDemGurus) => {
    if(err) return console.log(err)
    res.json(allDemGurus)
  })
})

// Create a guru:
guruRouter.post('/', (req,res) => {
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
guruRouter.get('/:id', (req, res) => {
  Guru.findById(req.params.id, (err, thatGuru) => {
    res.json(thatGuru)
  })
})


module.exports = guruRouter