import {AxiosResponse} from "axios";

import {axiosService} from "./axiosService";
import {urls} from "../configs/urls";
import {ApiResponse, PositionsResponse} from "../interface/services/testService";

export const testTaskService = {
  getUsers: (dataReq:{page:number, count:number,offset:number}) => axiosService.get(`${urls.users}?page=${dataReq.page}&count=${dataReq.count}&offset=${dataReq.offset}`).then((value:AxiosResponse<ApiResponse>) => value.data),
  postUsers: ({formData}: { formData: { phone: string; name: string; photo: File | unknown; email: string; position_id: number } }, token:  string ) => axiosService.post(urls.users, formData,{headers:{
    "Token": token,
    'Content-Type': 'multipart/form-data',
  }}).then((value:AxiosResponse<ApiResponse>) => value.data),
  getPositions: () => axiosService.get(urls.positions).then((value:AxiosResponse<PositionsResponse>) => value.data),
  getToken: () => axiosService.get(urls.token).then((value:AxiosResponse<{success:boolean, token: string;}>) => value.data),
};
