const router = require('express').Router();
const Exercise = require('../models/exerciseModel');
const Workout = require
const path = require('path');


router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
router.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, '../public/exercise.html')));
router.get('/stats', (req, res) => res.sendFile(path.join(__dirname, '../public/stats.html')));

//get route for data on dashboard
// router.get('/api/stats', (req, res) => {
//     exercise.find({})
//     .sort({ date: -1 })
//     .then(Workout => {
//       res.json(Workout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// })
//get route for last workout on homepage
//two post routes for adding exercises to a workout, one for each exercise type
router.post('/api/exercise', ({ body }, res) => {
    Exercise.create(body)
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

module.exports = router