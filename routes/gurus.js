//guru routes
const
  express = require('express'),
  app = express(),
  guruRouter = new express.Router()

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

module.exports = guruRouter