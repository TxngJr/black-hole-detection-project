import Dialog from "@mui/material/Dialog";
import { IUser, UserRole, UserStatus } from "../interfaces/user.interface";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DialogActions from "@mui/material/DialogActions";
import { useCallback, useEffect, useState } from "react";
import { ApiResponse } from "../interfaces/gobal.interface";
import {
  deleteUserApi,
  fetchUsersApi,
  updateRoleUserApi,
  updateStatusUserApi,
} from "../services/user.service";
import Paper from "@mui/material/Paper";

type Props = {
  user: IUser | null;
  isOpen: string | undefined;
  isClose: () => void;
  isOpenGovernment: () => void;
};

export default function TableUsersComponent(props: Props) {
  const [users, setUsers] = useState<IUser[]>();
  const deleteUser = async (_id: string) => {
    const response: ApiResponse<IUser> = await deleteUserApi({
      _id,
      token: props.user!.token!,
    });
    if (!response.status) {
      return;
    }
    fetchUsers();
  };

  const changeStatusUser = async (_id: string, status: UserStatus) => {
    const response: ApiResponse<IUser> = await updateStatusUserApi({
      _id,
      status,
      token: props.user!.token!,
    });
    if (!response.status) {
      return;
    }
    fetchUsers();
  };

  const changeRoleUser = async (_id: string, role: UserRole) => {
    const response: ApiResponse<IUser> = await updateRoleUserApi({
      _id,
      role,
      token: props.user!.token!,
    });
    if (!response.status) {
      return;
    }
    fetchUsers();
  };
  const fetchUsers = useCallback(async () => {
    const response: ApiResponse<IUser> = await fetchUsersApi(
      props.user!.token!
    );
    if (!response.status) {
      return;
    }

    setUsers(response.data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Dialog
      maxWidth="xl"
      fullWidth
      open={props.isOpen === "usersTable"}
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
        <Typography variant="h6">Users Table</Typography>
        <Button
          variant="contained"
          color="info"
          onClick={props.isOpenGovernment}
        >
          Government
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        <TableContainer
          component={Paper}
          sx={{
            width: "70vw",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Government </TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Del</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user: IUser, index: number) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user._governmentId.name}</TableCell>
                  <TableCell
                    sx={{
                      cursor: "pointer",
                      color: user.role === UserRole.ADMIN ? "#fcba03" : "#61baae",
                    }}
                    onClick={() =>
                      changeRoleUser(
                        user._id,
                        user.role === UserRole.USER
                          ? UserRole.ADMIN
                          : UserRole.USER
                      )
                    }
                  >
                    {user.role}
                  </TableCell>
                  <TableCell
                    sx={{
                      cursor: "pointer",
                      color:
                        user.status === UserStatus.ACTIVE ? "#00B051" : "#F00",
                    }}
                    onClick={() =>
                      changeStatusUser(
                        user._id,
                        user.status === UserStatus.ACTIVE
                          ? UserStatus.INACTIVE
                          : UserStatus.ACTIVE
                      )
                    }
                  >
                    {user.status}
                  </TableCell>
                  <TableCell
                    sx={{
                      cursor: "pointer",
                      color:
                        user.status === UserStatus.ACTIVE ? "#00B051" : "#F00",
                    }}
                    onClick={() =>
                      changeStatusUser(
                        user._id,
                        user.status === UserStatus.ACTIVE
                          ? UserStatus.INACTIVE
                          : UserStatus.ACTIVE
                      )
                    }
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteUser(user._id)}
                    >
                      Del
                    </Button>
                  </TableCell>
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
