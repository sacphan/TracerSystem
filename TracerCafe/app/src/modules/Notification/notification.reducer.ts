import { Reducer } from 'redux';
import { NotificationActions  } from './notification.action';
import {NotificationActionTypes} from './notification.type'

export interface INotificationState {
  readonly description: string;
  readonly type: string;
  readonly title:string
}


// Define the initial state
const inintNotificationState: INotificationState = {
  description: '',
  type: '',
  title:''
};

export const notificationReducer: Reducer<INotificationState, NotificationActions> = (
  state = inintNotificationState,
  action
) => {
  
  switch (action.type) {
    
    case NotificationActionTypes.INFO:
    case NotificationActionTypes.SUCCESS:
    case NotificationActionTypes.WARNING:
    case NotificationActionTypes.ERROR:
      debugger
      return {
        ...state,
        description: action.message,
        type: action.type,
        title: action.title
      }
    default:
      return inintNotificationState;
  }

};