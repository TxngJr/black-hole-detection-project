import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ApiResponse } from "../interfaces/gobal.interface";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Button from "../components/Button";
import TableLatLng from "../components/TableLatLng";
import { deleteHoldApi, getHoldsApi } from "../services/hold.service";
import { IHold } from "../interfaces/hold.interface";
import { API_BASE_URL, GOOGLE_MAP_API_KEY } from "../constants";

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

  const { user } = useContext(AuthContext);
  const [holds, setHolds] = useState<IHold[] | null>();
  const [hold, setHold] = useState<IHold | null>();
  const [table, setTable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchHolds = async () => {
    const response: ApiResponse<IHold> = await getHoldsApi(user!.token);
    if (!response.status) {
      setError("เกิดข้อผิดพลาด");
    }
    return setHolds(response.data);
  };

  const deleteHold = async (id: string) => {
    const response: ApiResponse<IHold> = await deleteHoldApi(id, user!.token);
    if (!response.status) {
      setError("เกิดข้อผิดพลาด");
    }
    setHold(null);
    return fetchHolds();
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
        background: "#ffffff",
      }}
    >
      <GoogleMap
        mapContainerStyle={{
          position: "relative",
          display: "block",
          width: "100%",
          height: "100%",
        }}
        onLoad={onLoad}
      >
        <div
          style={{
            position: "absolute",
            bottom: "2%",
            left: "1%",
          }}
        >
          <button
            style={{
              margin: "0 auto",
              borderRadius: "50px",
              background: table ? "#f44336" : "#03adfc",
              width: "125px",
              padding: "20%",
              textAlign: "center",
              fontSize: "24px",
            }}
            onClick={() => setTable(!table)}
          >
            {table ? "Close" : "Table"}
          </button>
        </div>
        {table && <TableLatLng holds={holds} />}
        {/* {error && <h1>{error}</h1>} */}
        {holds?.map((hold: IHold) => (
          <Marker
            key={hold?._id}
            position={hold!.position}
            onClick={() => {
              setHold(hold);
            }}
          />
        ))}
        {hold && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => setHold(null)}
          >
            <div
              style={{
                borderRadius: "5px",
                background: "#ffffff",
                width: "70%",
                height: "85%",
                padding: "20px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setHold(null)}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "8%",
                  right: "6%",
                }}
              >
                <button
                  style={{
                    display: "block",
                    borderRadius: "50px",
                    background: "#f44336",
                    padding: "20%",
                    textAlign: "center",
                    fontSize: "24px",

                  }}
                  onClick={() => deleteHold(hold._id!)}
                >
                  Delete
                </button>
              </div>
              <img
                style={{
                  margin: "0 auto",
                  maxWidth: "100%",
                  display: "block",
                  overflow: "hidden",
                  objectFit: "contain",
                }}
                alt={`Image ${hold._id}`}
                src={`${API_BASE_URL}/holds/img?pathImg=${hold.path}`}
                onClick={() => setHold(null)}
              />
              <div 
              style={{
                display:"flex",
                padding:"2% 2%"
              }}
              >
                <h1
                style={{
                  fontSize:"24px",
                }}
                >Latitude : </h1>
                <h1
                style={{
                  fontSize:"24px",
                }}
                >{hold.position.lat}</h1>
                <h1
                style={{
                  marginLeft:"30%",
                  fontSize:"24px",
                }}
                >Longitude : </h1>
                <h1
                style={{
                  fontSize:"24px",
                }}
                >{hold.position.lng}</h1>
              </div>
            </div>
          </div>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default HomePage;
