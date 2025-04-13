import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("albums");
});

export default router;