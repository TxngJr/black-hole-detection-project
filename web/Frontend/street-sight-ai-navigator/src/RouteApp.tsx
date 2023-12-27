import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import { UserStatus, UserRole } from "./interfaces/user.interface";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DashBoard from "./pages/DashBoard";
import WaitActivePage from "./pages/WaitActivePage";

function RouteApp() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          user.status === UserStatus.ACTIVE ? (
            <>
              <Route path="/home" element={<HomePage />} />
              {user.role == UserRole.ADMIN && (
                <Route path="/dashboard" element={<DashBoard />} />
              )}
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/wait-active" element={<WaitActivePage />} />
              <Route path="*" element={<Navigate to="/wait-active" />} />
            </>
          )
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;
