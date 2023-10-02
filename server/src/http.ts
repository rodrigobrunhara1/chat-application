import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

app.use("/", (req, res) => {
    res.send("Server running! =D");
})
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

export { serverHttp, io }