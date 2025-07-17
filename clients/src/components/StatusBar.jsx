import styles from "./StatusBar.module.css";

export default function StatusBar({ user }) {
  return (
    <div className={styles.statusBar}>
      <span className={styles.userInfo}>
        Logged in as: <b>{user?.name || user?.email || "User"}</b>
      </span>
    </div>
  );
}
