import express from "express";
import { dbConfig } from "./config/db-config";
import { getUserRoutes } from "./routes/users-route";
import dotenv from "dotenv";
import cors from "cors";
import { getChats } from "./routes/chats-route";
import { getMessages } from "./routes/messages-route";

dotenv.config();

const app = express();
app.use(cors());
dbConfig();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users", getUserRoutes());
app.use("/api/chats", getChats());
app.use("/api/messages", getMessages());

app.listen(port, () => console.log(`Server running on port ${port}`));
