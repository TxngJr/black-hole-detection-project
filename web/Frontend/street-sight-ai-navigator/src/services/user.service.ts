import { ApiResponse } from "../interfaces/gobal.interface";
import { ILoginApiRequestAndForm } from "../interfaces/user.interface";

const URL_SERVER = 'http://192.168.1.45:3000';

// export const registerApi = async (
//   data: IRegisterApiRequest,
// ): Promise<ApiResponse<any>> => {
//   try {
//     const response = await fetch(URL_SERVER + '/users/register', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         ...data,
//       }),
//     });
//     const responseObject: {message: string} = await response.json();
//     let result: ApiResponse<any> = {
//       status: true,
//       message: responseObject.message,
//       data: responseObject,
//     };
//     if (response.status != 201) {
//       result.status = false;
//     }
//     return result;
//   } catch (error) {
//     return {status: false, message: 'Have Somthing Wrong'};
//   }
// };

export const loginApi = async (
  data: ILoginApiRequestAndForm,
): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(URL_SERVER + '/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    const responseObject: {message: string} = await response.json();
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
    return {status: false, message: 'Have Somthing Wrong'};
  }
};

export const selfApi = async (
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(URL_SERVER + '/users/self', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const responseObject: {message: string} = await response.json();
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
    return {status: false, message: 'Have Somthing Wrong'};
  }
};

export const getParty = async (
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(URL_SERVER + '/users/get-party', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const responseObject: {message: string} = await response.json();
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
    return {status: false, message: 'Have Somthing Wrong'};
  }
};
