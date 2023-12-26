import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  deleteUserApi,
  fetchUsersApi,
  updateRoleUserApi,
  updateStatusUserApi,
} from "../services/user.service";
import { IUser, UserRole, UserStatus } from "../interfaces/user.interface";
import { ApiResponse } from "../interfaces/gobal.interface";
import { NavigateFunction, useNavigate } from "react-router-dom";

function DashBoard() {
  const { user } = useContext(AuthContext);
  const [listUsers, setListUsers] = useState<IUser[]>();
  const [error, setError] = useState<string>("");

  const navigate: NavigateFunction = useNavigate();

  const fetchUsers = async () => {
    const response: ApiResponse<IUser> = await fetchUsersApi(user!.token);
    if (!response.status) {
      setError("เกิดข้อผิดพลาด");
    }
    return setListUsers(response.data);
  };
  const handleChangeStatus = async (_id: string, status: UserStatus) => {
    const stautsChange =
      status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;
    const response: ApiResponse<IUser> = await updateStatusUserApi({
      _id,
      status: stautsChange,
      token: user!.token,
    });
    if (!response.status) {
      return setError("เกิดข้อผิดพลาด");
    }
    return fetchUsers();
  };
  const handleChangeRole = async (_id: string, role: UserRole) => {
    const roleChange = role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;
    const response: ApiResponse<IUser> = await updateRoleUserApi({
      _id,
      role: roleChange,
      token: user!.token,
    });
    if (!response.status) {
      return setError("เกิดข้อผิดพลาด");
    }
    return fetchUsers();
  };

  const handleDelete = async (_id: string) => {
    const response: ApiResponse<IUser> = await deleteUserApi({
      _id,
      token: user!.token,
    });
    if (!response.status) {
      return setError("เกิดข้อผิดพลาด");
    }
    return window.location.reload();
  };
  useEffect(() => {
    fetchUsers();
    const interval = setInterval(() => {
      fetchUsers();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          display: "flex",
          background: "#FFFFFF",
          borderRadius: "50px",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={() => window.history.back()}
          style={{
            position: "absolute",
            top: "1%",
            left: "1%",
            cursor: "pointer",
          }}
        >
          <h1>Go back</h1>
        </div>
        <div
          onClick={() => navigate("/home")}
          style={{
            position: "absolute",
            top: "1%",
            right: "1%",
            cursor: "pointer",
          }}
        >
          <h1>Go to map</h1>
        </div>
        <div
          style={{
            width: "90%",
            height: "80%",
            borderRadius: "20px",
            background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
            display: "block",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "48px",
            }}
          >
            Hello {user?.username} !
          </h1>
          <div
            style={{
              display: "block",
              justifyContent: "center",
              padding: "1%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                background: "#FFFFFF",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <h1>number</h1>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <h1>username</h1>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <h1>government</h1>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <h1>role</h1>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <h1>status</h1>
              </div>
            </div>
            <div
              style={{
                height: "calc(60vh - 40px)",
                overflowY: "scroll",
              }}
            >
              {listUsers?.map((user: IUser, index: any) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <h1>{index + 1}</h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <h1>{user.username}</h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <h1>{user.government}</h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                    onClick={() => handleChangeRole(user._id, user.role)}
                  >
                    <h1
                      style={{
                        color:
                          user.role === UserRole.ADMIN ? "#bfb23b" : "#000000",
                        cursor: "pointer",
                      }}
                    >
                      {user.role}
                    </h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                    onClick={() => handleChangeStatus(user._id, user.status)}
                  >
                    <h1
                      style={{
                        color:
                          user.status === UserStatus.ACTIVE
                            ? "#00B051"
                            : "#F00",
                        cursor: "pointer",
                      }}
                    >
                      {user.status}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
