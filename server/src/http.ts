import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from 'cors';
const app = express();

app.use(cors({
    origin: ["https://chat-application-frontend-five.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}
));
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