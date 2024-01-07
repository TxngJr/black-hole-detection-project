import Box from "@mui/material/Box";
import { IUser, UserStatus } from "../interfaces/user.interface";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

type Props = {
  user: IUser | null;
};

export default function NotActiveComponent(props: Props) {
  const { removeUser } = useContext(AuthContext);
  const navigate: NavigateFunction = useNavigate();
  const logout = () => {
    removeUser();
    return navigate("/login");
  };

  return (
    <Dialog
      maxWidth="xl"
      fullWidth
      open={props.user?.status === UserStatus.INACTIVE}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DialogContent sx={{}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#FFFFFF",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              "@media (min-width:0px) and (max-width:515px)": {
                fontSize: "14px",
              },
              "@media (min-width:516px) and (max-width:775px)": {
                fontSize: "24px",
              },
              "@media (min-width:776px)": {
                fontSize: "36px",
              },
            }}
          >
            Hello {props.user?.username} Sorry your not active
          </Typography>
          <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
          >
          <Button
            variant="contained"
            onClick={()=>window.location.reload()}
            color="info"
            sx={{
              mt: 10,
            }}
            size="large"
            >
            Reload
          </Button>
          <Button
            variant="contained"
            onClick={logout}
            color="error"
            sx={{
              mt: 10,
            }}
            size="large"
            >
            Logout
          </Button>
            </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
