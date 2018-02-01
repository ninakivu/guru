//user routes

const 
    express = require('express'),
    passport = require('passport'),
    userRouter = new express.Router(),
    methodOverride = require('method-override'), //Method Override
    bodyParser = require('body-parser'),
    User = require('../models/User.js')


    // middleware
    userRouter.use(methodOverride('_method')), //Method Override
    userRouter.use(bodyParser.urlencoded({extended: true})), 
    userRouter.use(bodyParser.json()),
    userRouter.use(methodOverride(function (req, res) {   //Method Override
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
          // look in urlencoded POST bodies and delete it
          var method = req.body._method
          console.log('METHOD TRIGGERED')
          
          //-->>> delete req.body._method
          return method
        }
      }))//END Method Override


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

// PROFILE - EDIT --------------
userRouter.get('/user-edit', isLoggedIn, (req, res) => {
    res.render('user-edit', {user: req.user})

})

// PROFILE - EDIT/PATCH --------------
userRouter.patch('/user-edit', isLoggedIn, (req, res) => {
    console.log('PATCH TRIGGERED')
    console.log(req.body)
    console.log(req.user)
    console.log('user id  ', req.user.id)
    User.findByIdAndUpdate(req.user.id, req.body, {new: true}, (err, myUser) => {
        if(err) return console.log(err)  
        console.log('inside user id  ', myUser.id)
        console.log('inside body sex   ' , req.body.sex)

        myUser.name = req.body.name
        myUser.password = req.body.name
        myUser.zip = req.body.zip
        myUser.gender = req.body.sex
        myUser.picture_url = req.body.picture_url
        myUser.background_url = req.body.background_url
      })
    res.redirect('/user-profile')
})// END EDIT/PATCH --------------



// LOGOUT ------- 
userRouter.get('/user-logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = userRouter

