import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ApiResponse } from "../interfaces/gobal.interface";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import TableHoldsComponent from "../components/TableHoldsComponent";
import { deleteHoldApi, getHoldsApi } from "../services/hold.service";
import { IHold } from "../interfaces/hold.interface";
import { GOOGLE_MAP_API_KEY } from "../constants";
import HoldDetailComponent from "../components/HoldDetailComponent";
import TableUsersComponent from "../components/TableUsersComponent";
import TableGovernmentComponent from "../components/TableGovernmentComponent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavigateFunction, useNavigate } from "react-router-dom";
import NotActiveComponent from "../components/NotActiveComponent";

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
  const [isOpen, setIsOpen] = useState<string>();
  const [holds, setHolds] = useState<IHold[]>();
  const [holdDetail, setHoldDetail] = useState<IHold>();

  const navigate: NavigateFunction = useNavigate();

  const deleteHold = async (id: string) => {
    const response: ApiResponse<IHold> = await deleteHoldApi(id, user!.token!);
    if (!response.status) {
      return;
    }
    setHoldDetail(undefined);
    setIsOpen(undefined);
    fetchHolds();
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

  useEffect(() => {
    fetchHolds();
  }, []);
  return isLoaded ? (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
          <Button
            variant="contained"
            onClick={logout}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            Logout
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsOpen("holdsTable")}
            sx={{
              position: "absolute",
              bottom: 10,
              left: 10,
            }}
          >
            Holds Table
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsOpen("usersTable")}
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
          >
            Dashboard
          </Button>
        <TableGovernmentComponent
          user={user}
          isOpen={isOpen}
          isClose={() => setIsOpen(undefined)}
          isOpenUser={() => setIsOpen("usersTable")}
        />
        <TableUsersComponent
          user={user}
          isOpen={isOpen}
          isClose={() => setIsOpen(undefined)}
          isOpenGovernment={() => setIsOpen("governmentTable")}
        />
        <TableHoldsComponent
          holds={holds}
          isOpen={isOpen}
          isClose={() => setIsOpen(undefined)}
        />
        <HoldDetailComponent
          user={user}
          hold={holdDetail}
          isOpen={isOpen}
          isClose={() => setIsOpen(undefined)}
          onDelete={(_id) => deleteHold(_id)}
        />
        <NotActiveComponent
          user={user}
        />
        {holds?.map((hold: IHold) => (
          <Marker
            key={hold._id}
            position={hold.position}
            onClick={() => {
              setHoldDetail(hold);
              setIsOpen("holdDetail");
            }}
          />
        ))}
      </GoogleMap>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "2rem",
      }}
    >
      Loading...
    </Box>
  );
}

export default HomePage;
