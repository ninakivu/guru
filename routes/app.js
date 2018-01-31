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