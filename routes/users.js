//user routes

const 
    express = require('express'),
    passport = require('passport'),
    flash = require('connect-flash'),
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
    //console.log(req.body)
    console.log(req.user)
    console.log('user id  ', req.user.id)

    User.findById(req.user.id, (err, myUser) => {
        if(err) return console.log(err)
        
        // filter out empty fields:: empty fields may overwrite current fields if not removed
        const userUpdateData = {}    //make a new object
        for(field in req.body) {        //for each field in req.body
            if(req.body[field] != "") userUpdateData[field] = req.body[field]  //if req.body field is NOT empty, then save filled field into NEW field AND OBJECT (userUpdateData)
        }

        // merge what's left into the user
         Object.assign(myUser, userUpdateData)  //push userUpdateData INTO myUser; myUser is updated 
        //const user = {...myUser, ...userUpdateData}

        myUser.save((err, savedUser) => {    //save myUser, return new savedUser
            if(err) return console.log(err)
            console.log(savedUser)
            res.redirect('/user-profile')
        }) //end save

    }) //END FindBy
    
})// END EDIT/PATCH --------------


// PROFILE - DELETE --------------
userRouter.delete('/user-delete', isLoggedIn, (req, res) => {
    
    User.findByIdAndRemove(req.user.id, (err, destroyedUser) => {    
        if(err) return console.log(err)                     
        console.log('DESTROYED USER:   ', destroyedUser)
        req.logout()
        res.redirect('/')
    })   //end FindBy       
    
})// END DELETE -----


// LOGOUT ------- 
userRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = userRouter

