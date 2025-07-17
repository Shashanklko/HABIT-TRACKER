import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Habit Tracker</div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          Dashboard
        </Link>
        <Link to="/add" className={styles.link}>
          Add Habit
        </Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}
