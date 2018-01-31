//user routes

const 
    express = require('express'),
    passport = require('passport'),
    userRouter = new express.Router()

function isLoggedIn( req, res, next){
    if(req.isAuthenticated()) return next()
    res.redirect('/user-login')
}

// LOGIN -------- 
userRouter.get('/user-login', (req, res) => {
    res.render('user-login')
})

userRouter.post('/user-login', passport.authenticate('user-local-login', {
    successRedirect: '/user-profile',
    failureRedirect: '/user-login'
}) )

// SIGNUP ------- 
userRouter.get('/user-signup', (req, res) => {
    res.render('user-signup')
})

userRouter.post('/user-signup', passport.authenticate('user-local-signup', {
    successRedirect: '/user-profile',
    failureRedirect: '/user-signup'
}) )

// PROFILE ------- 
userRouter.get('/user-profile', isLoggedIn, (req, res) => {

    //^^^^^^^^^^^^^^ checks middleware for Logged-in, if True, continue to 'NEXT'
    res.render('user-profile', {user: req.user})
})

// LOGOUT ------- 
userRouter.get('/user-logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = userRouter

