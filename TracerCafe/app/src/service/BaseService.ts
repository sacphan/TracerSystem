import {requests} from '../axios/http-common';
import { AxiosResponse } from 'axios';

export default class BaseService {
    public get = async (url: string, params?: any): Promise<AxiosResponse> => {
        return await requests.get(url,params);      
     }
     public post = async (url: string, params?: any): Promise<AxiosResponse> => {
        return await requests.post(url,params);      
     }
     public put = async (url: string, params?: any): Promise<AxiosResponse> => {
        return await requests.put(url,params);      
     }
     public delete = async (url: string, params?: any): Promise<AxiosResponse> => {
        return await requests.delete(url,params);      
     }
}