import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { AuthCallBackPage } from "./pages/auth-callback/AuthCallBackPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-callback" element={<AuthCallBackPage />} />
      </Routes>
    </BrowserRouter>
  )
}