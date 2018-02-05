const
  express = require('express'),
  facebookRouter = new express.Router(),
  flash = require('connect-flash'),

  Activity = require('../models/Activity.js'),
  Guru = require('../models/Guru.js'),
  User = require('../models/User.js'),
  Studio = require('../models/Studio.js'),
  request = require('request')

// Studios:
// facebookRouter.get('/',
// passport.authenticate('facebook', { scope: ['email']}));

// facebookRouter.get('/callback', passport.authenticate('facebook', { failureRedirect: '/splash' }),
// function(req, res) {
//   // Successful authentication, redirect home. 
//   res.redirect('/activities');
// });

facebookRouter.get('/user', passport.authenticate('user-fb-login', { scope: ['email']}))

facebookRouter.get('/callback', passport.authenticate('user-fb-login', {
  failureRedirect: '/',
  successRedirect: '/activities'
}))

facebookRouter.get('/guru', passport.authenticate('guru-fb-login', { scope: ['email']}))

facebookRouter.get('/callback/guru', passport.authenticate('guru-fb-login', {
  failureRedirect: '/',
  successRedirect: '/activities'
}))


module.exports = facebookRouter