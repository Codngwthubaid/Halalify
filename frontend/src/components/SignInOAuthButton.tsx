import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function SignInOAuthButton(props: any) {
    const { signIn, isLoaded } = useSignIn();
    if (!isLoaded) return null;

    const signInWithGoogle = async () => {
        await signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback",
        });
    };

    return (
        <Button
            onClick={signInWithGoogle}
            variant={"secondary"}
            className={cn(
                "w-full text-white border-zinc-200 p-4 cursor-pointer",
                props.className
            )}
        >
            {props.title}
        </Button>
    );
}