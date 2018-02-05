const mongoose = require('mongoose')
Activity = require("./models/Activity.js")
Guru = require("./models/Guru.js")
Studio = require("./models/Studio.js")
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
    type: "Yoga",
    picture_URL:"https://pbs.twimg.com/media/DTwuu2iVAAAWTRH.jpg",
    css: "yoga"
  },
  {
    type: "Pilates",
    css: "pilates"
  },
  {
    type: "Boxing", 
    css: "boxing"
  },
  {
    type: "Running",
    css: "running"
  },
  {
    type: "Long Distance Running",
    css: "ldrunning"
  },
  {
    type: "Barre",
    css: "barre"
  },
  {
    type: "Free Weights",
    css: "freeweights"
  },
  {
    type: "Martial Arts",
    css: "martialarts"
  },
  {
    type: "Rowing",
    css: "rowing"
  },
  {
    type: "Cycling",
    css: "cycling"
  },
  {
    type: "Dance",
    css: "dance"
  },
  {
    type: "Meditation",
    css: "meditation"
  },
  {
    type: "Spiritual Awakening",
    css: "spiritualawakening"
  },
  {
    type: "Moon Ceremony",
    css: "moonceremony"
  },
  {
    type: "Lunar Hikes",
    css: "lunarhikes"
  },
  {
    type: "Nutrition",
    css: "nutrition"
  },
  {
    type: "Tantric Dance",
    css: "tantricdance"
  },
  {
    type: "Hot Yoga",
    css: "hotyoga"
  },
  {
    type: "Pre and Post-natal Yoga",
    css: "natalyoga"
  },
  {
    type: "Pranayama",
    css: "pranayama"
  },
  {
    type: "Midwife",
    css: "midwife"
  },
  {
    type: "Acrobatics",
    css: "acrobatics"
  },
  {
    type: "Body Pump",
    css: "bodypump"
  },
  {
    type: "Crossfit",
    css: "crossfit"
  },
  {
    type: "Calisthenics",
    css: "calisthenics"
  },
  {
    type: "Kettlebell",
    css: "kettlebell"
  },
  {
    type: "Core",
    css: "core"
  },
  {
    type: "Zumba",
    css: "zumba"
  },
  {
    type: "TRX",
    css: "trx"
  },
  {
    type: "Chanting",
    css: "chanting"
  },
  {
    type: "Yoga Nidra",
    css: "yoganidra"
  },
  {
    type: "Spinning",
    css: "spinning"
  },
  {
    type: "Marathon Training",
    css: "marathontraining"
  },
  {
    type: "Fencing",
    css: "fencing"
  },
  {
    type: "Self Defense",
    css: "selfdefense"
  },
  {
    type: "Pole Dancing",
    css: "poledancing"
  }
]
var studios = [
  {
    name: "Brutal Gym",
    location:"West LA"
  },
  {
    name: "Golds Gym",
    location:"Venice"
  },
  {
    name: "Meditation Station",
    location:"Santa Monica"
  },
  {
    name: "Ninja Gym",
    location:"Hollywood"
  },
  {
    name: "Pilates Platinum",
    location:"West LA"
  },
  {
    name: "Power Hourr",
    location:"Downtown"
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
          Studio.remove({}, (err, deletedStudios) => {
            Studio.insertMany(studios, (err, studiosCreated) => {
              if(err) return console.log(err)
              console.log("studiosCreated")
              mongoose.disconnect((err) => {
                console.log("Disconnected from mongo.")
              })
            })
          }) 
        })
      })
    })
  })
})


