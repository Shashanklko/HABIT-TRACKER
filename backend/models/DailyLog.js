const mongoose = require("mongoose");
const DailyLogSchema = new mongoose.Schema({
    habitId: String,
    date: String,
    isDone:Boolean
});
module.exports = mongoose.model("DailyLog", DailyLogSchema);