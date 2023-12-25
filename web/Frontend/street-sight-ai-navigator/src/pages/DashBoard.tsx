import React,{ useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  deleteUserApi,
  fetchUsersApi,
  updateStatusUserApi,
} from "../services/user.service";
import {
  IUser,
  UserStatus,
} from "../interfaces/user.interface";
import { ApiResponse } from "../interfaces/gobal.interface";

function DashBoard() {
  const { user } = useContext(AuthContext);
  const [listUsers, setListUsers] = useState<IUser[]>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response: ApiResponse<IUser> = await fetchUsersApi(user!.token);
      if (!response.status) {
        setError("เกิดข้อผิดพลาด");
      }
      return setListUsers(response.data);
    };
    fetchUsers();
  }, []);

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
    return window.location.reload();
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

  return (
    <div>
      <h1>DashBoard</h1>
      <h2>{error}</h2>
      {listUsers?.map((user: IUser) => (
        <div key={user._id}>
          <h3>{user.username}</h3>
          <h3>{user.government}</h3>
          <h3>{user.role}</h3>
          <button onClick={() => handleChangeStatus(user._id, user.status)}>
            {user.status}
          </button>
          <button onClick={() => handleDelete(user._id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default DashBoard;
