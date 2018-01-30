const   
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')


    passport.serializeUser((user, done) => {    //what of the user will be stored in cookie
        done(null, user.id)

    })

    passport.deserializeUser((id, done) => {   //what to read from the cookie, and turn into the user
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true      
    }, (req, email, password, done) => {
        User.findOne({email: email}, (err, user) =>{  //find a user
            if(err) return done(err)
            if(user) return done(null, false, req.flash('signupMessage', 'That email is already taken.')) //if user exists, then stop user
                var newUser = new User()     //make a New User
                newUser.name = req.body.name
                newUser.email = req.body.email
                newUser.password = newUser.generateHash(password)
                newUser.save((err, brandNewUser) =>{
                    if(err) return  console.log(err)
                    return done(null, brandNewUser, null)
                })
        })
    }))

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({email: email}, (err, user) =>{
            if(err) return done(err) 
            if(!user) return done(null, false, req.flash('loginMessage', 'No user found...')) //user not found...do not proceed
            if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'incorrect password'))//password not valid...do not proceed
        })
    }))

    module.export = passport  //passport is now configured with our strategies 