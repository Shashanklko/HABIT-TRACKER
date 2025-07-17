import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AddHabit.module.css";

export default function AddHabit() {
  const [habit, setHabit] = useState({
    name: "",
    timeOfDay: "",
    reminderTime: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setHabit({ ...habit, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/habits", habit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Habit added successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to add habit.");
    }
  };

  return (
    <div className={styles.addBg}>
      <form className={styles.addCard} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Add New Habit</h2>
        <input
          name="name"
          placeholder="Habit name"
          onChange={handleChange}
          value={habit.name}
          className={styles.input}
        />
        <input
          name="timeOfDay"
          placeholder="Time (morning, night...)"
          onChange={handleChange}
          value={habit.timeOfDay}
          className={styles.input}
        />
        <label
          className={styles.label}
          style={{ marginTop: 8, marginBottom: 2 }}
        >
          Reminder Time
        </label>
        <input
          type="time"
          name="reminderTime"
          onChange={handleChange}
          value={habit.reminderTime}
          className={styles.input}
        />
        <button type="submit" className={styles.addBtn}>
          Add Habit
        </button>
      </form>
    </div>
  );
}
