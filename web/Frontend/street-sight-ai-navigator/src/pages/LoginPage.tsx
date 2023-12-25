import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { loginApi } from "../services/user.service";
import {
  ILoginApiRequestAndForm,
  IUser,
  UserStatus,
} from "../interfaces/user.interface";
import { ApiResponse } from "../interfaces/gobal.interface";
import { NavigateFunction, useNavigate } from "react-router-dom";

function LoginPage() {
  const { user, saveUser } = useContext(AuthContext);
  const [userForm, setUserForm] = useState<ILoginApiRequestAndForm>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async () => {
    const response: ApiResponse<IUser> = await loginApi(userForm);
    if (!response.status) {
      return setError("username or password is incorrect");
    }
    saveUser(response.data.token);
    if (user?.status === UserStatus.INACTIVE) {
      return navigate("/wait-active");
    }
    return navigate("/home");
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          borderRadius: "50px",
          background: "#FFF",
          width: "100%",
          height: "100%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          StreetSight AI Navigator
        </h1>
        <div
          style={{
            margin: "auto",
            width: "50%",
            height: "80vh",
            borderRadius: "20px",
            background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            Login
          </h1>
          <div
          style={{
            margin: "auto",
            width: "50%",

          }}
          >

            <input
              type="text"
              placeholder="Username"
              value={userForm.username}
              onChange={(e) =>
                setUserForm({ ...userForm, username: e.target.value })
            }
            />
            </div>

            <input
              type="password"
              placeholder="Password"
              value={userForm.password}
              onChange={(e) =>
                setUserForm({ ...userForm, password: e.target.value })
              }
            />

            <button type="submit" onClick={() => handleSubmit}>
              Login
            </button>
        </div>
        <p>You don’t have an account yet?</p>
        <button onClick={() => navigate("/register")}>Register here</button>
      </div>
    </div>
  );
}

export default LoginPage;
