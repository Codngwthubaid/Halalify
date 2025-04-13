import { Router } from "express";
import { createSong } from "../controller/admin.controller.js";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/songs", protectedRoute, requireAdmin, createSong);

export default router;