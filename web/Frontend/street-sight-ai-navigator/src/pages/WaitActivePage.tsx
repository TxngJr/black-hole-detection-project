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

function WaitActivePage() {
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
        <h1
          style={{
            fontSize: "64px",
          }}
        >
          Hello {user?.username} Sorry, You not have permission
        </h1>
      </div>
    </div>
  );
}

export default WaitActivePage;
