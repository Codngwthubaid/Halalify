import { Router } from "express";
import { getAllNasheeds, getFeatureNasheeds, getMadeForYouNasheeds, getTrendingNasheeds } from "../controller/nasheeds.controller.js";
import { protectRoute, adminChecker } from "../middleware/auth.middleware.js"


const router = Router()

router.get("/", protectRoute, adminChecker, getAllNasheeds)
router.get("/featureNasheeds", getFeatureNasheeds)
router.get("/madeForYouNasheeds", getMadeForYouNasheeds)
router.get("/trendingNasheeds", getTrendingNasheeds)

export default router