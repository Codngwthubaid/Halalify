import { Router } from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stats.controller.js";

const router = Router();

router.get("/", protectedRoute, requireAdmin, getStats);

export default router;