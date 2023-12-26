import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { loginApi } from "../services/user.service";
import {
  ILoginApiRequestAndForm,
  IUser,
  UserStatus,
} from "../interfaces/user.interface";
import { ApiResponse } from "../interfaces/gobal.interface";
import { NavigateFunction, useNavigate } from "react-router-dom";
import imgJivt from "../assets/images/jivt.png";
import imgUtc from "../assets/images/utc.png";
import imgCt from "../assets/images/ct.png";

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
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
        padding: "2%",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "block",
          background: "#FFFFFF",
          borderRadius: "50px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1%",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
            }}
          >
            StreetSight AI Navigator
          </h1>
        </div>

        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50%",
            height: "73%",
            display: "block",
            borderRadius: "20px",
            background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1%",
            }}
          >
            <h1
              style={{
                fontSize: "64px",
              }}
            >
              Login
            </h1>
          </div>
          <div
            style={{
              display: "block",
              margin: "0 auto",
              width: "60%",
              marginTop: "1%",
            }}
          >
            <p
              style={{
                fontSize: "32px",
              }}
            >
              Username
            </p>
            <input
              style={{
                width: "100%",
                borderRadius: "20px",
                background: "#FFFFFF",
                border: "0px solid #FFFFFF",
                boxSizing: "border-box",
                fontSize: "24px",
                padding: "2% 5%",
                marginBottom: "5%",
              }}
              type="text"
              value={userForm.username}
              onChange={(e) =>
                setUserForm({ ...userForm, username: e.target.value })
              }
            />
            <p
              style={{
                fontSize: "32px",
              }}
            >
            Password
            </p>
            <input
              style={{
                width: "100%",
                borderRadius: "20px",
                background: "#FFFFFF",
                border: "0px solid #FFFFFF",
                boxSizing: "border-box",
                fontSize: "24px",
                padding: "2% 5%",
                marginBottom: "25%",
              }}
              type="password"
              value={userForm.password}
              onChange={(e) =>
                setUserForm({ ...userForm, password: e.target.value })
              }
            />
            <button
              style={{
                display: "block",
                margin: "0 auto",
                borderRadius: "50px",
                background: "#86DCAD",
                width: "30%",
                padding: "2%",
                textAlign: "center",
                fontSize: "32px",
                marginBottom: "10%",
                cursor: "pointer",
              }}
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                marginRight: "1%",
              }}
            >
              You don’t have an account yet?
            </p>
            <button
              style={{
                color: "#59AFED",
                fontSize: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => navigate("/register")}
            >
              Register here
            </button>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
          }}
          >
          <div
            style={{
              position: "relative",
              display: "flex",
              padding: "1%",
              alignItems: "center",
            }}
          >
            <img
              style={{
                marginLeft: "1%",
              }}
              src={imgJivt}
              alt="jivt"
            />
            <img
              style={{
                marginLeft: "1%",
              }}
              src={imgUtc}
              alt="utc"
            />
            <img
              style={{
                marginLeft: "1%",
              }}
              src={imgCt}
              alt="ct"
            />
            <h1
              style={{
                marginLeft: "1%",
                fontSize: "24px",
                whiteSpace: "nowrap",
              }}
            >
              แผนกวิชาเทคโนโลยีคอมพิวเตอร์ วิทยาลัยเทคนิคอุบลราชธานี
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
