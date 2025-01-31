import { Router } from "express";
import { addNasheed, checkAdmin, createAlbum, deleteAlbum, deleteNasheed } from "../controller/admin.controller.js";
import { adminChecker, protectRoute } from "../middleware/auth.middleware.js";

const router = Router()

router.use(protectRoute, adminChecker)

router.get("/checkAdmin", checkAdmin)
router.post("/addNasheed", addNasheed)
router.delete("/deleteNasheed/:id", deleteNasheed)
router.post("/createAlbum", createAlbum)
router.delete("/deleteAlbum/:id", deleteAlbum)

export default router
