import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Loader } from 'lucide-react';
import { useAuthStore } from "@/stores/useAuthStore";

const updateApiToken = (token: string | null) => {
    if (token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common['Authorization'];
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const { getToken, userId } = useAuth();
    const { isAdminCheck } = useAuthStore()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initToken = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                if (token) await isAdminCheck()

            } catch (error: any) {
                updateApiToken(null);
                console.log("Error present in auth provider", error.message);
            } finally {
                setIsLoading(false);
            }
        };
        initToken();


    }, [getToken, userId, isAdminCheck]);

    if (isLoading) return (
        <div className="h-screen w-full flex justify-center items-center">
            <Loader className="size-10 animate-spin text-purple-600" />
        </div>
    );

    return (
        <div>{children}</div>
    );
}