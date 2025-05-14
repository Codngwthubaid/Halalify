import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { AuthCallBackPage } from "./pages/auth-callback/AuthCallBackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./Layout/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signInFallbackRedirectUrl={"/auth-callback"} />} />
        <Route path="/auth-callback" element={<AuthCallBackPage />} />
        <Route path="/admin" element={<AdminPage />} />
     
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}