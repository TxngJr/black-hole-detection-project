import { IHold } from "../interfaces/hold.interface";
import { API_BASE_URL } from "../constants";

interface Props {
  holds: IHold[];
  onClickCancel: () => void;
}

export default function TableLatLng(props: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: "0 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          width: "90%",
          height: "95%",
          borderRadius: "20px",
          background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
          display: "block",
        }}
      >
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
                width: "15%",
              }}
            >
              <h1>number</h1>
            </div>
            <div
              style={{
                textAlign: "center",
                width: "17.5%",
              }}
            >
              <h1>latitude</h1>
            </div>
            <div
              style={{
                textAlign: "center",
                width: "17.5%",
              }}
            >
              <h1>longitude</h1>
            </div>
            <div
              style={{
                textAlign: "center",
                width: "20%",
              }}
            >
              <h1>address</h1>
            </div>
            <div
              style={{
                textAlign: "center",
                width: "30%",
              }}
            >
              <h1>img</h1>
            </div>
          </div>
          <div
            style={{
              height: "calc(90vh - 40px)",
              overflowY: "scroll",
            }}
          >
            {props.holds?.map((hold: IHold, index: number) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "5px",
                  borderRadius: "10px",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    width: "15%",
                  }}
                >
                  <h1>{index + 1}</h1>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    width: "17.5%",
                  }}
                >
                  <h1>{hold.position.lat}</h1>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    width: "17.5%",
                  }}
                >
                  <h1>{hold.position.lng}</h1>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    width: "20%",
                  }}
                  // onClick={() => handleChangeRole(user._id, user.role)}
                >
                  <h1
                    style={{
                      // color:
                      //   user.role === UserRole.ADMIN ? "#bfb23b" : "#000000",
                      cursor: "pointer",
                    }}
                  >
                    {hold.address}
                  </h1>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    width: "30%",
                  }}
                  // onClick={() => handleChangeStatus(user._id, user.status)}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
