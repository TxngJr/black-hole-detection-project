import { API_BASE_URL } from "../constants";
import { ApiResponse } from "../interfaces/gobal.interface";

export const getGovernmentApi = async (): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(
      API_BASE_URL + "/governments/get-government",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const responseObject: { message: string } = await response.json();
    let result: ApiResponse<any> = {
      status: true,
      message: responseObject.message,
      data: responseObject,
    };
    if (response.status != 200) {
      result.status = false;
    }
    return result;
  } catch (error) {
    return { status: false, message: "Have Somthing Wrong" };
  }
};

export const addMachineInGovernmentApi = async (data: {
  _governmentId: string;
  _machineId: string;
  token: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(
      API_BASE_URL +
        `/governments/add-machine-in-government?_governmentId=${data._governmentId}&_machineId=${data._machineId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    const responseObject: { message: string } = await response.json();
    let result: ApiResponse<any> = {
      status: true,
      message: responseObject.message,
      data: responseObject,
    };
    if (response.status != 200) {
      result.status = false;
    }
    return result;
  } catch (error) {
    return { status: false, message: "Have Somthing Wrong" };
  }
};

export const dropMachineInGovernmentApi = async (data: {
  _governmentId: string;
  _machineId: string;
  token: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(
      API_BASE_URL +
      `/governments/drop-machine-in-government?_governmentId=${data._governmentId}&_machineId=${data._machineId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    const responseObject: { message: string } = await response.json();
    let result: ApiResponse<any> = {
      status: true,
      message: responseObject.message,
      data: responseObject,
    };
    if (response.status != 200) {
      result.status = false;
    }
    return result;
  } catch (error) {
    return { status: false, message: "Have Somthing Wrong" };
  }
};
