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
    studio: "Get Strong West LA",
    zip:"91792",
    picture_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Mark_Strong_%28Berlin_Film_Festival_2011%29.jpg/220px-Mark_Strong_%28Berlin_Film_Festival_2011%29.jpg",
    class: "guru"

  },
  {
    name: "Philippe",
    email: "philippe@guru.com",
    studio: "Brutal Gym",
    zip:"90038",
    picture_url:"https://thumbnailer.mixcloud.com/unsafe/300x300/extaudio/9/3/c/8/3e93-8ef2-49e3-827c-90a396bb601a.jpg",
    class: "guru"
  },
  {
    name: "Dylan",
    email: "dylan@guru.com",
    studio: "Get Shredded",
    zip:"90272",
    picture_url:"https://i.kinja-img.com/gawker-media/image/upload/s--xZn9q6km--/18ersq53ma05rjpg.jpg",
    class: "guru"
  },
  {
    name: "Ninja",
    email: "ninja@guru.com",
    studio: "Ninja",
    zip:"90291",
    picture_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Melania_Trump_Official_Portrait.jpg/399px-Melania_Trump_Official_Portrait.jpg",
    class: "guru"
  },
  {
    name: "Jimmy",
    email: "jimmy@guru.com",
    studio: "Take Breaks",
    zip:"90038",
    picture_url:"https://ga-core.s3.amazonaws.com/production/uploads/instructor/image/3684/thumb_IMG_9270__1_.JPG",
    class: "guru"
  },
]

var activities = [
  {
    type: "Yoga",
    picture_URL:"/images/yoga_3.jpg",
    css: "yoga",
    description:"Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India. There is a broad variety of yoga schools, practices, and goals in Hinduism, Buddhism, and Jainism."
  },
  {
    type: "Pilates",
    picture_URL:"/images/pilates_slide_3.jpg",
    css: "pilates",
    description:"Pilates is the art of controlled movements, which should look and feel like a workout (not a therapy) when properly manifested. If practiced with consistency, Pilates improves flexibility, builds strength and develops control and endurance in the entire body."
  },
  {
    type: "Boxing",
    picture_URL:"/images/boxing_2.jpg", 
    css: "boxing",
    description:"Boxing burns an insane amount of calories. It incorporates high intensity interval training. It provides variety for cardio. It's a combination of both cardio and resistance training. It's a total body workout. It's one of the best forms of stress relief. It requires mental exercise and skill. It boosts confidence."
  },
  {
    type: "Running",
    picture_URL:"/images/running_1.jpg",
    css: "running",
    description:"Any exercise is good exercise, but when it comes to losing weight, it's hard to beat running. After all, running is one of the most efficient ways to burn calories."
  },
  {
    type: "Long Distance Running",
    picture_URL:"/images/running_ld2.jpg",
    css: "ldrunning",
    description:"Long-distance running success requires discipline, dedication and proper training. A well-designed training plan will improve your running performance and reduce your risk of injury. When you are preparing for a long-distance race, whether it's a 10K, a marathon or an even longer distance, your training plan must include appropriate mileage, strength and flexibility work, quality run workouts and recovery days."
  },
  {
    type: "Barre",
    picture_URL:"/images/barre_1.png",
    css: "barre",
    description:"Barre is a form of physical exercise, usually conducted in group classes in gyms or specialty studios. It is distinguished from other group fitness activities by its use of the ballet barre and its incorporation of movements derived from ballet."
  },
  {
    type: "Free Weights",
    picture_URL:"/images/free_weights_1.jpg",
    css: "freeweights",
    description:"Lifting free weights is the surest way to strengthen your muscles, burn calories, and become better at pretty much everything you do."
  },
  {
    type: "Martial Arts",
    picture_URL:"/images/martial_Arts_01.jpg",
    css: "martialarts",
    description:"Whether or not you ever plan on taking your moves to the ring, martial arts training is one of the most intense workouts you can do. This calorie-torching form of exercise challenges and tones every part of your body—and mastering a fierce uppercut or switch kick is incredibly empowering! "
  },
  {
    type: "Rowing",
    picture_URL:"/images/rowing_1.jpg",
    css: "rowing",
    description:"Rowing can burn up to 800 calories an hour and is extremely effective in working your whole body from head to toe. Quads, hamstrings, back, abdominals, arms, shoulders and calves are all used in the rowing stroke."
  },
  {
    type: "Cycling",
    picture_URL:"/images/cycling_2.jpg",
    css: "cycling",
    description:"Due to the nature of the activity, cycling burns a large amount of calories. Cycling is a great exercise for those wanting to help their weight loss."
  },
  {
    type: "Dance",
    picture_URL:"/images/dance_music-girl_4.jpg",
    css: "dance",
    description:"Dancing is a whole-body workout that's actually fun. It's good for your heart, it makes you stronger, and it will help with balance and coordination."
  },
  {
    type: "Meditation",
    picture_URL:"/images/meditation_1.jpg",
    css: "meditation",
    description:"Meditation can help us to understand our own mind. We can learn how to transform our mind from negative to positive, from disturbed to peaceful, from unhappy to happy. Overcoming negative minds and cultivating constructive thoughts is the purpose of the transforming meditations found in the Buddhist tradition."
  },
  {
    type: "Spiritual Awakening",
    picture_URL:"/images/spiritual_awakening.jpg",
    css: "spiritualawakening",
    description:"Take a deep breath. Hold it.... hold it.... hold it... Now let it go. Let's multiply that feeling of euphoric release a hundred times -- a thousands times -- a million times over! "
  },
  {
    type: "Moon Ceremony",
    picture_URL:"/images/moon_ceremony.jpg",
    css: "moonceremony",
    description:"The moon — with its unending cycles that ebb from dark to light — is a longtime enchantress. ... Thus, mystics and healers the world over hold the moon's cycles in sacred regard, marking its passing phases with ceremonies and rituals to honor the connection between nature and ourselves."
  },
  {
    type: "Lunar Hikes",
    picture_URL:"/images/lunar_hikes.jpg",
    css: "lunarhikes",
    description:"Walking under the full moon is free, easy, available to all, and it just might teach you something about yourself."
  },
  {
    type: "Nutrition",
    picture_URL:"/images/nutrition_2.jpg",
    css: "nutrition",
    description:"Food provides the energy and nutrients you need to be healthy. Nutrients include proteins, carbohydrates, fats, vitamins, minerals, and water. Healthy eating is not hard. The key is to. Eat a variety of foods, including vegetables, fruits, and whole-grain products."
  },
  {
    type: "Tantric Dance",
    picture_URL:"/images/tantric_dance3.jpg",
    css: "tantricdance",
    description:"Tantric Dance is a sensuous movement meditation.  It is spontaneous, womb-centered, contained, serpentine, and pleasurable!  Unlike other forms of dance, it is not technique oriented, but process oriented.  It is a devotional or meditation “practice” in the sense that one returns to it again and again to reconnect with one’s source, or core energy. "
  },
  {
    type: "Hot Yoga",
    picture_URL:"/images/hot yoga_4.png",
    css: "hotyoga",
    description:"The heat in Bikram Yoga is used to increase the 'tourniquet effect', to train the mind, and to improve circulation to the joints."
  },
  {
    type: "Pre and Post-natal Yoga",
    picture_URL:"/images/postnatal_yoga_1.jpg",
    css: "natalyoga",
    description:"Prenatal yoga will calm your mind, body, and spirit, while helping you thoroughly enjoy the experience of pregnancy and the miracle of childbirth."
  },
  {
    type: "Pranayama",
    picture_URL:"/images/Pranayama_1.jpg",
    css: "pranayama",
    description:"Pranayama are breathing exercises which clear the physical and emotional obstacles in our body to free the breath and so the flow of prana - life energy. Through a regular and sustained practice of pranayama you can supercharge your whole body!"
  },
  {
    type: "Midwife",
    picture_URL:"/images/midwife__3.jpg",
    css: "midwife",
    description:""
  },
  {
    type: "Acrobatics",
    picture_URL:"/images/acrobatics_4.jpg",
    css: "acrobatics",
    description:"Doing crunches and sit ups aren't the only way to get in shape. Flips, climbs, spins and other acrobatic moves can also yield the results you desire in an exercise regimen. "
  },
  {
    type: "Body Pump",
    picture_URL:"/images/body_pump.jpg",
    css: "bodypump",
    description:"This addictive workout challenges all of your major muscle groups by using the best weight-room exercises such as squats, presses, lifts and curls. The key is to focus on high repetition movements with low weight loads."
  },
  {
    type: "Crossfit",
    picture_URL:"/images/crossfit_5.jpg",
    css: "crossfit",
    description:"CrossFit workouts incorporate elements from high-intensity interval training, Olympic weightlifting, plyometrics, powerlifting, gymnastics, girevoy sport, calisthenics, strongman, and other exercises. "
  },
  {
    type: "Calisthenics",
    picture_URL:"/images/Calisthenics_1.jpg",
    css: "calisthenics",
    description:"The word calisthenics comes from the Greek words kallos (beauty) and sthenos (strength). Indeed, there’s a timeless beauty to training for strength and flexibility via pushing, pulling, lunging, and lifting movements using little to no equipment. When performed in a continuous, rigorous fashion, calisthenics train up your strength and aerobic capacity."
  },
  {
    type: "Kettlebell",
    picture_URL:"/images/kettlebell.jpg",
    css: "kettlebell",
    description:""
  },
  {
    type: "Core",
    picture_URL:"/images/coretraining_1.jpg",
    css: "core",
    description:"Resembling a mini bowling ball with a handle, kettlebells are great for cardio, strength, and flexibility training . "
  },
  {
    type: "Zumba",
    picture_URL:"/images/zumba_img.jpg",
    css: "zumba",
    description:"rooving to the beats of salsa, flamenco, and merengue music feels more like a dance party than a workout, which is exactly what makes Zumba so popular. The Latin-inspired dance workout is one of the most popular group exercise classes in the world. "
  },
  {
    type: "TRX",
    picture_URL:"/images/trx_5.jpg",
    css: "trx",
    description:"TRX turns every exercise into a challenge for the core by using two very accessible resources: gravity and your bodyweight."
  },
  {
    type: "Chanting",
    picture_URL:"/images/chanting_2.jpg",
    css: "chanting",
    description:"Chanting is a spiritual discipline believed to improve listening skills, heightened energy and more sensitivity toward others. "
  },
  {
    type: "Yoga Nidra",
    picture_URL:"/images/yoga_Nidra_2.jpg",
    css: "yoganidra",
    description:"Yoga Nidra is a state of consciousness between waking and sleeping, like the 'going-to-sleep' stage. It is a state in which the body is completely relaxed, and the practitioner becomes systematically and increasingly aware of the inner world by following a set of verbal instructions."
  },
  {
    type: "Spinning",
    picture_URL:"/images/spinning.jpg",
    css: "spinning",
    description:"We love to ride our bikes outside, but sometimes a spin class is a quick way to get a super intense fitness fix that could see you reaping serious benefits in power and speed. "
  },
  {
    type: "Marathon Training",
    picture_URL:"/images/running_marathon.jpg",
    css: "marathontraining",
    description:"The key to successful marathon training is consistently putting in enough weekly mileage to get your body accustomed to running for long periods of time."
  },
  {
    type: "Fencing",
    picture_URL:"/images/fencing_2.jpg",
    css: "fencing",
    description:"Fencing is a group of three related combat sports. The three disciplines in modern fencing are the foil, the épée, and the sabre; winning points are made through the contact with an opponent. "
  },
  {
    type: "Self Defense",
    picture_URL:"/images/self_defense_2.jpg",
    css: "selfdefense",
    description:"Self-defense training helps you learn to be more aware of your surroundings and to be prepared for the unexpected at any time."
  },
  {
    type: "Pole Dancing",
    picture_URL:"/images/pole_dancing_3.jpg",
    css: "poledancing",
    description:"Pole dance mixes arts of exotic pole dance as well as gymnastics. Flips, splits, and power are all elements in this craft. "
  }
]
var studios = [
  {
    name: "Brutal Gym",
    location:"West LA"
  },
  {
    name: "Golds Gym",
    location:"Venice, CA"
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
    name: "Muscle Hustle",
    location:"Westwood, LA"
  },
  {
    name: "Equinox",
    location:"Beverly Hills"
  },
  {
    name: "Gym 24/7",
    location:"Brentwood, LA"
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


