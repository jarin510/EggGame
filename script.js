// =======================
// Egg Game (Updated)
// Connected to Snowflake via Backend API
// =======================

let player = document.getElementById("player");
let gameArea = document.getElementById("gameArea");
let scoreEl = document.getElementById("score");
let gameOverEl = document.getElementById("gameOver");
let restartBtn = document.getElementById("restartBtn");

// ✅ Use vote consistently
let vote = 0;

let gameInterval;
let eggInterval;
let playerPos = 210; // initial left
let gameWidth = 1000;
let gameHeight = 500;
let eggSpeed = 2;
let eggs = [];
let isGameOver = false;

// =======================
// Backend API (Snowflake)
// =======================
const API_BASE = "http://localhost:3000"; // change if deployed

function getPlayerId() {
  let id = localStorage.getItem("playerId");
  if (!id) {
    id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
    localStorage.setItem("playerId", id);
  }
  return id;
}

function getPlayerName() {
  let name = localStorage.getItem("playerName");
  if (!name) {
    name = prompt("Enter your name for leaderboard:") || "Player";
    localStorage.setItem("playerName", name);
  }
  return name;
}

async function saveScoreToSnowflake(finalVote) {
  try {
    const res = await fetch(`${API_BASE}/save-score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: getPlayerId(),
        name: getPlayerName(),
        score: finalVote
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Save score failed:", err);
    }
  } catch (e) {
    console.error("API not reachable (start backend first):", e);
  }
}

async function loadLeaderboard() {
  try {
    const res = await fetch(`${API_BASE}/leaderboard`);
    const data = await res.json();

    // If you have <div id="leaderboard"></div> in HTML, it will show there.
    const lb = document.getElementById("leaderboard");
    if (lb) {
      lb.innerHTML = `<h3>🏆 Leaderboard</h3>` + data
        .map((row, i) => `<div>${i + 1}. ${row.PLAYER_NAME || "Player"} - ${row.SCORE}</div>`)
        .join("");
    } else {
      console.log("Leaderboard:", data);
    }
  } catch (e) {
    console.error("Load leaderboard failed:", e);
  }
}

// =======================
// Start game function
// =======================
function startGame() {
  isGameOver = false;
  vote = 0;
  scoreEl.innerText = vote;
  gameOverEl.innerText = "";
  playerPos = 210;
  player.style.left = playerPos + "px";

  // ✅ Load leaderboard when game starts
  loadLeaderboard();

  // Remove existing eggs
  eggs.forEach(e => e.remove());
  eggs = [];

  // Egg dropping interval
  eggInterval = setInterval(dropEgg, 1000);

  // Game loop
  gameInterval = setInterval(updateGame, 20);

  // Avoid multiple event listeners if restart is clicked many times
  document.removeEventListener("keydown", movePlayer);
  document.addEventListener("keydown", movePlayer);
}

// =======================
// Player movement
// =======================
function movePlayer(e) {
  if (isGameOver) return;

  if (e.key === "ArrowLeft") {
    playerPos -= 20;
    if (playerPos < 0) playerPos = 0;
  }

  if (e.key === "ArrowRight") {
    playerPos += 20;
    if (playerPos > gameWidth - 80) playerPos = gameWidth - 80;
  }

  player.style.left = playerPos + "px";
}

// =======================
// Drop egg
// =======================
function dropEgg() {
  if (isGameOver) return;

  let egg = document.createElement("img");
  egg.src = "egg 2.png";
  egg.classList.add("egg");

  let eggX = Math.floor(Math.random() * (gameWidth - 40));
  egg.style.left = eggX + "px";
  egg.style.top = "0px";

  gameArea.appendChild(egg);
  eggs.push(egg);
}

// =======================
// Update game loop
// =======================
function updateGame() {
  if (isGameOver) return;

  for (let i = eggs.length - 1; i >= 0; i--) {
    let egg = eggs[i];
    let eggTop = parseInt(egg.style.top);
    eggTop += eggSpeed;
    egg.style.top = eggTop + "px";

    // Collision detection
    let eggLeft = parseInt(egg.style.left);
    if (
      eggTop + 40 >= gameHeight - 90 &&
      eggLeft + 40 >= playerPos &&
      eggLeft <= playerPos + 80
    ) {
      endGame();
      return;
    }

    // Egg out of game area
    if (eggTop > gameHeight) {
      egg.remove();
      eggs.splice(i, 1);
      vote += 1;
      scoreEl.innerText = vote;
    }
  }
}

// =======================
// End game
// =======================
function endGame() {
  isGameOver = true;
  clearInterval(gameInterval);
  clearInterval(eggInterval);

  eggs.forEach(e => e.remove());
  eggs = [];

  gameOverEl.innerText = "💥 Game Over! Total Vote: " + vote;

  // ✅ Save final score to Snowflake
  saveScoreToSnowflake(vote);

  document.removeEventListener("keydown", movePlayer);
}

// =======================
// Restart button
// =======================
restartBtn.addEventListener("click", startGame);

// Start game automatically on page load
startGame();