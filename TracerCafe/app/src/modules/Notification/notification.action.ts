import  {NotificationActionTypes} from './notification.type'
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Interface for Get All Action Type
export interface IShowSuccessAction {
type: NotificationActionTypes.SUCCESS;
message: string;
title:string;
}

export interface IShowErrorAction {
type: NotificationActionTypes.ERROR;
message: string;
title:string;
}

export interface IShowWarningAction {
type: NotificationActionTypes.WARNING;
message: string;
title:string;
}

export interface IShowInfoAction {
type: NotificationActionTypes.INFO;
message: string;
title:string;
}

export const UpdateNotificationType:ActionCreator<ThunkAction<Promise<void>, null, null, null>>= (type:string) =>
{
    return async (dispatch :Dispatch):Promise<void>=>{

            dispatch({
                type:type
            })
        
    }
}
export type NotificationActions = IShowErrorAction | IShowSuccessAction | IShowWarningAction | IShowInfoAction;