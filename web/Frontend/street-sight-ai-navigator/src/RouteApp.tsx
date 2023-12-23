import {
  BrowserRouter,
  Navigate,
  NavigateFunction,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import { UserStatus, UserRole } from "./interfaces/user.interface";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function RouteApp() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          user.status === UserStatus.ACTIVE ? (
            <>
              <Route path="/home" element={<HomePage />} />
              {user.role === UserRole.ADMIN && (
                <Route path="/dashboard" element={<h2>dashboard</h2>} />
              )}
            </>
          ) : (
            <Route path="/wait-active" element={<h2>wait active</h2>} />
          )
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<h2>Register</h2>} />
          </>
        )}
        <Route
          path="*"
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteApp;
