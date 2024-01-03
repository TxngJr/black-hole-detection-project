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

  

  
  export const addMacAddressApi = async (data: {
    _id: string;
    macAddress: string;
    token: string;
  }): Promise<ApiResponse<any>> => {
    try {
      const response: Response = await fetch(
        API_BASE_URL +
          `/users/add-owner-user?_id=${data._id}&macAddress=${data.macAddress}`,
        {
          method: "POST",
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
  
  export const dropMacAddressApi = async (data: {
    _id: string;
    macAddress: string;
    token: string;
  }): Promise<ApiResponse<any>> => {
    try {
      const response: Response = await fetch(
        API_BASE_URL +
          `/users/drop-owner-user?_id=${data._id}&macAddress=${data.macAddress}`,
        {
          method: "POST",
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