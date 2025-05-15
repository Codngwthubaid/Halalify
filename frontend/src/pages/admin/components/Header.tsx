import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Logo from "@/assets/Halalify.svg";


export default function Header() {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3 pb-8'>
                <Link to='/' className='rounded-lg'>
                    <img src={Logo} alt="Logo" className="size-10 rounded-xl px-1 cursor-pointer hover:bg-purple-600 bg-purple-500" />
                </Link>
                <div>
                    <h1 className='text-2xl sm:text-3xl font-bold'>Music Manager</h1>
                    <p className='text-zinc-400 mt-1'>Manage your music catalog</p>
                </div>
            </div>
            <UserButton />
        </div>
    );
};