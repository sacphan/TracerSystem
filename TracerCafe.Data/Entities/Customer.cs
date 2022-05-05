using System;
using System.Collections.Generic;
using System.Text;

namespace TracerCafe.Data.Entities
{
    public class Customer
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string Address3 { get; set; }

        public string Address4 { get; set; }

        public string PostCode { get; set; }

        public string Telephone { get; set; }

        public int Age { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime ModifyDate { get; set; }

        public bool isDeleted { get; set; }


    }
}
