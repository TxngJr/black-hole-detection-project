import { IMachine } from "./mahine.interface";

export interface IHold {
  _id: string | any;
  path: string;
  position: {
    lat: number;
    lng: number;
  };
  address: string;
  _machineId: IMachine;
}

