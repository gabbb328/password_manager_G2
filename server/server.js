import express from "express";
import cors from "cors";
import http from "http";
import { WebSocketServer } from "ws";

import { database } from "./database.js";
import { encrypt, decrypt } from "./crypto.js";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);
  ws.on("close", () => {
    clients = clients.filter((c) => c !== ws);
  });
});

function broadcast(msg) {
  clients.forEach((c) => {
    if (c.readyState === 1) {
      // Controllo se il WS è aperto
      c.send(JSON.stringify(msg));
    }
  });
}

const PIN = "1234";

/* ---------------- API PASSWORDS ---------------- */

app.get("/api/passwords", (req, res) => {
  const rows = database.getAll();
  res.json(rows);
});

app.get("/api/password/:id", (req, res) => {
  const row = database.getById(req.params.id);
  if (row) {
    row.password = decrypt(row.password);
    res.json(row);
  } else {
    res.status(404).json({ error: "Non trovato" });
  }
});

app.post("/api/password", (req, res) => {
  const { title, username, password } = req.body;
  const enc = encrypt(password);
  const id = database.insert(title, username, enc);

  broadcast({ type: "update" });
  res.json({ ok: true, id });
});

app.put("/api/password/:id", (req, res) => {
  const { title, username, password } = req.body;
  const enc = encrypt(password);
  database.update(req.params.id, title, username, enc);

  broadcast({ type: "update" });
  res.json({ ok: true });
});

app.delete("/api/password/:id", (req, res) => {
  database.remove(req.params.id);
  broadcast({ type: "update" });
  res.json({ ok: true });
});

/* ---------------- SEARCH & UNLOCK ---------------- */

app.post("/api/search", (req, res) => {
  const q = req.body.query;
  res.json(database.search(q));
});

app.post("/api/unlock", (req, res) => {
  const { pin } = req.body;
  res.json({ ok: pin === PIN });
});

server.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000"),
);
