import { IUser } from "../interfaces/user.interface";
import Dialog from "@mui/material/Dialog";
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
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import { ApiResponse } from "../interfaces/gobal.interface";
import {
  addMachineInGovernmentApi,
  dropMachineInGovernmentApi,
  getGovernmentApi,
} from "../services/government.service";
import { IGovernment } from "../interfaces/government.interface";
import { IMachine } from "../interfaces/mahine.interface";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { IHold } from "../interfaces/hold.interface";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { fetchMachineCanUseApi } from "../services/machine.service";

type Props = {
  user: IUser | null;
  isOpen: string | undefined;
  isClose: () => void;
  isOpenUser: () => void;
};

export default function TableGovernmentComponent(props: Props) {
  const [governments, setGovernments] = useState<IGovernment[]>();
  const [machinesCanUse, setMachinesCanUse] = useState<IMachine[]>();

  const addMachine = async (_governmentId: string, _machineId: string) => {
    const response: ApiResponse<IHold> = await addMachineInGovernmentApi({
      _governmentId,
      _machineId,
      token: props.user!.token!,
    });
    if (!response.status) {
      return;
    }
    fetchGovernments();
    fetchMachineCanUse();
  };

  const dropMachine = async (_governmentId: string, _machineId: string) => {
    const response: ApiResponse<IHold> = await dropMachineInGovernmentApi({
      _governmentId,
      _machineId,
      token: props.user!.token!,
    });
    if (!response.status) {
      return;
    }
    fetchGovernments();
    fetchMachineCanUse();
  };

  const fetchGovernments = useCallback(async () => {
    const response: ApiResponse<{ _id: string; government: string }> =
      await getGovernmentApi();
    if (!response.status) {
      return;
    }
    setGovernments(response.data);
  }, []);

  const fetchMachineCanUse = useCallback(async () => {
    const response: ApiResponse<IMachine> = await fetchMachineCanUseApi(
      props.user!.token!
    );
    if (!response.status) {
      return;
    }
    setMachinesCanUse(response.data);
  }, []);

  useEffect(() => {
    fetchGovernments();
    fetchMachineCanUse();
    setInterval(() => {
      fetchGovernments();
      fetchMachineCanUse();
    }, 3000);
  }, []);
  return (
    <Dialog
      maxWidth="xl"
      fullWidth
      open={props.isOpen === "governmentTable"}
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
        <Button variant="contained" color="info" onClick={props.isOpenUser}>
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
                <TableCell>Government </TableCell>
                <TableCell>Machine</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {governments?.map((government: IGovernment, index: number) =>
                government.name === "superAdmin" ? null : (
                  <TableRow key={government._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{government.name}</TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        {government._machineListId.map((machine: IMachine) => {
                          return (
                            <Typography
                              onClick={() => {
                                dropMachine(government._id, machine._id);
                              }}
                            >
                              {machine.macAddress}
                            </Typography>
                          );
                        })}
                      </Box>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id="add-machine">Add Machine</InputLabel>
                        <Select
                          name="add-machine"
                          labelId="add-machine"
                          id="add-machine"
                          label="add-machine"
                          onChange={(e: any) => {
                            addMachine(government._id, e.target.value);
                          }}
                        >
                          {machinesCanUse?.map((machine: IMachine) => {
                            return (
                              <MenuItem value={machine._id}>
                                {machine.macAddress}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                )
              )}
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
