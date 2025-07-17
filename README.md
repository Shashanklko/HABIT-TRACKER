# Habit Tracker

A modern, full-stack habit tracker app to help you build and maintain good habits. Track your daily progress, visualize streaks, set reminders, and stay motivated!

---

## Features

- User registration & login (JWT authentication)
- Add, edit, and delete habits
- Mark habits as done each day
- Weekly and monthly calendar views (with color-coded completion)
- Streak tracker for each habit
- Set daily reminder times for habits
- Responsive, modern UI (custom CSS modules)
- Status bar with user info

---

## Tech Stack

- **Frontend:** React, React Router, Axios, CSS Modules
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT

---

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or cloud)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd HABIT TRACKER
```

### 2. Setup the backend

```bash
cd backend
npm install
# Create a .env file with your MongoDB URI and JWT_SECRET if needed
npm start
```

### 3. Setup the frontend

```bash
cd ../clients
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## Usage

- Register a new account or log in.
- Add habits with a name, time of day, and optional reminder time.
- Mark habits as done each day.
- View your progress in weekly/monthly calendar views.
- Delete habits you no longer want to track.

---

## Folder Structure

```
HABIT TRACKER/
  backend/      # Node.js/Express/MongoDB API
  clients/      # React frontend (Vite)
```

---

## License

MIT
