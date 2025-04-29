import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/clerk-react";
import { LucideLayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import Logo from "@/assets/Halalify.svg";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export default function Topbar() {
    const { isAdmin } = useAuthStore()
    return (
        <div className="flex justify-between items-center p-4 sticky bg-zinc-900/75 z-10 rounded-md">
            <div className="flex items-center gap-2">
                <img src={Logo} alt="Logo" className="size-10 rounded-xl px-1 cursor-pointer hover:bg-purple-600 bg-purple-500" />
            </div>
            <div className="flex items-center gap-2">
                {isAdmin && (
                    <Link to="/admin" className={cn(buttonVariants({ variant: "ghost" }))}><LucideLayoutDashboard /> Admin Dashboard</Link>
                )}

                <SignedOut>
                    <SignInOAuthButton />
                </SignedOut>

                <UserButton />
            </div>
        </div>
    )
}