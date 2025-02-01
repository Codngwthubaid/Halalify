import cors from "cors"
import path from "path"
import express from "express";
import dotenv from "dotenv"
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload"

import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import nasheeedsRoutes from "./routes/nasheeds.route.js"
import albumsRoutes from "./routes/album.route.js"
import statsRoutes from "./routes/stats.route.js"

dotenv.config()
const app = express()
const __dirname = path.resolve()
const PORT = process.env.PORT

// cors
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

//to parse req.body
app.use(express.json())

// Pass no parameters
app.use(clerkMiddleware())

// fileUploading processing - create tmp file untill it upload on Cloudinary
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmpAssets"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file size
    }
}))


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/nasheeds", nasheeedsRoutes)
app.use("/api/albums", albumsRoutes)
app.use("/api/stats", statsRoutes)


// Error handling middleware
app.use((err, req, res, next) => { return res.status(500).json({ messagae: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.messag }) })

app.listen(PORT, () => {
    console.log(`Server is running at : http://localhost:${PORT}`);
    connectDB()
})