import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddHabit from "./pages/AddHabit";
import Navbar from "./components/Navbar";
import StatusBar from "./components/StatusBar";

function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    // JWT: header.payload.signature
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

export default function App() {
  const location = useLocation();
  const user = getUserFromToken();
  // Hide Navbar/StatusBar on login/register
  const hideNav =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {!hideNav && <Navbar />}
      {!hideNav && <StatusBar user={user} />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddHabit />} />
      </Routes>
    </div>
  );
}
