using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TracerCafe.Data.DTO;
using TracerCafe.Data.Entities;
using TracerCafe.Data.Model.Customer;
using TracerCafe.Services.Customer;

namespace APITracer.Controllers
{

    [ApiController]
    public class CustomerController : BaseController
    {
        private readonly ICustomerService _customerservice;

        public CustomerController(ICustomerService customerService, IMapper mapper) : base(mapper)
        {
            _customerservice = customerService;
        }

        [HttpPost("SearchByFilter")]
        public async Task<IActionResult> SearchByFilter(SearchCustomerFilter searchcustomerfilter)
        {
            var totalRow = 0;
            var totalPage = 0;

            var customers = await _customerservice.SearchByFilter(searchcustomerfilter);
            if (customers.Any())
            {
                totalRow = await _customerservice.CountCustomer(searchcustomerfilter);
                totalPage = (int)Math.Ceiling((float)totalRow / searchcustomerfilter.Top);
            }
            
            var data = _mapper.Map<List<CustomerDto>>(customers);
            return Ok(new ResultSearchCustomer {Customers= data, Page= searchcustomerfilter.Page ,TotalCustomer= totalRow ,TotalPage = totalPage });
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer(Customer customer)
        {
            var result = await _customerservice.CreateCustomer(customer);
            var data = _mapper.Map<CustomerDto>(result.Data);
            return Ok(data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCustomer(Customer customer)
        {
            var result = await _customerservice.UpdateCustomer(customer);
            var data = _mapper.Map<CustomerDto>(result.Data);
            return Ok(data);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var result = await _customerservice.DeleteCustomer(id);
            return Ok(result);
        }
    }

    public class ResultSearchCustomer
    {
        public int TotalCustomer { get; set; }
        public int TotalPage { get; set; }
        public int Page { get; set; }
        public List<CustomerDto> Customers { get; set; }
    }
}
