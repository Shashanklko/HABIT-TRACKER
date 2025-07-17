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
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token); // token store kar rahe hain
      alert("Login successful!");
      navigate("/"); // home page pe redirect
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
