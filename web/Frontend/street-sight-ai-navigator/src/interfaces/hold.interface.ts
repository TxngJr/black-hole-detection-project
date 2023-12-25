export interface IHold {
  _id?: string;
  path: string;
  position: {
    lat: number;
    lng: number;
  };
  address: string;
  macAddress: string;
}

