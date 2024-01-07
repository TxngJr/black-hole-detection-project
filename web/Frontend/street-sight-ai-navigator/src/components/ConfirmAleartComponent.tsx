import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  isOpen: string | undefined;
  title: string;
  description: string;
  isClose: () => void;
  isConfirm: () => void;
};

export default function ConfirmAleartComponent(props: Props) {
  return (
    <Dialog
      open={props.isOpen === "confirm"}
      onClose={props.isClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.isClose}>Disagree</Button>
        <Button onClick={props.isConfirm} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
