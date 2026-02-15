# 🎮 Egg Dodge Game Analytics Project

A real-time event-driven browser game that captures gameplay scores, stores them through a backend API, and records results in Snowflake for leaderboard and analytics visualization.

---

## 🚀 Overview

This project combines a playable web-based game with a simple analytics pipeline. The system records gameplay outcomes such as player score and game over events, then sends them to a backend API. These events are stored in Snowflake and can be used to generate leaderboard dashboards and gameplay insights.

The goal of this project is to demonstrate how real-time gameplay tracking can integrate with a cloud data warehouse for analytics-driven applications.

---

## 🏗️ Architecture

```
Player
   ↓
Egg Dodge Game (Frontend)
   ↓
Backend API (Score Collector)
   ↓
Snowflake Data Warehouse
   ↓
Leaderboard / Analytics Dashboard
```

### 🔹 Frontend (Game)

* Tracks player score
* Generates gameplay events
* Sends score data via HTTP POST requests
* Displays leaderboard retrieved from backend

### 🔹 Backend API

* REST endpoint: `/save-score`
* Validates incoming score payload
* Stores score data into Snowflake
* Provides `/leaderboard` endpoint for ranking display

### 🔹 Snowflake

* Stores player scores
* Enables SQL-based leaderboard ranking
* Supports analytics and reporting

---

## 📊 Event Schema

Example score event payload:

```json
{
  "id": "uuid",
  "name": "Player1",
  "score": 25,
  "timestamp": "2026-02-15T12:00:00Z"
}
```

---

## 📈 Analytics Metrics

The following insights can be generated:

* Top players by score
* Average score per session
* Total games played
* Score distribution analysis
* Daily gameplay activity

---

## 🛠️ Tech Stack

**Frontend:** HTML / CSS / JavaScript
**Backend:** Node.js + Express
**Database/Warehouse:** Snowflake
**Visualization:** Snowflake Worksheets / Dashboard

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/egg-dodge-game.git
cd egg-dodge-game
```

### 2️⃣ Install Backend Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```
PORT=3000
SNOWFLAKE_ACCOUNT=your_account
SNOWFLAKE_USERNAME=your_username
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_DATABASE=your_database
SNOWFLAKE_SCHEMA=your_schema
```

⚠️ Do NOT commit your `.env` file.

### 4️⃣ Start the Backend Server

```bash
npm start
```

Server runs on:

```
http://localhost:3000
```

### 5️⃣ Run the Game

Open:

```
index.html
```

in your browser and start playing.

---

## 🔌 API Endpoints

### POST `/save-score`

Saves player score.

Example:

```bash
curl -X POST http://localhost:3000/save-score \
-H "Content-Type: application/json" \
-d '{"name":"Player1","score":20}'
```

### GET `/leaderboard`

Returns top player scores for leaderboard display.

---

## 🧠 Key Learnings

* Building browser-based games using JavaScript
* Designing event-driven score collection systems
* Integrating Node.js backend with Snowflake
* Creating leaderboard analytics pipelines
* Visualizing gameplay data using SQL dashboards

---

## 🌟 Future Improvements

* Real-time streaming analytics
* Difficulty levels and player progression
* Multiplayer leaderboard
* Cloud deployment (AWS / Vercel / Render)
* Advanced gameplay analytics dashboards

---

## 📜 License

This project was developed for educational and demonstration purposes.
