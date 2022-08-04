const socketio = require("socket.io");
const express = require("express")
const http = require("http")
const app = express();

const PORT = process.env.PORT || 1996

const server = http.createServer(app)


const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET", "OPTION"]
    }
})

server.listen(PORT, () => {
    io.on("connection", (socket) => {

        socket.on("user", (data) => {
            console.log(data)
            io.emit("user", data)

        })
    })
})