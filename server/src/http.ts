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
app.use("/", (req, res, next) => {
    // res.send("Server running! =D");
    res.header("Access-Control-Allow-Origin", req.header('Origin'));
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})


const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "https://chat-application-frontend-five.vercel.app",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
    transports: ['websocket']
});

export { serverHttp, io }