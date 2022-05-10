import { requests } from '../axios/http-common';
import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { NotificationActionTypes } from '../modules/Notification/notification.type'
import { ErrorObject } from '../constanst'

export default class BaseService {

   protected dispatch: Dispatch;
   constructor(dispatch: Dispatch) {
      this.dispatch = dispatch
   }
   public get = async (url: string, params?: any): Promise<AxiosResponse> => {
      return await requests.get(url, params)
      // .then((response) => {
      //    this.handleFinally(response)
      //    return response;
      // })
         .catch((err) => {
            return this.handleError(err)
         });
   }

   public post = async (url: string, params?: any): Promise<AxiosResponse> => {
      return await requests.post(url, params)
      // .then((response) => {
      //    this.handleFinally(response)
      //    return response;
      // })
         .catch((err) => {
            return this.handleError(err)
         });
   }

   public put = async (url: string, params?: any): Promise<AxiosResponse> => {
      return await requests.put(url, params)
         // .then((response) => {
         //    this.handleFinally(response)
         //    return response;
         // })
         .catch((err) => {
            return this.handleError(err)
         })
   }

   public delete = async (url: string, params?: any): Promise<AxiosResponse> => {
      return await requests.delete(url, params)
      // .then((response) => {
      //    this.handleFinally(response)
      //    return response;
      // })
         .catch((err) => {
            return this.handleError(err)
         });
   }

   private handleError(err: any) {
      // Do something with response error
      let message = 'Notification.DefaultError';
      if (err.response && err.response.data && (err.response.data.message || err.response.data.Message)) {
         message = err.response.data.message || err.response.data.Message;

         this.dispatch({
            type: NotificationActionTypes.ERROR,
            message: message
         })
      }
      return Promise.reject('Error');
   }

   // private handleFinally(response: any) {
   //    // Do something with response error
   //    debugger
   //    if (response.code == ErrorObject.FAILED) {
   //       this.dispatch({
   //          type: NotificationActionTypes.ERROR,
   //          message: response.message
   //       })
   //    }
   //    else {
   //       this.dispatch({
   //          type: NotificationActionTypes.SUCCESS,
   //          message: 'SUCCESS'
   //       })
   //    }

   // }
}