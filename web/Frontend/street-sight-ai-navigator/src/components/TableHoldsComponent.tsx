import { IHold } from "../interfaces/hold.interface";
import { API_BASE_URL } from "../constants";
import Dialog from "@mui/material/Dialog";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Props {
  holds: IHold[] | undefined;
  isOpen: string | undefined;
  isClose: () => void;
}

export default function TableHoldsComponent(props: Props) {
  const downloadPDF = async () => {
    return window.open("/pdf", "_blank");
  };
  const isWidthLessThan720 = useMediaQuery("(max-width:720px)");
  return (
    <Dialog
      maxWidth="xl"
      fullWidth
      open={props.isOpen === "holdsTable"}
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
        <Typography variant="h6">Holds Table</Typography>
        <Button variant="contained" color="warning" onClick={downloadPDF}>
          PDF
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>latitude </TableCell>
                <TableCell>longitude</TableCell>
                {!isWidthLessThan720 && <TableCell>Img</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.holds?.map((hold: IHold, index: number) => (
                <TableRow key={hold._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{hold.address}</TableCell>
                  <TableCell>{hold.position.lat}</TableCell>
                  <TableCell>{hold.position.lng}</TableCell>
                  {!isWidthLessThan720 && (
                    <TableCell>
                      <Avatar
                        src={`${API_BASE_URL}/holds/img?pathImg=${hold.path}`}
                        alt="../assets/images/jivt.png"
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                        }}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.isClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
