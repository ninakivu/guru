const
  express = require('express')
  app = express(),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session),

  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  //userRouter = new express.Router(),
  Guru = require('./models/Guru.js'),
  Activity = require('./models/Activity.js')
  indexRoutes = require('./routes/index.js')

// environment port
const
  port = process.env.PORT || 3000,
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/guru'

// mongoose connection:
mongoose.connect(mongoConnectionString, (err) => {
  console.log(err || "Connected to MongoDB (guru)")
})

// store session info in sessions collection in Mongo:
const store = new MongoDBStore({
  uri: mongoConnectionString,
  collection: 'sessions'
})

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(session({
  secret: "i am your guru",
  cookie: {maxAge: 8000000},
  resave: true,
  saveUninitialized: false,
  store: store
}))

app.use(passport.initialize())
app.use(passport.session())

// root route
app.get('/', (req, res) => {
  res.render('splash')
})

// Get all gurus:
app.get('/gurus', (req, res) => {
  Guru.find({}, (err, allDemGurus) => {
    if(err) return console.log(err)
    res.json(allDemGurus)
  })
})

// Create a guru:
app.post('/gurus', (req,res) => {
  var newGuru = new Guru(req.body)
  newGuru.name = req.body.name
  Activity.find({type: req.body.activities}, (err, thatActivity) => {
    newGuru.activities = thatActivity._id
  })
  newGuru.save((err, brandNewGuru) => {
    if(err) return console.log(err)
    res.json({message: "Guru born! ", guru: brandNewGuru})
  })
  
})

// Show a specific Guru:
app.get('/gurus/:id', (req, res) => {
  Guru.findById(req.params.id, (err, thatGuru) => {
    res.json(thatGuru)
  })
})

// Show all activities:
app.get('/activities', (req, res) => {
  Activity.find({}, (err, allDemActivities) => {
    res.json(allDemActivities)
  })
})

// Show a specific activity:
app.get('/activities/:id', (req, res) => {
  Activity.findById(req.params.id, (err, datActivity) => {
    res.json(datActivity)
  })
})

// Create activity:
app.post('/activities', (req, res) => {
  Activity.create(req.body, (err, brandNewActivity) => {
    res.json({message: "Activity created", Activity: brandNewActivity})
  })
})

// Index of al GURUs for certain activity:
app.get('/activities/:id/gurus', (req, res) => {
  Guru.find({activities: req.params.id}, (err, allGuruForThis) => {
    res.json(allGuruForThis)
  })
})

app.listen(port, (err) => {
  console.log(err || "Running on port: " + port)
})


/// USER AUTHORIZATION =====================
//is User logged in?
function isLoggedIn( req, res, next){
  if(req.isAuthenticated()) return next()
  res.redirect('/login')
}

/////INDEX ROUTES ------

app.use('/', indexRoutes)



