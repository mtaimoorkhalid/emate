import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import AllRouters from "./router/index.js";
import { connectDb } from "./db/config.js";
import initDb from "./db/init.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(AllRouters);
connectDb();
initDb();

app.listen(3333, () => {
  console.log("Server Started");
});

const frontendBuildPath = resolve(__dirname, "../frontend/dist");
app.use(express.static(frontendBuildPath));

app.get("*", (req, res) => {
  res.sendFile(resolve(frontendBuildPath, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Internal Server Error" });
// });
