import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Registration successful! You can now login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed. Try another email.");
    }
  };

  return (
    <div className={styles.registerBg}>
      <form className={styles.registerCard} onSubmit={handleRegister}>
        <h2 className={styles.title}>Register</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
          className={styles.input}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className={styles.input}
        />
        <button type="submit" className={styles.registerBtn}>
          Register
        </button>
        <div className={styles.loginLink}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </form>
    </div>
  );
};

export default Register;
