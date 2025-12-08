export interface CommonResponse<T = object> {
  status: boolean;
  code: string;
  message: string;
  data: T;
}
