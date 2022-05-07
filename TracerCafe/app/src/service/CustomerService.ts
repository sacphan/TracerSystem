import  BaseService  from "./BaseService";
import {ISearchCustomerByFilter} from '../model/Customer/SearchCustomerByFilter'
import {ICustomer} from '../model/Customer/ManageCustomer'
import { AxiosResponse } from 'axios';

export default class CustomerService extends BaseService {
    apiUrl = '/Customer'

    public SearchByFilter(data:ISearchCustomerByFilter):Promise<any>
    {
        return this.post(`${this.apiUrl}/SearchByFilter`,{...data});
    }

    public UpdateCustomer(data:ICustomer):Promise<AxiosResponse>
    {
        return this.put(`${this.apiUrl}`,{...data});
    }

    public DeleteCustomer(id:string ):Promise<any>
    {
        return this.delete(`${this.apiUrl}/${id}`);
    }

    public CreateCustomer(data:ICustomer):Promise<any>
    {      
        return this.post(`${this.apiUrl}`,{...data});
    }
}