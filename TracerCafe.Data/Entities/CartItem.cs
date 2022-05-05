using System;
using System.Collections.Generic;
using System.Text;

namespace TracerCafe.Data.Entities
{
    public class CartItem
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        public bool Active { get; set; }
    }
}
