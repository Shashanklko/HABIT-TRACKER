const Habit = require("../models/Habit");
const DailyLog = require("../models/DailyLog");

// Create a habit
const createHabit = async (req, res) => {
  try {
    const { name, timeOfDay, reminderTime } = req.body;
    const habit = new Habit({
      userId: req.user.userId,
      name,
      timeOfDay,
      reminderTime, // store reminder time
    });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating habit" });
  }
};

// Get all habits for a user
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.userId });
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching habits" });
  }
};

// Mark a habit done for a date
const logHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    let log = await DailyLog.findOne({ habitId: id, date });
    if (log) {
      return res
        .status(400)
        .json({ message: "Habit already marked as done today" });
    }

    log = new DailyLog({ habitId: id, date, isDone: true });
    await log.save();
    res.status(200).json({ message: "Habit marked as done for today" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging habit" });
  }
};

// Get logs for a habit
const getHabitLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const logs = await DailyLog.find({ habitId: id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching logs" });
  }
};

// Calculate streak for a habit
const calculateStreak = async (req, res) => {
  try {
    const { id } = req.params;

    // Get all dates this habit was done, sorted descending
    const logs = await DailyLog.find({ habitId: id, isDone: true }).sort({
      date: -1,
    });

    const logDates = logs.map((log) => log.date);

    let streak = 0;
    let today = new Date();

    for (let i = 0; i < logDates.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(today.getDate() - i);

      const yyyy = expectedDate.getFullYear();
      const mm = String(expectedDate.getMonth() + 1).padStart(2, "0");
      const dd = String(expectedDate.getDate()).padStart(2, "0");
      const expectedStr = `${yyyy}-${mm}-${dd}`;

      if (logDates.includes(expectedStr)) {
        streak++;
      } else {
        break; // Streak broken
      }
    }

    res.json({ streak });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error calculating streak" });
  }
};

const getWeeklyStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Start from today and go back 6 days
    const status = {};
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}-${mm}-${dd}`;

      // Check if log exists
      const log = await DailyLog.findOne({
        habitId: id,
        date: dateStr,
        isDone: true,
      });
      status[dateStr] = !!log;
    }

    res.json(status);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching weekly habit status" });
  }
};
const getMonthlyStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Start from today and go back 29 days
    const status = {};
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}-${mm}-${dd}`;

      // Check if log exists
      const log = await DailyLog.findOne({
        habitId: id,
        date: dateStr,
        isDone: true,
      });
      status[dateStr] = !!log;
    }

    res.json(status);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching monthly habit status" });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;
    // Delete the habit
    await Habit.deleteOne({ _id: id, userId: req.user.userId });
    // Delete all logs for this habit
    await DailyLog.deleteMany({ habitId: id });
    res.status(200).json({ message: "Habit and logs deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting habit" });
  }
};

// Placeholder for scheduled reminders/notifications
const sendScheduledReminders = async () => {
  // TODO: Implement actual notification delivery (email, push, etc.)
  // For each user, for each habit, check if a reminder is due and send notification
  // This function would be called by a cron job or scheduler
  console.log("Scheduled reminders would be sent here.");
};

module.exports = {
  createHabit,
  getHabits,
  logHabit,
  getHabitLogs,
  calculateStreak,
  getWeeklyStatus,
  getMonthlyStatus,
  deleteHabit,
  sendScheduledReminders, // export for cron/scheduler
};
