const
  express = require('express')
  app = express(),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session),
  
  passport = require('passport'),
  passportConfig = require('...')

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
  res.render("find your best guru")
})

app.listen(port, (err) => {
  console.log(err || "Running on port: " + port)
})