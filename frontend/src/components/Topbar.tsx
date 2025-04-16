import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LucideLayoutDashboard } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";

export default function Topbar() {
    const [isAdmin, setIsAdmin] = useState(false);
    return (
        <div className="flex justify-between items-center p-4 sticky bg-zinc-900/75 z-10">
            <div className="flex items-center gap-2">Halalify</div>
            <div className="flex items-center gap-2">
                {isAdmin && (
                    <Link to="/admin"><LucideLayoutDashboard /> Admin Dashboard</Link>
                )}

                <SignedIn>
                    <SignOutButton>Sign Out</SignOutButton>
                </SignedIn>

                <SignedOut>
                    <SignInOAuthButton />
                </SignedOut>
            </div>
        </div>
    )
}