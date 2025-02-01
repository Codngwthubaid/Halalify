import { axiosInstance } from "@/lib/axios"
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import React, { useEffect, useState } from "react"

const updateToken = async (token: string | null) => {
    if (token) return axiosInstance.defaults.headers.common["Authorization"] = `Token: ${token}`
    else delete axiosInstance.defaults.headers.common["Authorization"]
}


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const { getToken } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateToken(token)
            } catch (error) {
                updateToken(null)
                console.log("Error in Auth Provider :", error)
            } finally {
                setIsLoading(false);
            }
        }
        initAuth()
    }, [getToken])



    if (isLoading) return (
        <div className="h-screen w-full flex justify-center items-center">
            <Loader className="size-8 animate-spin text-blue-700" />
        </div>
    )


    return <>{children}</>
}

export default AuthProvider
