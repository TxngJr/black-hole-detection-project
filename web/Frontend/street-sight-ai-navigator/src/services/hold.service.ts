import {ApiResponse} from '../interfaces/gobal.interface';

const URL_SERVER = 'http://192.168.1.45:3000';


export const deleteHoldApi = async (
  id: string,
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(
      URL_SERVER + '/holds?_id=' + id,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
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

export const getHoldsApi = async (
  token: string,
): Promise<ApiResponse<any>> => {
  try {
    const response: Response = await fetch(URL_SERVER + '/holds/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const responseObject = await response.json();
    let result: ApiResponse<any> = {
      status: true,
      message: '',
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
