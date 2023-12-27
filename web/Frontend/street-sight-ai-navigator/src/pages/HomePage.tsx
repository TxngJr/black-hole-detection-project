import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ApiResponse } from "../interfaces/gobal.interface";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import TableLatLng from "../components/TableLatLng";
import { deleteHoldApi, getHoldsApi } from "../services/hold.service";
import { IHold } from "../interfaces/hold.interface";
import { API_BASE_URL, GOOGLE_MAP_API_KEY } from "../constants";
import { UserRole } from "../interfaces/user.interface";
import { NavigateFunction, useNavigate } from "react-router-dom";

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
  const [holds, setHolds] = useState<IHold[]>([
    {
      _id: "",
      position: { lat: 0, lng: 0 },
      address: "",
      path: "",
      macAddress: "",
    },
  ]);
  const [hold, setHold] = useState<IHold | null>();
  const [table, setTable] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  const fetchHolds = async () => {
    const response: ApiResponse<IHold> = await getHoldsApi(user!.token);
    if (!response.status) {
      return
    }
    return setHolds(response.data);
  };

  const deleteHold = async (id: string) => {
    const response: ApiResponse<IHold> = await deleteHoldApi(id, user!.token);
    if (!response.status) {
      return
    }
    setHold(null);
    return fetchHolds();
  };

  const logout = () => {
    removeUser();
    return navigate("/login");
  };

  useEffect(() => {
    fetchHolds();
    const interval = setInterval(() => {
      fetchHolds();
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
        {user?.role === UserRole.ADMIN && (
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
                background: "#d4c013",
                width: "150px",
                padding: "6%",
                textAlign: "center",
                fontSize: "24px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          </div>
        )}
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
              background: table ? "#f44336" : "#66DCAD",
              width: "120px",
              padding: "6%",
              textAlign: "center",
              fontSize: "24px",
              cursor: "pointer",
            }}
            onClick={() => setTable(!table)}
          >
            Table
          </button>
        </div>
        {table && (
          <TableLatLng onClickCancel={() => setTable(!table)} holds={holds} />
        )}
        {hold && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5%",
            }}
            onClick={() => setHold(null)}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                background: "#FFFFFF",
                borderRadius: "50px",
                width: "100%",
                height: "100%",
                padding: "2%",
              }}
            >
              <img
                style={{
                  minWidth: "330px",
                  maxWidth: "1250px",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  objectFit: "contain",
                }}
                alt={`Image ${hold._id}`}
                src={`${API_BASE_URL}/holds/img?pathImg=${hold.path}`}
              />
              <div
                style={{
                  display: "block",
                  width: "30%",
                  padding: "0.7% 2%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Latitude :
                  </h1>
                  <h1
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {hold.position.lat}
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Longitude :
                  </h1>
                  <h1
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {hold.position.lng}
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: "20px",
                      marginRight: "1%",
                    }}
                  >
                    Address :
                  </h1>
                  <h1
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {hold.address}
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h1
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: "20px",
                      marginRight: "1%",
                    }}
                  >
                    Mac Address Pi 4 :
                  </h1>
                  <h1
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    {hold.macAddress}
                  </h1>
                </div>
                {user?.role === UserRole.ADMIN && (
                  <button
                    style={{
                      position: "absolute",
                      bottom: "2%",
                      right: "1%",
                      borderRadius: "50px",
                      background: "#f44336",
                      width: "120px",
                      padding: "1%",
                      textAlign: "center",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteHold(hold._id!)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
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
