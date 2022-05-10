import CustomerService from '../../service/CustomerService';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import  {CustomerActionTypes} from './customer.type'
import {ICustomerData,ICustomer} from '../../model/Customer/ManageCustomer'
import {ISearchCustomerByFilter} from '../../model/Customer/SearchCustomerByFilter'
import {ErrorObject} from '../../constanst/index'

export interface ICustomerAction {
    type: CustomerActionTypes.GET_ALL_CUSTOMER;
    customerData: ICustomerData;
}

export interface IUpdateCustomerAction {
    type: CustomerActionTypes.UPDATE_CUSTOMER;
    updateCustomer: ICustomer;
}

export interface IDeleteCustomerAction {
    type: CustomerActionTypes.DELETE_CUSTOMER;
    idDeleted: string;
}

export interface IUpdateSearchFilterAction {
    type: CustomerActionTypes.UPDATE_SEARCH_FILTER;
    searchFilter: ISearchCustomerByFilter;
}

export interface ICreateCustomerAction {
    type: CustomerActionTypes.CREATE_CUSTOMER;
}

export type CustomerActions = ICustomerAction | IUpdateCustomerAction | IDeleteCustomerAction | IUpdateSearchFilterAction

export const SearchByFilter:ActionCreator<ThunkAction<Promise<void>, null, null, null>>= (searchCustomerByFilter:ISearchCustomerByFilter) =>
{
    return async (dispatch :Dispatch):Promise<void>=>{
        var customerService = new CustomerService(dispatch);
        const result =await customerService.SearchByFilter(searchCustomerByFilter);
        if (result.code===ErrorObject.SUCCESS)
        {
            dispatch({
                type:CustomerActionTypes.GET_ALL_CUSTOMER,
                customerData: result.data
            })
        }
    }
}

export const Update:ActionCreator<ThunkAction<Promise<void>, null, null, null>>= (customer:ICustomer) =>
{
    
    return async (dispatch :Dispatch):Promise<void>=>{
        var customerService = new CustomerService(dispatch);
        const result =await customerService.UpdateCustomer(customer);
        if (result.code==ErrorObject.SUCCESS)
        {
            dispatch({
                type:CustomerActionTypes.UPDATE_CUSTOMER,
                updateCustomer: result.data,
            })
        }
        return result;
    }
}

export const Delete:ActionCreator<ThunkAction<Promise<void>, null, null, null>>= (id:string) =>
{
    
    return async (dispatch :Dispatch):Promise<void>=>{  
        var customerService = new CustomerService(dispatch);
        return await customerService.DeleteCustomer(id);       
    }
}

export const UpdateSearchFilter:ActionCreator<ThunkAction<Promise<void>, null, null, null>>= (searchCustomerByFilter:ISearchCustomerByFilter) =>
{
    
    return async (dispatch :Dispatch):Promise<void>=>{
        
        dispatch({
            type:CustomerActionTypes.UPDATE_SEARCH_FILTER,
            searchFilter: searchCustomerByFilter,
        })       
    }
}

export const CreateCustomer:ActionCreator<ThunkAction<Promise<void>, null, null, null>>= (customer:ICustomer) =>
{
    
    return async (dispatch :Dispatch):Promise<void>=>{
        var customerService = new CustomerService(dispatch);
        var result = await customerService.CreateCustomer(customer);
        if (result.code === ErrorObject.SUCCESS)
        {
            dispatch({
                type:CustomerActionTypes.CREATE_CUSTOMER 
            })  
        }
        return result;
             
    }
}


