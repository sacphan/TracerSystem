using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TracerCafe.Data.Model;
using TracerCafe.Data.Model.Customer;

namespace TracerCafe.Services.Customer
{
    public interface ICustomerService
    {
        Task<List<Data.Entities.Customer>> SearchByFilter(SearchCustomerFilter SearchCustomerFilter);

        Task<int> CountCustomer(SearchCustomerFilter SearchCustomerFilter);

        Task<ErrorObject> CreateCustomer(Data.Entities.Customer customer);

        Task<ErrorObject> UpdateCustomer(Data.Entities.Customer customer);

        Task<ErrorObject> DeleteCustomer(Guid Id);
    }
}
