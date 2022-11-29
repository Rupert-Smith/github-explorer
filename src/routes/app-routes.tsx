import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "pages/home";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
