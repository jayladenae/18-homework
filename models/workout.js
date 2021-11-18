const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date.now()
  },
  excersices: {
    type: Array,
    required: true
  }
});


module.exports = mongoose.model('Workout', workoutSchema);
