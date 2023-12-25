import { ApiResponse } from "../interfaces/gobal.interface";
import {
  ILoginApiRequestAndForm,
  IRegisterApiRequest,
} from "../interfaces/user.interface";

const URL_SERVER = "http://10.10.5.83:3000";

export const registerApi = async (
  data: IRegisterApiRequest
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(URL_SERVER + "/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    const responseObject: { message: string } = await response.json();
    let result: ApiResponse<any> = {
      status: true,
      message: responseObject.message,
      data: responseObject,
    };
    if (response.status != 201) {
      result.status = false;
    }
    return result;
  } catch (error) {
    return { status: false, message: "Have Somthing Wrong" };
  }
};

export const loginApi = async (
  data: ILoginApiRequestAndForm
): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(URL_SERVER + "/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
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

export const selfApi = async (token: string): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(URL_SERVER + "/users/self", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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

export const updateStatusUserApi = async (data: {
  status: string;
  token: string;
  _id: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(
      URL_SERVER +
        `/users/change-status-user?_id=${data._id}&status=${data.status}`,
      {
        method: "GET",
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

export const deleteUserApi = async (data: {
  token: string;
  _id: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(
      URL_SERVER + `/users/delete-user?_id=${data._id}`,
      {
        method: "DELETE",
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

export const fetchUsersApi = async (
  token: string
): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(
      URL_SERVER + "/users/fetch-users?page=1&pageSize=10",
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
