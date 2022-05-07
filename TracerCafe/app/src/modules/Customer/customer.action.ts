import CustomerService from '../../service/CustomerService';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import  {CustomerActionTypes} from './customer.type'
import {ICustomerData,ICustomer} from '../../model/Customer/ManageCustomer'
import {ISearchCustomerByFilter} from '../../model/Customer/SearchCustomerByFilter'

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
        var customerService = new CustomerService();
        const customer =await customerService.SearchByFilter(searchCustomerByFilter);
        if (customer)
        {
            dispatch({
                type:CustomerActionTypes.GET_ALL_CUSTOMER,
                customerData: customer
            })
        }
    }
}

export const Update:ActionCreator<ThunkAction<Promise<void>, null, null, null>>= (customer:ICustomer) =>
{
    
    return async (dispatch :Dispatch):Promise<void>=>{
        debugger
        var customerService = new CustomerService();
        const updateCustomer =await customerService.UpdateCustomer(customer);
        if (updateCustomer)
        {
            dispatch({
                type:CustomerActionTypes.UPDATE_CUSTOMER,
                updateCustomer: updateCustomer,
            })
        }
    }
}

export const Delete:ActionCreator<ThunkAction<Promise<void>, null, null, null>>= (id:string) =>
{
    
    return async (dispatch :Dispatch):Promise<void>=>{
        
        var customerService = new CustomerService();
        await customerService.DeleteCustomer(id);       
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
        var customerService = new CustomerService();
        await customerService.CreateCustomer(customer);
        dispatch({
            type:CustomerActionTypes.CREATE_CUSTOMER

        })       
    }
}


