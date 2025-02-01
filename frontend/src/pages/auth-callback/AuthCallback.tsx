import { Card, CardContent } from "@/components/ui/card"
import { axiosInstance } from "@/lib/axios"
import { useUser } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"

const AuthCallback = () => {

  const navigate = useNavigate()
  const { isLoaded, user } = useUser()
  const ref = useRef(false)

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user || ref.current) return
        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        })
        ref.current = true;
      } catch (error) {
        console.log("Error in auth callback : ", error);
      } finally {
        navigate("/")
      }
    }

    syncUser()
  }, [isLoaded, navigate, user]
  )

  return (
    <div className="h-screen w-full bg-black flex justify-center items-center">
      <Card className="bg-zinc-900 border-x-zinc-800 w-[50%]">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <Loader className="size-6 animate-spin text-blue-700" />
          <h3 className="text-xl font-bold text-zinc-400">Logging in process</h3>
          <p className="text-base text-zinc-600">Redirecting ...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthCallback
