const router = require('express').Router();
// const Exercise = require('../models/exerciseModel');
const Workout = require('../models/workoutModel')
const path = require('path');
// const { db } = require('../models/workoutModel');


router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
router.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, '../public/exercise.html')));
router.get('/stats', (req, res) => res.sendFile(path.join(__dirname, '../public/stats.html')));

//get route for data on dashboard
router.get('/api/workouts/range', (req, res) => {
    Workout.find({})
    Workout.workouts.aggregate( [
        {
          $addFields: {
            totalWeight: { $sum: "$weight" } ,
            totalDuration: { $sum: "$duration" },
            totalDistance: { $sum: "$distance" },
          }
        },
        {
          $addFields: { totalScore:
            { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
        }
     ] )
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})
//get route for last workout on homepage
router.get('/api/workouts', (req, res) => {
    // db.Book.find({})
    // .then(dbBook => {
    //   res.json(dbBook);
    // })
    // .catch(err => {
    //   res.json(err);
    // });
    console.log('We hit the get workout route')
    Workout.find({})
    .then(allWorkouts => {
        res.json(allWorkouts)})
    .catch(err => {
        console.log(err)
        // res.json(err)
    })


})
//two post routes for adding exercises to a workout, one for each exercise type
router.post('/api/workouts', ({ body }, res) => {
    const workout = new Workout(body);

    Exercise.create(body)
    .then(dbexercise => {
      res.json(dbexercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

module.exports = router