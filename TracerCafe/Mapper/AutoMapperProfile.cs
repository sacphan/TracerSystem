using AutoMapper;
using TracerCafe.Data.DTO;
using TracerCafe.Data.Entities;

namespace TracerCafe.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public  AutoMapperProfile()
        {
            CreateMap<Customer,CustomerDto>().ReverseMap(); ;
        }
    }
        
}
