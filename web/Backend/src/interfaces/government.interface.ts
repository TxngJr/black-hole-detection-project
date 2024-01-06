import { IMachine } from "./mahine.interface";

export interface IGovernment {
  _id: string | any;
  name: string;
  _userId: string | any;
  _machineListId: Array<string | any|IMachine>;
}
