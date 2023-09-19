import express from "express";
import { dbConfig } from "./config/db-config";
import { getUserRoutes } from "./routes/users-route";
import dotenv from "dotenv";
import cors from "cors";
import { getChats } from "./routes/chats-route";
import { getMessages } from "./routes/messages-route";
import { Server } from "socket.io";
import http from "http";
const port = process.env.PORT || 5000;
console.log("port", port);

dotenv.config();

const app = express();

const server = http.createServer(app); //http server

const socket = new Server(server, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ["GET", "POST"],
  },
});

// check the conncetion on the client
socket.on("connection", (socketparam) => {
  console.log("connected with the socket id: ", socketparam.id);
});

app.use(cors());
dbConfig();

app.use(express.json());

app.use("/api/users", getUserRoutes());
app.use("/api/chats", getChats());
app.use("/api/messages", getMessages());

server.listen(port, () => console.log(`Server running on port ${port}`));
