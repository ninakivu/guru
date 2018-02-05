const
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