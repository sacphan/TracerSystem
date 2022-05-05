using System;
using System.Collections.Generic;
using System.Text;

namespace TracerCafe.Data.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public DateTime CreateDate { get; set; }
        public double Discount { get; set; }

    }
}
