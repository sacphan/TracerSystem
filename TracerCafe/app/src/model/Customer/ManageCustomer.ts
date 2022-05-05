
export interface ICustomer
{
    id: string,
    title: string,
    firstName: string,
    surname: string,
    address1: string,
    address2: string,
    address3: string,
    address4: string,
    postCode: string,
    telephone: string,
    age: number

}
export interface ICustomerData {
    totalCustomer: number;
    totalPage: number;
    page: number;

    customers: ICustomer[];
}