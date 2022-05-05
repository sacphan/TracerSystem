using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TracerCafe.Data;
using TracerCafe.Data.Model;
using TracerCafe.Data.Model.Customer;

namespace TracerCafe.Services.Customer
{
    public class CustomerService : BaseService, ICustomerService
    {
        public CustomerService(TracerCafeContext context) : base(context)
        {

        }

        //public async Task CreateDummyData()
        //{
        //    var listCustomer = new List<Data.Entities.Customer>();
        //    for (int i = 0; i < 20; i++)
        //    {
        //        var customer = new Data.Entities.Customer()
        //        {
        //            Title = $"Title {i + 1}",
        //            FirstName = $"FirstName {i + 1}",
        //            Surname = $"Surname {i + 1}",
        //            Address1 = $"Address1 {i + 1}",
        //            Address2 = $"Address2 {i + 1}",
        //            Address3 = $"Address3 {i + 1}",
        //            Address4 = $"Address4 {i + 1}",
        //            PostCode = $"PostCode {i + 1}",
        //            Telephone = $"036499048{i}",
        //            Age = i + 18,
        //            CreateDate = DateTime.UtcNow,
        //            Id = Guid.NewGuid()
        //        };
        //        listCustomer.Add(customer);


        //    }
        //    await _context.Customers.AddRangeAsync(listCustomer);
        //    await _context.SaveChangesAsync();
        //}

        public async Task<List<Data.Entities.Customer>> SearchByFilter(SearchCustomerFilter SearchCustomerFilter)
        {        
            var keyword = SearchCustomerFilter.Keyword?.ToLower();
            return await _context.Customers.Where(c => (
            c.Title.ToLower().Contains(keyword)
            || c.FirstName.ToLower().Contains(keyword)
            || c.Surname.ToLower().Contains(keyword)
            || c.PostCode.ToLower().Contains(keyword)
            || c.Telephone.ToLower().Contains(keyword)
            || keyword == null)
            && c.isDeleted == false)
               .OrderByDescending(c => c.CreateDate)
               .Skip((SearchCustomerFilter.Page - 1) * SearchCustomerFilter.Top)
               .Take(SearchCustomerFilter.Top)
               .ToListAsync();
        }

        public async Task<int> CountCustomer(SearchCustomerFilter SearchCustomerFilter)
        {
            var keyword = SearchCustomerFilter.Keyword?.ToLower();
            return await _context.Customers.Where(c => (
            c.Title.ToLower().Contains(keyword)
            || c.FirstName.ToLower().Contains(keyword)
            || c.Surname.ToLower().Contains(keyword)
            || c.PostCode.ToLower().Contains(keyword)
            || c.Telephone.ToLower().Contains(keyword)
            || keyword == null)
            && c.isDeleted == false)
               .CountAsync();
        }

        public async Task<ErrorObject> CreateCustomer(Data.Entities.Customer customer)
        {
            var err = new ErrorObject(Error.SUCCESS);
            var phoneExist = await _context.Customers.AnyAsync(c => c.Telephone.Equals(customer.Telephone) && !c.isDeleted);
            if (!phoneExist)
            {
                customer.Id = Guid.NewGuid();
                customer.CreateDate = DateTime.UtcNow;
                await _context.Customers.AddAsync(customer);
                if (await _context.SaveChangesAsync() < 0)
                {
                    err.Failed("Create customer failed!");
                }
                err.SetData(customer);
            }
            else
            {
                err.Failed("Phone exist!");
            }
            return err;
        }

        public async Task<ErrorObject> UpdateCustomer(Data.Entities.Customer customer)
        {
            var err = new ErrorObject(Error.SUCCESS);
            var existPhone = await _context.Customers.AnyAsync(c => c.Telephone.Equals(customer.Telephone) && c.Id != customer.Id && !c.isDeleted);
            if (!existPhone)
            {
                var existCustomer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == customer.Id && !c.isDeleted);
                if (existCustomer != null)
                {
                    existCustomer.Title = customer.Title;
                    existCustomer.FirstName = customer.FirstName;
                    existCustomer.Surname = customer.Surname;
                    existCustomer.PostCode = customer.PostCode;
                    existCustomer.Age = customer.Age;
                    existCustomer.Address1 = customer.Address1;
                    existCustomer.Address2 = customer.Address2;
                    existCustomer.Address3 = customer.Address3;
                    existCustomer.Address4 = customer.Address4;
                    existCustomer.Telephone = customer.Telephone;
                    existCustomer.ModifyDate = DateTime.UtcNow;
                    if (await _context.SaveChangesAsync() < 0)
                    {
                        err.Failed("Update customer failed!");
                    }
                    else
                    {
                        err.SetData(existCustomer);
                    }    
                }
                else
                {
                    err.Failed("Customer isn't exist!");
                }
            }
            else
            {
                err.Failed("Phone is exist");
            }
            return err;
        }

        public async Task<ErrorObject> DeleteCustomer(Guid Id)
        {
            var err = new ErrorObject(Error.SUCCESS);
            var exits = await _context.Customers.FirstOrDefaultAsync(c => c.Id == Id);
            if (exits != null)
            {
                exits.isDeleted = true;
                if (await _context.SaveChangesAsync() < 0)
                {
                    err.Failed("Delete customer failed!");
                }
                err.SetData(exits.Id);
            }
            else
            {
                err.Failed("Customer isn't exist!");
            }
            return err;
        }
    }
}
