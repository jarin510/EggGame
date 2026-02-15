const express = require("express");
const cors = require("cors");
const snowflake = require("snowflake-sdk");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const connection = snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USERNAME,
  password: process.env.SNOWFLAKE_PASSWORD,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
  role: process.env.SNOWFLAKE_ROLE,
});

connection.connect((err) => {
  if (err) {
    console.error("Snowflake connection error:", err);
  } else {
    console.log("Connected to Snowflake");
  }
});

app.post("/save-score", (req, res) => {
  const { id, name, score } = req.body;

  connection.execute({
    sqlText: `INSERT INTO SCORES (ID, PLAYER_NAME, SCORE) VALUES (?, ?, ?)`,
    binds: [id, name, score],
    complete: (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ success: true });
      }
    },
  });
});

app.get("/leaderboard", (req, res) => {
  connection.execute({
    sqlText: `SELECT PLAYER_NAME, SCORE 
              FROM SCORES 
              ORDER BY SCORE DESC 
              LIMIT 10`,
    complete: (err, stmt, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});
