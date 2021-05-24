const Workout = require('./workoutModel');
const Exercise = require('./exerciseModel');

Workout.hasMany(Exercise, {
  foreignKey: 'exercise',
  onDelete: 'CASCADE'
});

Exercise.belongsTo(Workout, {
  foreignKey: 'exercise'
});

module.exports = { Workout, Exercise };
