import Box from "@mui/material/Box";
import { IUser } from "../interfaces/user.interface";
import { Dialog, DialogTitle, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { selfApi } from "../services/user.service";
import { ApiResponse } from "../interfaces/gobal.interface";

type Props = {
  user: IUser | null;
};

export default function NotActiveComponent(props: Props) {
  const { user, removeUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate: NavigateFunction = useNavigate();
  const logout = () => {
    removeUser();
    return navigate("/login");
  };

  useEffect(() => {
    const checkActive = async () => {
      const response: ApiResponse<IUser> = await selfApi(user!.token!);
      if (!response.status) {
        setTimeout(checkActive, 3000);
      }
      setIsOpen(false);
    }
    checkActive();
  }, []);

  return (
    <Dialog
      maxWidth="xl"
      fullWidth
      open={isOpen}
      // onClose={setIsOpen}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "absolute",
            width: "400px",
            height: "200px",
            background: "#FFFFFF",
          }}
        >
          <Typography>
            Hello {props.user?.username} Sorry your not active
          </Typography>
        </Box>
      </DialogTitle>
    </Dialog>
    // <div
    //   style={{
    //     position: "absolute",
    //     left: "0",
    //     right: "0",
    //     top: "0",
    //     bottom: "0",
    //     backgroundColor: "rgba(0, 0, 0, 0.2)",
    //     padding: "15%",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    // <div
    //   style={{
    //     background: "linear-gradient(180deg, #86DCAD 50%, #E9F191 100%)",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     display: "flex",
    //     width: "100%",
    //     height: "100%",
    //     borderRadius: "50px",
    //   }}
    //   >
    //   <div
    //     style={{
    //       width: "90%",
    //       height: "80%",
    //       background: "#FFFFFF",
    //       borderRadius: "50px",
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <h1
    //       style={{
    //         textAlign: "center",
    //         fontSize: "48px",
    //       }}
    //     >
    //       Hello {props.user?.username} Sorry your not active
    //     </h1>
    //   </div>
    //   </div>
    // </div>
  );
}
