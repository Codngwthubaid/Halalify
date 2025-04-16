import { Router } from "express";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:id", getAlbumById);

export default router;