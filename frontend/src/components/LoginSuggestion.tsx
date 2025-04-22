import { HeadphonesIcon } from "lucide-react";

export default function LoginSuggestion() {
    return (
        <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
            <div className='relative'>
                <div
                    className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full blur-lg
       opacity-75 animate-pulse'
                    aria-hidden='true'
                />
                <div className='relative bg-zinc-900 rounded-full p-4'>
                    <HeadphonesIcon className='size-8 text-purple-500' />
                </div>
            </div>

            <div className='space-y-2 max-w-[250px]'>
                <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
                <p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
            </div>
        </div>
    )
}