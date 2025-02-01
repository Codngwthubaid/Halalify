import Home from "./pages/home/Home"
import { Route, Routes } from "react-router-dom"
import AuthCallback from "./pages/auth-callback/AuthCallback"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import MainLayout from "./layout/MainLayout"
import Chat from "./pages/chat/Chat"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
