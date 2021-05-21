const mongoose = require("mongoose");
const ExerciseSchema = require("./exerciseModel.js")

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercise: [ExerciseSchema],

  day: {
    type: Date,
    default: Date.now
  },

});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
