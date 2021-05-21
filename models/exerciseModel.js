const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  type: {
    type: String,
    trim: true,
    required: true,
  },

  weight: {
    type: Number,
    required: false,
  },

  sets: {
    type: Number,
    required: false,
  },

  reps: {
    type: Number,
    required: false,
  },

  duration: {
    type: Number,
    required: true,
  },

  distance: {
    type: Number,
    required: false,
  },
});

// const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = ExerciseSchema;
