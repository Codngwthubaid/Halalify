import { Router } from "express";
import User from "../models/user.model.js"

const router = Router()

router.get("/callback", async (req, res) => {
    try {
        const { Id, firstName, lastName, imageUrl } = req.body
        console.log(req.body);


        // Check the user existance 
        const user = await User.findOne({
            clerkId: Id
        })

        // Sign Up Process
        if (!user) {
            await User.create({
                clerkId: Id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
        }

    } catch (error) {
        console.log("Callback Error : ", error);

    }
})

export default router