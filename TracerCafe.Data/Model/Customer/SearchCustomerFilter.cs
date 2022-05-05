using System;
using System.Collections.Generic;
using System.Text;

namespace TracerCafe.Data.Model.Customer
{
    public class SearchCustomerFilter
    {
        public string Keyword { get; set; } = string.Empty;
        public int Top { get; set; } = 5;
        public int Page { get; set; } = 1;
    }
}
