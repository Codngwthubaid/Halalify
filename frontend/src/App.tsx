import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { AuthCallBackPage } from "./pages/auth-callback/AuthCallBackPage";


// Lazy-loaded components
const HomePage = lazy(() => import("./pages/home/HomePage"));
const MainLayout = lazy(() => import("./Layout/MainLayout"));
const AlbumPage = lazy(() => import("./pages/album/AlbumPage"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/sso-callback"
            element={
              <AuthenticateWithRedirectCallback
                signInFallbackRedirectUrl={"/auth-callback"}
              />
            }
          />
          <Route path="/auth-callback" element={<AuthCallBackPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/albums/:albumId" element={<AlbumPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
