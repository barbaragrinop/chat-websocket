import express from "express";
import dbConfig from "./config/db-config";
// import usersRoute from "./routes/usersRoute";
import dotenv from "dotenv";

dotenv.config();

const app = express();
dbConfig;

const port = process.env.PORT || 5000;

app.use(express.json());
// app.use("/api/users", usersRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
