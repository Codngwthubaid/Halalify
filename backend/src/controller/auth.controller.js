import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;
        console.log("Received request body:", req.body);

        // Check the user existence 
        const user = await User.findOne({ clerkId: id });
        console.log("User found:", user);

        // Sign In Process
        if (!user) {
            console.log("Creating new user...");
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            });
            console.log("New user created.");
        }

        res.status(200).json({ success: true });

    } catch (error) {
        console.log("Auth callback Error : ", error);
        next(error);
    }
};