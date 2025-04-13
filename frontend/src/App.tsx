import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <main>
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <div className="text-2xl text-orange-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi sit et facere deleniti sint, nam ab nemo rem voluptatibus necessitatibus est odio veritatis culpa dolorum delectus cumque vel libero! Illo.</div>
    </main>
  )
}