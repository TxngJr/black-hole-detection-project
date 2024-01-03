import { API_BASE_URL } from "../constants";
import { ApiResponse } from "../interfaces/gobal.interface";

export const fetchOwnerCanUseApi = async (
    token: string
  ): Promise<ApiResponse<any>> => {
    try {
      const response: Response = await fetch(
        API_BASE_URL + "/users/get-owner-can-use",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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