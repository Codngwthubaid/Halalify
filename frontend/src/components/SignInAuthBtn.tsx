import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button"

const SignInAuthBtn = () => {

    const { signIn, isLoaded } = useSignIn()
    if(!isLoaded) return null

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete : "/auth-callback"
        })
    }

    return <Button className="w-full bg-zinc-800 h-11 text-white" onClick={signInWithGoogle} variant={"secondary"}>
        Continue with google
    </Button>
}

export default SignInAuthBtn
