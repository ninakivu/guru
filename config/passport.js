
const   
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')
    Guru = require('../models/Guru.js')

 // USER:
passport.serializeUser((user, done) => {    //what of the user will be stored in cookie
    done(null, user.id)
 })

passport.deserializeUser((id, done) => {   //what to read from the cookie, and turn into the user
    User.findById(id, (err, user) => {
         done(err, user)
    })
})

passport.use('user-local-signup', new LocalStrategy({
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

    passport.use('user-local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({email: email}, (err, user) =>{
            if(err) return done(err) 
            if(!user) return done(null, false, req.flash('loginMessage', 'No user found...')) //user not found...do not proceed
            if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'incorrect password')) //password not valid...do not proceed
            return done(null, user)
        })
    }))


// GURU: 
    passport.use('guru-local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        Guru.findOne({email: email}, (err, guru) => {
            if(err) return console.log(err)
            if(guru) return done(null, false, req.flash('signupMessage', 'Email already taken.'))
            var newGuru = new Guru()
            newGuru.name = req.body.name
            newGuru.email = request.body.email
            newGuru.password = newGuru.generateHash(password)
            newGuru.save((err, brandNewGuru) => {
                if(err) return console.log(err)
                return done(null, brandNewGuru, null)
            })
        })
    }))

    passport.use('guru-local-login', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        if(err) return done(err)
        if(!guru) return done(null, false, req.flash('loginMessage', 'No guru found...'))
        if(!guru.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong password'))
        return done(null, guru)
    }))

    module.exports = passport //passport is now configured with our strategies 