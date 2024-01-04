import { API_BASE_URL } from "../constants";
import { IHold } from "../interfaces/hold.interface";

type Props = {
  hold: IHold;
  onClickCancel: () => void;
  canDelete: boolean;
  onClickDelete?: () => void;
};

export default function HoldDetailComponent(props: Props) {
  return (
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
            borderRadius: "50px",
            background: "#f44336",
            width: "120px",
            padding: "6%",
            textAlign: "center",
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={() => props.onClickCancel()}
        >
          Close
        </button>
      </div>
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
          alt={`Image ${props.hold._id}`}
          src={`${API_BASE_URL}/holds/img?pathImg=${props.hold.path}`}
        />
        <div
          style={{
            display: "block",
            width: "30%",
            padding: "0.7% 2%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
            alignItems: "center",
            }}
          >
            <h1
              style={{
                whiteSpace: "nowrap",
                fontSize: "20px",
                marginRight: "1%",
              }}
            >
              Machine ID :
            </h1>
            <h1
              style={{
                fontSize: "12px",
              }}
            >
              {props.hold._machineId.macAddress}
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
              Latitude :
            </h1>
            <h1
              style={{
                fontSize: "20px",
              }}
            >
              {props.hold.position.lat}
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
              {props.hold.position.lng}
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
              {props.hold.address}
            </h1>
          </div>
          {props.canDelete && (
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
              onClick={() => props.onClickDelete!()}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
