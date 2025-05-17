import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './lib/db.js'
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import cron from "node-cron"
import fs from 'fs'

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


app.use(cors({
  origin: "https://halalify-three.vercel.app",
  credentials: true
}))

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


const tempDirLoc = path.join(__dirname, 'temp')

// cron jobs for deleting temp files in very 1 hr
cron.schedule('0 * * * *', () => {
  if (fs.existsSync(tempDirLoc)) {
    fs.readdir(tempDirLoc, (err, files) => {
      if (err) {
        console.log("Error present in cron job", err)
        return
      }

      for (const file of files) {
        fs.unlink(path.join(tempDirLoc, file), (err) => {
          if (err) {
            console.log("Error present in cron job", err)
            return
          }
        })
      }
    })
  }
})



app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/songs", songsRoutes)
app.use("/api/albums", albumsRoutes)
app.use("/api/stats", statsRoutes)


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")))
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
//   })
// }


app.use((error, req, res, next) => {
  res.status(500).json({ success: false, message: process.env.NODE_ENV === "production" ? "Internal server error" : error.message })
})


app.listen(PORT, () => {
  console.log('Server is running on port - http://localhost:' + PORT)
  connectDB()
})
