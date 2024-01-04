import { IUser } from "../interfaces/user.interface"

type Props = {
  user: IUser
}

export default function NotActiveComponent(props: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: "15%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    <div
      style={{
        background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: "100%",
        height: "100%",
        borderRadius: "50px",
      }}
      >
      <div
        style={{
          width: "90%",
          height: "80%",
          background: "#FFFFFF",
          borderRadius: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "48px",
          }}
        >
          Hello {props.user?.username} Sorry your not active
        </h1>
      </div>
      </div>
    </div>
  )
}