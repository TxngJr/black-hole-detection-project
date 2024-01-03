import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { UserStatus, UserRole } from "./interfaces/user.interface";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DashBoard from "./pages/DashBoardPage";
import WaitActivePage from "./pages/WaitActivePage";
import PdfHoldPage from "./pages/PdfHoldPage";

function RouteApp() {
  const { user } = useContext(AuthContext);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 50);
  }, []);

  if (!authLoaded) {
    return (
      <div
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          padding: "0 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          user.status === UserStatus.ACTIVE ? (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/pdf" element={<PdfHoldPage />} />
              <Route path="/dashboard" element={<DashBoard />} />
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
