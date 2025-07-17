import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://habit-tracker-pvtq.onrender.com/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      localStorage.setItem("token", response.data.token); 
      alert("Login successful!");
      navigate("/"); 
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className={styles.loginBg}>
      <form className={styles.loginCard} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className={styles.input}
        />
        <button type="submit" className={styles.loginBtn}>
          Login
        </button>
        <div className={styles.registerLink}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </div>
      </form>
    </div>
  );
}
