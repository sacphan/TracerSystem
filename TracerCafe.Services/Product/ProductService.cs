using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TracerCafe.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace TracerCafe.Services.Product
{

    public class ProductService : BaseService, IProductService
    {
        public ProductService(TracerCafeContext context) : base(context)
        {

        }
        public async Task<List<Data.Entities.Product>> GetListProduct(DayOfWeek today)
        {
            var product = await _context.Products.ToListAsync();
            if (today == DayOfWeek.Saturday)
            {
                foreach (var item in product)
                {
                    item.Price = Convert.ToDouble(String.Format("{0:0.000}", (item.Price / 100) * (100 - item.Discount)));
                }
            }
            return product;
        }

        public async Task<bool> AddOrUpdateUserCart(Guid productId, int quantity, Guid userId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == productId);
            if (product != null)
            {
                if (product.Quantity >= quantity) 
                {
                    var listCartItem = await _context.CartItems.Where(c => c.UserId == userId && c.Active).ToListAsync();
                    var cartItemExist = listCartItem.FirstOrDefault(c => c.ProductId == productId && c.UserId == userId && c.Active);
                    if (cartItemExist != null)
                    {
                        if (product.Quantity >= (cartItemExist.Quantity + quantity))
                        {
                            cartItemExist.Quantity = cartItemExist.Quantity + quantity;
                            cartItemExist.UpdatedDate = DateTime.Now;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        var cartItem = new Data.Entities.CartItem()
                        {
                            UpdatedDate = DateTime.Now,
                            CreatedDate = DateTime.Now,
                            Id = Guid.NewGuid(),
                            ProductId = product.Id,
                            Quantity = quantity,
                            UserId = userId,
                            Active = true
                        };
                        await _context.CartItems.AddAsync(cartItem);
                    }
                    
                    if (await _context.SaveChangesAsync() >= 0)
                    {
                        return true;
                    }

                }

            }
            return false;

        }
    }
}
