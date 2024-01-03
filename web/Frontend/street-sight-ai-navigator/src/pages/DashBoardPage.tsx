import { useContext, useEffect, useState } from "react";
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
import { addMacAddressApi, dropMacAddressApi } from "../services/government.service";
import { fetchOwnerCanUseApi } from "../services/machine.service";

function DashBoardPage() {
  const { user } = useContext(AuthContext);
  const [listUsers, setListUsers] = useState<IUser[]>();
  const [listOwner, setListOwner] = useState<Array<string>>();

  const navigate: NavigateFunction = useNavigate();

  const fetchUsers = async () => {
    const response: ApiResponse<IUser> = await fetchUsersApi(user!.token);
    if (!response.status) {
      return;
    }
    fetchOwners();
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
      return;
    }
    fetchOwners();
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
      return;
    }
    fetchOwners();
    return fetchUsers();
  };

  const handleDelete = async (_id: string) => {
    const response: ApiResponse<IUser> = await deleteUserApi({
      _id,
      token: user!.token,
    });
    if (!response.status) {
      return;
    }
    fetchOwners();
    return fetchUsers();
  };

  const handleAddMacAddress = async (_id: string, macAddress: string) => {
    const response: ApiResponse<any> = await addMacAddressApi({
      _id,
      macAddress,
      token: user!.token,
    });
    if (!response.status) {
      return;
    }
    fetchOwners();
    return fetchUsers();
  };

  const handleDropMacAddress = async (_id: string, macAddress: string) => {
    const response: ApiResponse<any> = await dropMacAddressApi({
      _id,
      macAddress,
      token: user!.token,
    });
    if (!response.status) {
      return;
    }
    fetchOwners();
    return fetchUsers();
  };

  const fetchOwners = async () => {
    const response: ApiResponse<{ _id: string; government: string }> =
      await fetchOwnerCanUseApi(user!.token);
    if (!response.status) {
      return;
    }
    fetchUsers();
    return setListOwner(response.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchOwners();
    const interval = setInterval(() => {
      fetchUsers();
      fetchOwners();
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
                <h1>pi machine</h1>
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
              {listUsers?.map((listUser: IUser, index: any) => (
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
                    onClick={() => handleDelete(listUser._id)}
                  >
                    <h1>{index + 1}</h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <h1>{listUser.username}</h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <h1>{user?.role === UserRole.SUPERADMIN ? listUser._governmentId.name: user?._governmentId.name}</h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                    onClick={() => handleChangeRole(listUser._id, listUser.role)}
                  >
                    <h1
                      style={{
                        color:
                        listUser.role === UserRole.ADMIN ? "#bfb23b" : "#000000",
                        cursor: "pointer",
                      }}
                    >
                      {listUser.role}
                    </h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                    // onClick={() => handleChangeRole(user._id, user.role)}
                  >
                    {/* {user.role === UserRole.ADMIN && (
                      <select
                        style={{
                          width: "100%",
                          borderRadius: "20px",
                          background: "#FFFFFF",
                          border: "0px solid #FFFFFF",
                          boxSizing: "border-box",
                          fontSize: "24px",
                          padding: "2% 5%",
                          marginBottom: "2%",
                        }}
                        value={"List pi machine"}
                        onChange={(e) => {
                          if (user.owner?.includes(e.target.value)) {
                            handleDropMacAddress(user._id, e.target.value);
                          } else if (listOwner?.includes(e.target.value)) {
                            handleAddMacAddress(user._id, e.target.value);
                          } else {
                            user.owner = [];
                          }
                        }}
                      >
                        <option value="" selected={true}>
                          Add pi machine
                        </option>
                        {user.owner?.map((owner) => (
                          <option
                            style={{
                              color: "red",
                            }}
                            key={owner}
                            value={owner}
                          >
                            {owner}
                          </option>
                        ))}
                        {listOwner?.map((owner) => (
                          <option key={owner} value={owner}>
                            {owner}
                          </option>
                        ))}
                      </select>
                    )} */}
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                    onClick={() => handleChangeStatus(listUser._id, listUser.status)}
                  >
                    <h1
                      style={{
                        color:
                        listUser.status === UserStatus.ACTIVE
                            ? "#00B051"
                            : "#F00",
                        cursor: "pointer",
                      }}
                    >
                      {listUser.status}
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

export default DashBoardPage;
