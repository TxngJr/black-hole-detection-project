import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ApiResponse } from "../interfaces/gobal.interface";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Button from "../components/Button";
import TableLatLng from "../components/TableLatLng";
import { deleteHoldApi, getHoldsApi } from "../services/hold.service";
import { IHold } from "../interfaces/hold.interface";

function HomePage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAYo9E_FaMLIjTtPbqO4UGCcCgJm9P3xc0",
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
          width: "100vw",
          height: "100vh",
        }}
        onLoad={onLoad}
      >
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
          }}
        >
          <Button
            onClick={() => setTable(!table)}
            backgroundColor={table ? "#f44336" : "#03adfc"}
            fontSize="24px"
            buttonText={table ? "Close" : "Open Table"}
          />
        </div>
        {table && <TableLatLng holds={holds} />}
        {error && <h1>{error}</h1>}
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
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setHold(null)}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                position: "absolute",
                top: "10px",
                right: "10px"
            }}>
                <Button
                  onClick={() => deleteHold(hold._id!)}
                  backgroundColor="#f44336"
                  fontSize="24px"
                  buttonText="Delete"
                />
              </div>
              <img
                style={{
                  width: "80%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                  maxHeight: "100%",
                  maxWidth: "100%",
                  overflow: "hidden",
                  objectFit: "cover",
                }}
                alt={`Image ${hold._id}`}
                src={`http://10.10.5.83:3000/holds/img?pathImg=${hold.path}`} // must change to your ip
                onClick={() => setHold(null)}
              />
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
