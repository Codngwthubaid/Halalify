import Home from "./pages/home/Home"
import { Route, Routes } from "react-router-dom"
import AuthCallback from "./pages/auth-callback/AuthCallback"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
      </Routes>
    </div>
  )
}

export default App
