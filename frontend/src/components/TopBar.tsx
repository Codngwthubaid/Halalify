import { SignedIn, SignedOut, SignIn, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInAuthBtn from "./SignInAuthBtn";

const TopBar = () => {

    const isAdmin = false;

    return (
        <div className="flex justify-between items-center p-4 sticky top-0 bg-zinc-900/75 z-10 backdrop-blur-md">
            <div>Halalify</div>
            <div className="flex items-center gap-4">
                {isAdmin && (
                    <Link to={"/admin"}>
                        <LayoutDashboardIcon />
                        Admin Dashboard
                    </Link>
                )}

                <SignedIn>
                    <SignOutButton />
                </SignedIn>

                <SignedOut>
                    <SignInAuthBtn />
                </SignedOut>

            </div>
        </div>
    )
}

export default TopBar
