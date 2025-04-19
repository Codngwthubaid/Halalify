import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { AuthCallBackPage } from "./pages/auth-callback/AuthCallBackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./Layout/MainLayout";
import ChatPage from "./pages/Chat/ChatPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signInFallbackRedirectUrl={"/auth-callback"} />} />
        <Route path="/auth-callback" element={<AuthCallBackPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}