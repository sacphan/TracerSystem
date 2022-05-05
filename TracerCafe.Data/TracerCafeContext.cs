using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TracerCafe.Data.Entities;
using TracerCafe.Data.Model.Customer;

namespace TracerCafe.Data
{
    public class TracerCafeContext: DbContext
    {
        public TracerCafeContext()
        {
        }

        public TracerCafeContext(DbContextOptions<TracerCafeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<CartItem> CartItems { get; set; }


    }
}
