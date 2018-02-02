//guru routes
const
  express = require('express'),
  app = express(),
  guruRouter = new express.Router(),
  passport = require('passport'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  
  Guru = require('../models/Guru.js'),
  Activity = require('../models/Activity.js')

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
  res.render('guru-login')
})

guruRouter.post('/guru-login', passport.authenticate('guru-local-login', {
  successRedirect: '/guru-profile',
  failureRedirect: '/guru-login'
}))

// Sign up:
guruRouter.get('/guru-signup', (req, res) => {
  res.render('guru-signup')
})

guruRouter.post('/guru-signup', passport.authenticate('guru-local-signup', {
  successRedirect: '/guru-profile',
  failureRedirect: '/guru-signup'
}))

// Profile:
guruRouter.get('/guru-profile', isLoggedIn, (req, res) => {
  res.render('guru-profile', {guru: req.user})
})

// Edit profile:
guruRouter.get('/guru-edit', isLoggedIn, (req, res) => {
  Activity.find({}, (err, activities) => {
    res.render('guru-edit', {guru: req.user, activities})
  })
})

// Update guru:
guruRouter.patch('/guru-edit', isLoggedIn, (req, res) => {
  console.log('PATCH TRIGGERED')
  console.log(req.body)
  console.log(req.user)
  console.log('user id  ', req.user.id)
  Guru.findByIdAndUpdate(req.user.id, req.body, {new: true}, (err, myUser) => {
    if(err) return console.log(err)  
    console.log('inside user id  ', myUser.id)
    console.log('inside body sex   ' , req.body.sex)

    myUser.name = req.body.name
    myUser.email = req.body.email
    myUser.password = req.body.password
    myUser.activities = req.body.activities
    myUser.studio = req.body.studio
    myUser.reviews = req.body.reviews
    myUser.picture = req.body.picture
  })
  res.redirect('/guru-profile')
})

// Logout guru:
guruRouter.get('/guru-logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = guruRouter