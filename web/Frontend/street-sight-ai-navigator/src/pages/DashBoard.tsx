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
    // <div>
    //   <h1>DashBoard</h1>
    //   <h2>{error}</h2>
    //   {listUsers?.map((user: IUser) => (
    //     <div key={user._id}>
    //       <h3>{user.username}</h3>
    //       <h3>{user.government}</h3>
    //       <h3>{user.role}</h3>
    //       <button onClick={() => handleChangeStatus(user._id, user.status)}>
    //         {user.status}
    //       </button>
    //       <button onClick={() => handleDelete(user._id)}>delete</button>
    //     </div>
    //   ))}
    // </div>

    <div
    style={{
      position: "absolute",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      overflowY: "scroll",
      height: "calc(100vh - 40px)",
    }}
  >
    <table
      style={{
        // width: '100%',
        borderCollapse: "collapse",
        display: "inline-table",
        border: "1px solid black",
        backgroundColor: "#FFFF",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#03adfc" }}>
          <th
            style={{
              fontSize: "24px",
              padding: "12px",
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            number
          </th>
          <th
            style={{
              fontSize: "24px",
              padding: "12px",
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            username
          </th>
          <th
            style={{
              fontSize: "24px",
              padding: "12px",
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            role
          </th>
          <th
            style={{
              fontSize: "24px",
              padding: "12px",
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            status
          </th>
        </tr>
      </thead>
      <tbody>
        {listUsers?.map((user: IUser, index: any) => (
          <tr
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? "#f2f2f2" : "transparent",
              color: "#000000",
            }}
          >
            <td
              style={{
                padding: "12px",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              {index + 1}
            </td>
            <td
              style={{
                padding: "12px",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              {user.username}
            </td>
            <td
              style={{
                padding: "12px",
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              {user.role}
            </td>
            <td
              style={{
                padding: "12px",
                border: "1px solid black",
                textAlign: "center",
              }}
              onClick={() => handleChangeStatus(user._id, user.status)}
            >
               {user.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default DashBoard;
