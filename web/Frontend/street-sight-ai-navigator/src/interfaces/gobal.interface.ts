export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: Array<T> | T | any;
}
