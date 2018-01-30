const mongoose = require('mongoose')
Activity = require("./models/Activity.js")
Guru = require("./models/Guru.js")
mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/guru'


// mongoose connection:
mongoose.connect(mongoConnectionString, (err) => {
  console.log(err || "Connected to MongoDB (guru)")

  var gurus = [
    {
      name: "Mark Strong",
      email: "mark@guru.com",
      studio: "Get Strong West LA"
    },
    {
      name: "Philippe",
      email: "philippe@guru.com",
      studio: "Brutal Gym"
    },
    {
      name: "Dylan",
      email: "dylan@guru.com",
      studio: "Get Shredded"
    },
    {
      name: "Ninja",
      email: "ninja@guru.com",
      studio: "Ninja"
    },
    {
      name: "Jimmy",
      email: "jimmy@guru.com",
      studio: "Take Breaks"
    },
  ]

  var activities = [
    {
      type: "Yoga"
    },
    {
      type: "Pilates"
    },
    {
      type: "Boxing"
    },
    {
      type: "Barre"
    },
    {
      type: "Free Weights"
    },
    {
      type: "Martial Arts"
    },
    {
      type: "Rowing"
    },
    {
      type: "Cycling"
    },
    {
      type: "Dance"
    },
    {
      type: "Meditation"
    },
    {
      type: "Zumba"
    },
    {
      type: "Spiritual Awakening"
    },
    {
      type: "Moon Ceremony"
    },
    {
      type: "Lunar Hikes"
    },
    {
      type: "Nutrition"
    },
    {
      type: "Tantric Dance"
    },
    {
      type: "Hot Yoga"
    },
    {
      type: "Pre and Post-natal Yoga"
    },
    {
      type: "Pranayama"
    },
    {
      type: "Midwife"
    },
    {
      type: "Acrobatics"
    },
    {
      type: "Body Pump"
    },
    {
      type: "Crossfit"
    },
    {
      type: "Calisthenics"
    },
    {
      type: "Kettlebell"
    },
    {
      type: "Core"
    },
    {
      type: "Zumba"
    },
    {
      type: "TRX"
    },
    {
      type: "Chanting"
    },
    {
      type: "Yoga Nidra"
    },
    {
      type: "Spinning"
    }
  ]

  Activity.remove({}, (err, deletedActivities) => {
    Activity.insertMany(activities, (err, activitiesCreated) => {
      if(err) return console.log(err)
      console.log ("activitesCreated")
      Guru.remove({}, (err, deletedGurus) => {
        Guru.insertMany(gurus, (err, gurusCreated) => {
          if(err) return console.log(err)
          console.log("gurusCreated")
          mongoose.disconnect((err) => {
            console.log("Disconnected from mongo.")
          })
        })
      })
    })
  })


})


