const mongoose = require("mongoose");
const HabitSchema = new mongoose.Schema({
  userId: String,
  name: String,
  timeOfDay: String,
  reminderTime: String, // e.g., '08:00', optional
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Habit", HabitSchema);
