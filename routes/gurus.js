//guru routes
const
  express = require('express'),
  guruRouter = new express.Router(),
  passport = require('passport'),
  flash = require('connect-flash'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  
  Guru = require('../models/Guru.js'),
  User = require('../models/User.js'),
  Activity = require('../models/Activity.js'), 
  Studio = require('../models/Studio.js')

// middleware
guruRouter.use(methodOverride('_method')), 
guruRouter.use(bodyParser.urlencoded({extended: true})), 
guruRouter.use(bodyParser.json()),
guruRouter.use(methodOverride(function (req, res) {   //Method Override
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    console.log('METHOD TRIGGERED')
    
    //-->>> delete req.body._method
    return method
  }
}))

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/guru-login')
}

guruRouter.get('/guru-login', (req, res) => {
  res.render('guru-login', {message: req.flash('loginMessage')})
})

guruRouter.post('/guru-login', passport.authenticate('guru-local-login', {
  successRedirect: '/guru-profile',
  failureRedirect: '/guru-login'
}))

// Sign up:
guruRouter.get('/guru-signup', (req, res) => {
  res.render('guru-signup', {message: req.flash('signupMessage')})
})

guruRouter.post('/guru-signup', passport.authenticate('guru-local-signup', {
  successRedirect: '/guru-profile',
  failureRedirect: '/guru-signup'
}))

// Profile:
guruRouter.get('/guru-profile', isLoggedIn, (req, res) => {
  res.render('guru-profile', {guru: req.user, message: req.flash('signupMessage')})
})

// Edit profile:
guruRouter.get('/guru-edit', isLoggedIn, (req, res) => {
  Activity.find({}, (err, activities) => {
    Studio.find({}, (err, studios) => {
      req.user.populate('activities', (err, guru) => {
        res.render('guru-edit', {guru, studios, activities: activities})
        console.log(activities)
      })
    })
  })
})

// Update guru:
guruRouter.patch('/guru-edit', isLoggedIn, (req, res) => {
  console.log('PATCH TRIGGERED')
  console.log(req.body)
  console.log(req.user)
  console.log('user id  ', req.user.id)
  Guru.findById(req.user.id, req.body, (err, myGuru) => {
    if(err) return console.log(err)  
    
    // to filter out all the empty fields (that were not changed)
    const guruUpdateData = {}
    
    //  You loop through an object to merge what is left into the user
    for(field in req.body) {
        if(req.body[field] != "") guruUpdateData[field] = req.body[field]
    }

    // Object constructor: usually creates a new object 
    // assign = object constructor method
    Object.assign(myGuru, guruUpdateData)
    myGuru.save((err, savedGuru) => {
        if(err) return console.log(err)
        res.redirect('/guru-profile')
    })
  })
})

// Logout guru:
guruRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = guruRouter