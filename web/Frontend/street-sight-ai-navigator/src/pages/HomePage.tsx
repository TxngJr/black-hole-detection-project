import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ApiResponse } from "../interfaces/gobal.interface";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import TableHoldsComponent from "../components/TableHoldsComponent";
import { deleteHoldApi, getHoldsApi } from "../services/hold.service";
import { IHold } from "../interfaces/hold.interface";
import { GOOGLE_MAP_API_KEY } from "../constants";
import { IUser, UserRole, UserStatus } from "../interfaces/user.interface";
import { NavigateFunction, useNavigate } from "react-router-dom";
import NotActiveComponent from "../components/NotActiveComponent";
import HoldDetailComponent from "../components/HoldDetailComponent";
import {
  deleteUserApi,
  fetchUsersApi,
  updateRoleUserApi,
  updateStatusUserApi,
} from "../services/user.service";
import TableUsersComponent from "../components/TableUsersComponent";
import TableGovernmentComponent from "../components/TableGovernmentComponent";
import {
  addMachineInGovernmentApi,
  dropMachineInGovernmentApi,
  getGovernmentApi,
} from "../services/government.service";
import { IMachine } from "../interfaces/mahine.interface";
import { fetchMachineCanUseApi } from "../services/machine.service";
import { IGovernment } from "../interfaces/government.interface";

function HomePage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  const onLoad = useCallback(function callback(map: object | any) {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: 15.2448, lng: 104.8473 });
    map.fitBounds(bounds);
  }, []);

  const { user, removeUser } = useContext(AuthContext);
  const [holds, setHolds] = useState<IHold[]>();
  const [hold, setHold] = useState<IHold | null>();
  const [tableHolds, setTableHolds] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>();
  const [tableUsers, setTabUsers] = useState<boolean>(false);
  const [tableGovernment, setTableGovernment] = useState<boolean>(false);
  const [machinesCanUse, setMachinesCanUse] = useState<IMachine[]>();
  const [listGovernment, setListGovernment] = useState<IGovernment[]>();

  const navigate: NavigateFunction = useNavigate();

  const deleteHold = async (id: string) => {
    const response: ApiResponse<IHold> = await deleteHoldApi(id, user!.token!);
    if (!response.status) {
      return;
    }
    setHold(null);
    fetchHolds();
  };

  const addMachine = async (_governmentId: string, _machineId: string) => {
    const response: ApiResponse<IHold> = await addMachineInGovernmentApi({
      _governmentId,
      _machineId,
      token: user!.token!,
    });
    if (!response.status) {
      return;
    }
    fetchGovernments();
    fetchMachineCanUse();
  };

  const dropMachine = async (_governmentId: string, _machineId: string) => {
    const response: ApiResponse<IHold> = await dropMachineInGovernmentApi({
      _governmentId,
      _machineId,
      token: user!.token!,
    });
    if (!response.status) {
      return;
    }
    fetchGovernments();
    fetchMachineCanUse();
  };

  const deleteUser = async (_id: string) => {
    const response: ApiResponse<IUser> = await deleteUserApi({
      _id,
      token: user!.token!,
    });
    if (!response.status) {
      return;
    }
    fetchUsers();
  };

  const changeStatusUser = async (_id: string, status: UserStatus) => {
    const response: ApiResponse<IUser> = await updateStatusUserApi({
      _id,
      status,
      token: user!.token!,
    });
    if (!response.status) {
      return;
    }
    fetchUsers();
  };

  const changeRoleUser = async (_id: string, role: UserRole) => {
    const response: ApiResponse<IUser> = await updateRoleUserApi({
      _id,
      role,
      token: user!.token!,
    });
    if (!response.status) {
      return;
    }
    fetchUsers();
  };

  const logout = () => {
    removeUser();
    return navigate("/login");
  };

  const fetchHolds = useCallback(async () => {
    const response: ApiResponse<IHold> = await getHoldsApi(user!.token!);
    if (!response.status) {
      return;
    }
    setHolds(response.data);
  }, []);

  const fetchGovernments = useCallback(async () => {
    const response: ApiResponse<{ _id: string; government: string }> =
      await getGovernmentApi();
    if (!response.status) {
      return;
    }
    setListGovernment(response.data);
  }, []);

  const fetchMachineCanUse = useCallback(async () => {
    const response: ApiResponse<IMachine> = await fetchMachineCanUseApi(
      user!.token!
    );
    if (!response.status) {
      return;
    }
    setMachinesCanUse(response.data);
  }, []);

  const fetchUsers = useCallback(async () => {
    const response: ApiResponse<IUser> = await fetchUsersApi(user!.token!);
    if (!response.status) {
      return;
    }

    setUsers(response.data);
  }, []);

  useEffect(() => {
    fetchHolds();
    fetchUsers();
    fetchMachineCanUse();
    fetchGovernments();
    const interval = setInterval(() => {
      if (!tableUsers || !tableGovernment || !tableHolds) {
        fetchHolds();
      }
      if (tableUsers) {
        fetchUsers();
      } else if (tableGovernment) {
        fetchMachineCanUse();
        fetchGovernments();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return isLoaded ? (
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
      }}
    >
      <GoogleMap
        mapContainerStyle={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
        onLoad={onLoad}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "1%",
          }}
        >
          <h1>{user?._governmentId.name}</h1>
        </div>
        <div
          style={{
            position: "absolute",
            top: "2%",
            right: "1%",
          }}
        >
          <button
            style={{
              borderRadius: "50px",
              background: "#ed2b2b",
              width: "150px",
              padding: "6%",
              textAlign: "center",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={logout}
          >
            Logout
          </button>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "2%",
            left: "1%",
          }}
        >
          <button
            style={{
              borderRadius: "50px",
              background: "#66DCAD",
              width: "120px",
              padding: "6%",
              textAlign: "center",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={() => setTableHolds(!tableHolds)}
          >
            Table
          </button>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "2%",
            right: "1%",
          }}
        >
          <button
            style={{
              borderRadius: "50px",
              background: "#e3df0e",
              width: "150px",
              padding: "6%",
              textAlign: "center",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={() => setTabUsers(!tableUsers)}
          >
            Dashboard
          </button>
        </div>

        {hold && (
          <HoldDetailComponent
            hold={hold}
            onClickCancel={() => setHold(null)}
            canDelete={
              user!.role == UserRole.ADMIN || user!.role == UserRole.SUPERADMIN
            }
            onClickDelete={() => deleteHold(hold._id!)}
          />
        )}
        {tableUsers && (
          <TableUsersComponent
            user={user!}
            users={users!}
            onClickCancel={() => setTabUsers(!tableUsers)}
            onClickCancelTableGovernment={() =>
              setTableGovernment(!tableGovernment)
            }
            onClickDelete={(_id) => deleteUser(_id!)}
            onChangeStatus={(_id, status) => changeStatusUser(_id!, status)}
            onChangeRole={(_id, role) => changeRoleUser(_id!, role)}
          />
        )}
        {tableGovernment && (
          <TableGovernmentComponent
            user={user!}
            governments={listGovernment}
            machineCanUse={machinesCanUse}
            onClickCancel={() => {
              setTableGovernment(!tableGovernment), setTabUsers(!tableUsers);
            }}
            onClickBack={() => {
              setTableGovernment(!tableGovernment);
            }}
            onClickDelete={(_id) => null}
            onAddMachine={(_governmentId, _machineId) =>
              addMachine(_governmentId, _machineId)
            }
            onDropMachine={(_governmentId, _machineId) =>
              dropMachine(_governmentId, _machineId)
            }
          />
        )}
        {tableHolds && (
          <TableHoldsComponent
            onClickCancel={() => setTableHolds(!tableHolds)}
            holds={holds!}
          />
        )}
        {user?.status === UserStatus.INACTIVE && (
          <NotActiveComponent user={user} />
        )}
        {holds?.map((hold: IHold) => (
          <Marker
            key={hold._id}
            position={hold.position}
            onClick={() => {
              setHold(hold);
            }}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default HomePage;
