import express from "express";
import dotenv from "dotenv"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from  "./routes/admin.route.js"
import nasheeedsRoutes  from "./routes/nasheeds.route.js"
import albumsRoutes from "./routes/album.route.js"
import statsRoutes from "./routes/stats.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/nasheeds", nasheeedsRoutes)
app.use("/api/albums", albumsRoutes)
app.use("/api/stats", statsRoutes)

app.listen(PORT, () => {
    console.log(`Server is running at : http://localhost:${PORT}/`);
    connectDB()
})