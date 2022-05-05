using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TracerCafe.Data.DTO;
using TracerCafe.Data.Entities;

namespace APITracer.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Customer, CustomerDto>().ReverseMap(); ;
        }
    }
}
