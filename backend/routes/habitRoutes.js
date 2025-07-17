const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createHabit,
  getHabits,
  logHabit,
  getHabitLogs,
  calculateStreak,
  getWeeklyStatus,
  getMonthlyStatus,
  deleteHabit,
} = require("../controllers/habitController");

// All routes are protected
router.use(auth);

// Create a habit
router.post("/", createHabit);

// Get all habits
router.get("/", getHabits);

// Mark as done for today
router.post("/:id/log", logHabit);

// Get all logs for a habit
router.get("/:id/logs", getHabitLogs);

router.get("/:id/streak", calculateStreak);

// Get weekly status
router.get("/:id/weekly-status", getWeeklyStatus);
// Get monthly status
router.get("/:id/monthly-status", getMonthlyStatus);

router.delete('/:id', deleteHabit);

module.exports = router;
