
import axios, { AxiosResponse } from 'axios';
import { setupInterceptorsTo } from './Interceptors'
require('dotenv').config(); 
const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 100000,
});

const responseBody = (response: AxiosResponse) => response.data;

export  const requests = {
	get: async (url: string, body: {}): Promise<AxiosResponse> => {
		setupInterceptorsTo(instance);
		return await instance.get(url,
			{
				params: body
			}).then(responseBody);
	},
	post: async (url: string, body: {}): Promise<AxiosResponse> => {
		setupInterceptorsTo(instance);
		return await instance.post(url, body).then(responseBody);
	},
	put: async (url: string, body: {}): Promise<AxiosResponse> => {
		setupInterceptorsTo(instance);
		return await instance.put(url, body).then(responseBody);
	},
	delete: async (url: string, body: {}): Promise<AxiosResponse> => {
		setupInterceptorsTo(instance);
		return await instance.delete(url,
			{
				params: body
			}).then(responseBody);
	}

};