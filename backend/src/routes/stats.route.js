import { Router } from "express";
import { getStatsData } from "../controller/stats.controller.js"
import { protectRoute, adminChecker } from "../middleware/auth.middleware.js"

const router = Router()


router.get("/", protectRoute, adminChecker, getStatsData)

export default router