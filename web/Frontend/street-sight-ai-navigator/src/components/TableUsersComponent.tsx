import { IUser, UserRole, UserStatus } from "../interfaces/user.interface";

type Props = {
  user: IUser;
  users?: IUser[];
  onClickCancel: () => void;
  onClickCancelTableGovernment: () => void;
  onClickDelete: (_id: string | any) => void;
  onChangeStatus: (_id: string, status: UserStatus) => void;
  onChangeRole: (_id: string, role: UserRole) => void;
};

export default function TableUsersComponent(props: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: "5%",
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
      {props.user.role === UserRole.SUPERADMIN && (

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
            background: "#1c03fc",
            width: "160px",
            padding: "6%",
            textAlign: "center",
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={() => props.onClickCancelTableGovernment()}
          >
          Government
        </button>
      </div>
          )}
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
          style={{
            width: "95%",
            height: "90%",
            borderRadius: "20px",
            background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
            display: "block",
            paddingTop: "1%",
          }}
        >
          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          >
          <h1
          style={{
            fontSize: "48px",
            paddingLeft: "2%",
          }}
          >
          Dashboard User
          </h1>
          <h1
            style={{
              paddingRight: "2%",
              fontSize: "48px",
            }}
            >
            Hello {props.user.username} !
          </h1>
            </div>
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
                flexDirection: "row",
                justifyContent: "space-between",
                background: "#FFFFFF",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  flex: 1,
                }}
              >
                <h1>number</h1>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  flex: 2,
                }}
              >
                <h1>username</h1>
              </div>
              {
                    props.user.role === UserRole.SUPERADMIN && (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  flex: 3,
                }}
              >
                <h1>government</h1>
              </div>
                    )}
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  flex: 1,
                }}
              >
                <h1>role</h1>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  flex: 1,
                }}
              >
                <h1>status</h1>
              </div>
            </div>
            <div
              style={{
                height: "calc(58vh - 40px)",
                overflowY: "scroll",
              }}
            >
              {props.users?.map((listUser: IUser, index: any) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                  key={index}
                >
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      flex: 1,
                    }}
                    onClick={() => props.onClickDelete!(listUser._id)}
                  >
                    <h1>{index + 1}</h1>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      flex: 2,
                    }}
                  >
                    <h1>{listUser.username}</h1>
                  </div>
                  {
                    props.user.role === UserRole.SUPERADMIN && (
                      <div
                      style={{
                        textAlign: "center",
                        width: "100%",
                        flex: 3,
                      }}
                      >
                    <h1>
                        {listUser._governmentId.name}
                    </h1>
                  </div>
                    )}
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      flex: 1,
                    }}
                    onClick={() =>
                      props.onChangeRole!(
                        listUser._id,
                        listUser.role === UserRole.ADMIN
                          ? UserRole.USER
                          : UserRole.ADMIN
                      )
                    }
                  >
                    <h1
                      style={{
                        color:
                          listUser.role === UserRole.ADMIN
                            ? "#bfb23b"
                            : "#000000",
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
                      flex: 1,
                    }}
                    onClick={() =>
                      props.onChangeStatus!(
                        listUser._id,
                        listUser.status === UserStatus.ACTIVE
                          ? UserStatus.INACTIVE
                          : UserStatus.ACTIVE
                      )
                    }
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
