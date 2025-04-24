import { User } from "../models/user.model.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId
        const users = await User.find({clerkId : {$ne: currentUserId}})
        res.status(200).json({ success: true, message: "Users fetched successfully except current user", users })
    } catch (error) {
        console.log("Error present in get all users route", error.message)
        next(error)
    }
}