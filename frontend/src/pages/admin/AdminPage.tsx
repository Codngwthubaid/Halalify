import { useAuthStore } from "@/stores/useAuthStore"
import Header from "./components/Header"
import DashboardStats from "./components/DashboardStats"
import DataDetails from "./components/DataDetails"

export default function AdminPage() {

    const { isAdmin, isLoading } = useAuthStore()

    if (!isAdmin && !isLoading) return <div>Unauthorized, You are not an admin</div>

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-black text-zinc-100 p-4">

        <Header />
        <DashboardStats />
        <DataDetails />

        </div>
    )
}