import { Card, CardContent } from "@/components/ui/card"
import { axiosInstance } from "@/lib/axios"
import { useUser } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

export const AuthCallBackPage = () => {

  const { isLoaded, user } = useUser()
  console.log(user)
  const syncAttempt = useRef(false)
  const navigate = useNavigate()

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempt.current) return
      try {
        syncAttempt.current = true
        await axiosInstance.post("/auth/callback", { id: user.id, firstName: user.firstName, lastName: user.lastName, imageUrl: user.imageUrl })
      } catch (error) {
        console.log("Error present in auth callback page", error)
      }
      finally {
        navigate("/")
      }
    }
    syncUser()
  }, [isLoaded, user, navigate]
  )


  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="max-w-md w-[90%] bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col gap-4 items-center pt-6">
          <Loader className="size-10 animate-spin text-purple-600" />
          <h3 className="text-2xl font-semibold">Authenticating...</h3>
          <p className="text-muted-foreground">Please wait while we authenticate you.</p>
        </CardContent>
      </Card>
    </div>
  )
}
