import { Router } from "express";

const router = Router()


router.get("/",(req,res)=>{
    res.send("Stats is here with GET method")
})

export default router