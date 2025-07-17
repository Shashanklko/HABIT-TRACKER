import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Dashboard.module.css";

function CalendarRow({ status, isMonthly }) {
  const days = Object.keys(status);
  return (
    <div className={isMonthly ? styles.monthGrid : styles.weekRow}>
      {days.map((date) => (
        <div
          key={date}
          title={date}
          className={status[date] ? styles.dayDone : styles.dayMissed}
        >
          {date.slice(-2)}
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [habitStatus, setHabitStatus] = useState({});
  const [calendarMode, setCalendarMode] = useState("weekly");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:5000/api/habits", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHabits(res.data))
      .catch((err) => {
        alert("Token expired ya invalid. Login again.");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    if (habits.length === 0) return;
    habits.forEach((habit) => {
      axios
        .get(`http://localhost:5000/api/habits/${habit._id}/weekly-status`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setHabitStatus((prev) => ({
            ...prev,
            [habit._id]: {
              ...prev[habit._id],
              weeklyStatus: res.data,
            },
          }));
        });
      axios
        .get(`http://localhost:5000/api/habits/${habit._id}/monthly-status`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setHabitStatus((prev) => ({
            ...prev,
            [habit._id]: {
              ...prev[habit._id],
              monthlyStatus: res.data,
            },
          }));
        });
      axios
        .get(`http://localhost:5000/api/habits/${habit._id}/streak`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setHabitStatus((prev) => ({
            ...prev,
            [habit._id]: {
              ...prev[habit._id],
              streak: res.data.streak,
            },
          }));
        });
    });
  }, [habits]);

  const markDone = async (habitId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/habits/${habitId}/log`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Marked as done!");
      axios
        .get(`http://localhost:5000/api/habits/${habitId}/weekly-status`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setHabitStatus((prev) => ({
            ...prev,
            [habitId]: {
              ...prev[habitId],
              weeklyStatus: res.data,
            },
          }));
        });
      axios
        .get(`http://localhost:5000/api/habits/${habitId}/monthly-status`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setHabitStatus((prev) => ({
            ...prev,
            [habitId]: {
              ...prev[habitId],
              monthlyStatus: res.data,
            },
          }));
        });
      axios
        .get(`http://localhost:5000/api/habits/${habitId}/streak`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setHabitStatus((prev) => ({
            ...prev,
            [habitId]: {
              ...prev[habitId],
              streak: res.data.streak,
            },
          }));
        });
    } catch (err) {
      alert("Already marked today or error occurred");
    }
  };

  const deleteHabit = async (habitId) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/habits/${habitId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits((prev) => prev.filter((h) => h._id !== habitId));
      setHabitStatus((prev) => {
        const copy = { ...prev };
        delete copy[habitId];
        return copy;
      });
    } catch (err) {
      alert("Failed to delete habit.");
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>Your Habits</h2>
      <div className={styles.calendarToggle}>
        <button
          className={calendarMode === "weekly" ? styles.activeToggle : ""}
          onClick={() => setCalendarMode("weekly")}
        >
          Weekly
        </button>
        <button
          className={calendarMode === "monthly" ? styles.activeToggle : ""}
          onClick={() => setCalendarMode("monthly")}
        >
          Monthly
        </button>
      </div>
      {habits.length === 0 ? (
        <p>No habits yet</p>
      ) : (
        <div className={styles.habitGrid}>
          {habits.map((habit) => (
            <div key={habit._id} className={styles.squareCard}>
              <div className={styles.squareCardContent}>
                <div className={styles.cardHeader}>
                  <strong>{habit.name}</strong>
                  <div className={styles.cardMeta}>{habit.timeOfDay}</div>
                </div>
                <div className={styles.cardMetaRow}>
                  <span className={styles.streakText}>
                    Streak: <b>{habitStatus[habit._id]?.streak ?? "-"}</b>
                  </span>
                  {habit.reminderTime && (
                    <span className={styles.reminderText}>
                      Reminder: {habit.reminderTime}
                    </span>
                  )}
                </div>
                <div className={styles.calendarWrapper}>
                  {calendarMode === "weekly" ? (
                    habitStatus[habit._id]?.weeklyStatus ? (
                      <CalendarRow
                        status={habitStatus[habit._id].weeklyStatus}
                        isMonthly={false}
                      />
                    ) : (
                      <span className={styles.loadingText}>
                        Loading calendar...
                      </span>
                    )
                  ) : habitStatus[habit._id]?.monthlyStatus ? (
                    <CalendarRow
                      status={habitStatus[habit._id].monthlyStatus}
                      isMonthly={true}
                    />
                  ) : (
                    <span className={styles.loadingText}>
                      Loading calendar...
                    </span>
                  )}
                </div>
                <div className={styles.cardFooter}>
                  <button
                    onClick={() => markDone(habit._id)}
                    className={styles.markDoneBtn}
                  >
                    Mark Done
                  </button>
                  <button
                    onClick={() => deleteHabit(habit._id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <br />
      <button onClick={() => navigate("/add")} className={styles.addHabitBtn}>
        Add Habit
      </button>
    </div>
  );
}
