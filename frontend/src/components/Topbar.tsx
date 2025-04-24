import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/clerk-react";
import { LucideLayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Topbar() {
    const { isAdmin } = useAuthStore()
    console.log("isAdmin", isAdmin)
    return (
        <div className="flex justify-between items-center p-4 sticky bg-zinc-900/75 z-10">
            <div className="flex items-center gap-2">Halalify</div>
            <div className="flex items-center gap-2">
                {isAdmin && (
                    <Link to="/admin" className="flex items-center gap-2"><LucideLayoutDashboard /> Admin Dashboard</Link>
                )}

                <SignedOut>
                    <SignInOAuthButton />
                </SignedOut>

                <UserButton />
            </div>
        </div>
    )
}