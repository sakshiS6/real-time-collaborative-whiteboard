const express = require("express");
const socket = require("socket.io");
const path = require("path");

const app = express();

// Serve public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.io setup
const io = socket(server);

io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("beginPath", (data) => io.sockets.emit("beginPath", data));
  socket.on("drawStroke", (data) => io.sockets.emit("drawStroke", data));
  socket.on("redoUndo", (data) => io.sockets.emit("redoUndo", data));
});
