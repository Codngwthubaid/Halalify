import { clerkClient } from "@clerk/express"


// Check user is authenticated or not
export const protectRoute = async (req, res, next) => {
    if (!req.auth.userId) return res.status(401).json({ message: "Unauthorized - Please logged in" })
    next();
}


// Check user is Admin or not
export const adminChecker = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.CLERK_EMAIL === currentUser.primaryEmailAddress.emailAddress
        if (!isAdmin) return res.status(403).json({ message: "Unauthorized - You are not an Admin" });
        next()

    } catch (error) {
        return res.status(500).json({ message: "Internal serevr error" })
    }
}