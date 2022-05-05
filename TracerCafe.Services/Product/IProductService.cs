using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TracerCafe.Services.Product
{
    public interface IProductService
    {
        Task<List<Data.Entities.Product>> GetListProduct(DayOfWeek today);
        Task<bool> AddOrUpdateUserCart(Guid productId, int quantity, Guid userId);
    }
}
