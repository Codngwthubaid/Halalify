import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
    try {
        const { Id, firstName, lastName, imageUrl } = req.body
        console.log(req.body);


        // Check the user existance 
        const user = await User.findOne({
            clerkId: Id
        })

        // Sign In Process
        if (!user) {
            await User.create({
                fullName: `${firstName} ${lastName}`,
                imageUrl,
                clerkId: Id
            })
        }

        res.status(200).json({ success: true })

    } catch (error) {
        console.log("Auth callback Error : ", error);
        res.status(500).json({ success: false, message: "Internal server error", error })
    }
}