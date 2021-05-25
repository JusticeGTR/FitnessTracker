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

    Workout.aggregate( [
        {
          $addFields: {
            totalWeight: { $sum: "$exercises.weight" } ,
            totalDuration: { $sum: "$exercises.duration" },
          }
        },
     ] )
    .sort({ date: -1 }).limit(7)
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

//get route for last workout on homepage
router.get('/api/workouts', (req, res) => {
    console.log('We hit the get workout route')
    Workout.aggregate([
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
          }
        },
     ])
    .then(allWorkouts => {
        res.json(allWorkouts)})
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})

router.post('/api/workouts', ({}, res) => {

    Workout.create()
    .then(newWorkout => {
      res.json(newWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

router.post('/api/workouts', ({ body }, res) => {
    Workout.exercises.create(body)
    .then(newExercise => {
        res.json(newExercise);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})

router.post('/api/workouts/:id', ({ body }, res) => {
    Workout.exercises.create(body)
    .then(newExercise => {
        res.json(newExercise);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})

module.exports = router