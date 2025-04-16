import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './lib/db.js'
import fileUpload from 'express-fileupload'
import path from 'path'

import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import authRoutes from './routes/auth.route.js'
import songsRoutes from './routes/songs.route.js'
import albumsRoutes from './routes/albums.route.js'
import statsRoutes from './routes/stats.route.js'

dotenv.config()

const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(clerkMiddleware())
app.use(fileUpload(
  {
    useTempFiles: true,
    createParentPaths: true,
    tempFileDir: path.join(__dirname, 'temp'),
    limits: {
      fileSize: 1024 * 1024 * 10
    }
  }
))

app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/songs", songsRoutes)
app.use("/api/albums", albumsRoutes)
app.use("/api/stats", statsRoutes)


app.use((error, req, res, next) => {
  res.status(500).json({ success: false, message: process.env.NODE_ENV === "production" ? "Internal server error" : error.message })
})


app.listen(PORT, () => {
  console.log('Server is running on port - http://localhost:' + PORT)
  connectDB()
})

// todo: socket.io