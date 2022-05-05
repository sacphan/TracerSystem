using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TracerCafe.Data.DTO;
using TracerCafe.Data.Entities;
using TracerCafe.Data.Model;
using TracerCafe.Data.Model.Customer;
using TracerCafe.Services.Customer;

namespace TracerCafe.Controllers
{
    public class CustomerController : BaseController
    {
        private readonly ICustomerService _customerservice;

        public CustomerController(ICustomerService customerService, IMapper mapper) : base(mapper)
        {
            _customerservice = customerService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<PartialViewResult> SearchByFilter(SearchCustomerFilter searchcustomerfilter)
        {
                var totalRow = 0;
                var totalPage = 0;

                var customers =await _customerservice.SearchByFilter(searchcustomerfilter);
                if (customers.Any())
                {
                    totalRow = await _customerservice.CountCustomer(searchcustomerfilter);
                    totalPage = (int)Math.Ceiling((float)totalRow / searchcustomerfilter.Top);
                }

                ViewBag.TotalRow = totalRow;
                ViewBag.TotalPage = totalPage;
                ViewBag.Page = searchcustomerfilter.Page;

                var data =  _mapper.Map<List<CustomerDto>>(customers);
                return PartialView("_PartialListCustomer", data);       
        }

        [HttpPost]
        public async Task<IActionResult> Insert(CustomerDto customerDto)
        {
            var err = new ErrorObject(Error.SUCCESS);
            if (ModelState.IsValid)
            {
                var customer = _mapper.Map<Customer>(customerDto);
                err = await _customerservice.CreateCustomer(customer);
            }
            else
            {
                var message = string.Join(" | ", ModelState.Values
                                        .SelectMany(v => v.Errors)
                                        .Select(e => e.ErrorMessage)
                                        );
                err.Failed(message);

            }
            return Json(err);
        }

        [HttpPut]
        public async Task<IActionResult> Update(CustomerDto customerDto)
        {
            var err = new ErrorObject(Error.SUCCESS);
            if (ModelState.IsValid)
            {
                var customer = _mapper.Map<Customer>(customerDto);
                err = await _customerservice.UpdateCustomer(customer);
            }
            else
            {
                var message = string.Join(" | ", ModelState.Values
                                        .SelectMany(v => v.Errors)
                                        .Select(e => e.ErrorMessage)
                                        );
                err.Failed(message);

            }
            return Json(err);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid Id)
        {
            return Json(await _customerservice.DeleteCustomer(Id));
        }
    }
}
