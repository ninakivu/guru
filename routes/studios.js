const
<<<<<<< HEAD
  express = require('express'),
  studiosRouter = new express.Router(),
  flash = require('connect-flash'),

  Activity = require('../models/Activity.js'),
  Guru = require('../models/Guru.js'),
  User = require('../models/User.js'),
  Studio = require('../models/Studio.js')

// Studios:
studiosRouter.get('/', (req, res) => {
  Studio.find({}, (err, allDemStudios) => {
    if(err) return console.log(err)
    res.render('studios-index', {studios: allDemStudios})
  })
})

// POST/SEARCH all Studios:
studiosRouter.get('/search/:term', (req, res) => {
  const regex2 = new RegExp(req.params.term,'i');
  console.log('Search Term (server side)  :' , req.params.term)
  Studio.find({$or: [{name: regex2}, {location:regex2}]}, (err, results) => {
    console.log('RESULTS   :', results  )
    
    res.json(results)
  })
})

// Create Studio:
studiosRouter.post('/', (req, res) => {
  Studio.create(req.body, (err, brandNewStudio) => {
    res.json({message: "Studio created", Studio: brandNewStudio})
  })
})

module.exports = studiosRouter
=======
express = require('express'),
app = express(),
studioRouter = new express.Router(),

Guru = require('../models/Guru.js'),
User = require('../models/User.js'),
Activity = require('../models/Activity.js'), 
Studio = require('../models/Studio.js')

// SHOW a specific studio:
studioRouter.get('/:id', (req, res) => {
    Studio.findById(req.params.id, (err, datStudio) => {
        if(err) return console.log(err)   
        res.render('studio-show', {Studio: datStudio})  
    }) 
})
>>>>>>> 05dd8dc04bcc7759260e94f2ff5bf3d0c0fcfbe7
