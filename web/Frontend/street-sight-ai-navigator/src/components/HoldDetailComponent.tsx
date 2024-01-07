import Dialog from "@mui/material/Dialog";
import { API_BASE_URL } from "../constants";
import { IHold } from "../interfaces/hold.interface";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import DialogActions from "@mui/material/DialogActions";
import { IUser, UserRole } from "../interfaces/user.interface";

type Props = {
  user: IUser | null;
  hold: IHold | undefined;
  isOpen: string | undefined;
  isClose: () => void;
  onDelete: (_id: string) => void;
};

export default function HoldDetailComponent(props: Props) {
  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={props.isOpen === "holdDetail"}
      onClose={props.isClose}
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
        <Typography variant="h6"
        sx={{
          "@media (max-width: 500px)": {
            fontSize: "13px",
          },
        }}
        >
          macAddress {props.hold?._machineId.macAddress}
        </Typography>
        {props.user?.role !== UserRole.USER && (
          <Button
            variant="contained"
            color="error"
            onClick={() => props.onDelete(props.hold?._id)}
          >
            Delete
          </Button>
        )}
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={`${API_BASE_URL}/holds/img?pathImg=${props.hold?.path}`}
          alt="../assets/images/jivt.png"
          sx={{
            width: "90%",
            height: "90%",
            borderRadius: "8px",
          }}
        />
        <Box
          sx={{
            marginTop: "20px",
            width: "100%",
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>latitude</TableCell>
                  <TableCell>longitude</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={props.hold?._id}>
                  <TableCell>{props.hold?.address}</TableCell>
                  <TableCell>{props.hold?.position.lat}</TableCell>
                  <TableCell>{props.hold?.position.lng}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.isClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
