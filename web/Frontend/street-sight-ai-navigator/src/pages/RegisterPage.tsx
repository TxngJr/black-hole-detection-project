import { registerApi } from "../services/user.service";
import { IRegisterForm, IUser } from "../interfaces/user.interface";
import { ApiResponse } from "../interfaces/gobal.interface";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
  const [userForm, setUserForm] = useState<IRegisterForm>({
    username: "",
    password: "",
    confirmPassword: "",
    government: "",
  });
  const [error, setError] = useState<string>("");

  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: ApiResponse<IUser> = await registerApi(userForm);
    if (!response.status) {
      return setError("cannot register");
    }
    return navigate("/login");
  };

  return (
    <div>
      <h1>Register</h1>
      <h2>{error}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userForm.username}
          onChange={(e) =>
            setUserForm({ ...userForm, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={userForm.password}
          onChange={(e) =>
            setUserForm({ ...userForm, password: e.target.value })
          }
        />
        <input
          type="confirmPassword"
          placeholder="confirmPassword"
          value={userForm.confirmPassword}
          onChange={(e) =>
            setUserForm({ ...userForm, confirmPassword: e.target.value })
          }
        />
        <input
          type="government"
          placeholder="government"
          value={userForm.government}
          onChange={(e) =>
            setUserForm({ ...userForm, government: e.target.value })
          }
        />

        <button type="submit">Register</button>
      </form>
      <p>Already have an account?</p>
      <button onClick={() => navigate("/login")}>Login here</button>
    </div>
  );
}

export default RegisterPage;
