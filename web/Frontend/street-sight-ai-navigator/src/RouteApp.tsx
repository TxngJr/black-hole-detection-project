import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import { UserStatus, UserRole } from "./interfaces/user.interface";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DashBoard from "./pages/DashBoard";

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
            </>
          ) : (
            <>
              <Route path="/wait-active" element={<h2>wait active</h2>} />
            </>
          )
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        {/* <Route
          path="*"
          element={user ? user.status == UserStatus.ACTIVE ? <Navigate to="/home" /> :<Navigate to="/wait-active"/> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;
