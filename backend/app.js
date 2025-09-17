const express = require("express");
const socket = require("socket.io");
const path = require("path");

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log("Listening on port " + port);
});

const io = socket(server);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
    console.log("Made socket connection");

    socket.on("beginPath", (data) => {
        io.sockets.emit("beginPath", data);
    });

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    });

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    });
});
