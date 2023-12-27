import { useContext} from "react";
import { AuthContext } from "../contexts/AuthContext";

function WaitActivePage() {
  const { user } = useContext(AuthContext);

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
