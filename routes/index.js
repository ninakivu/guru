//user routes

const 
    express = require('express')
    passport = require('passport')
    userRouter = new express.Router()


function isLoggedIn( req, res, next){
    if(req.isAuthenticated()) return next()
    res.redirect('/login')
}





// LOGIN -------- 
userRouter.get('/login', (req, res) => {
    res.render('login')
})

userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}) )

// SIGNUP ------- 
userRouter.get('/signup', (req, res) => {
    res.render('signup')
})

userRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
}) )

// PROFILE ------- 
userRouter.get('/profile', isLoggedIn, (req, res) => {
                        //^^^^^^^^^^^^^^ checks middleware for Logged-in, if True, continue to 'NEXT'
    res.render('profile', {user: req.user})
})

// LOGOUT ------- 
userRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})




module.exports = userRouter

