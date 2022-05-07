import {Reducer} from 'redux'
import {ICustomer, ICustomerData} from '../../model/Customer/ManageCustomer'
import {CustomerActions} from '../../modules/Customer/customer.action'
import {CustomerActionTypes} from '../../modules/Customer/customer.type'
import {ISearchCustomerByFilter} from '../../model/Customer/SearchCustomerByFilter'

export interface ICustomerState {
    readonly customerData: ICustomerData;
    readonly updateCustomer: ICustomer;
    readonly searchFilter:ISearchCustomerByFilter
}

const initialState: ICustomerState = {
    customerData: null,
    updateCustomer:null,
    searchFilter:{
        Keyword:"",
        Page:1,
        Top:5
    }
};
export const CustomerReducer: Reducer<ICustomerState, CustomerActions> = (state = initialState, action) => {
    switch (action.type) {
        case CustomerActionTypes.GET_ALL_CUSTOMER: {
            return {
                ...state,
                customerData: {...action.customerData}
            };      
        }     
        case CustomerActionTypes.UPDATE_CUSTOMER:{
            const updateCustomer = action.updateCustomer;
            const index = state.customerData.customers.findIndex(c=>c.id===updateCustomer.id)
            let updateCustomerData = state.customerData;          
            updateCustomerData.customers[index] = updateCustomer;

            return {
                ...state,
                customerData: {...state.customerData,customers:[...updateCustomerData.customers]}
            }
        }
        case CustomerActionTypes.DELETE_CUSTOMER:
            const idDeleted = action.idDeleted;
            const updateCustomer = state.customerData.customers.filter((x) => !(idDeleted === x.id))
            return {
                ...state,
                customerData: {...state.customerData,customers:[...updateCustomer]}
            }
        case CustomerActionTypes.UPDATE_SEARCH_FILTER:
            return {
                ...state,
                searchFilter: {...action.searchFilter}
            } 
        default:
            return state;
    }
};