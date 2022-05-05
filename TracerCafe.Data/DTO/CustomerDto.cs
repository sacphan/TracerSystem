using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TracerCafe.Data.DTO
{
    public class CustomerDto
    {
        public Guid? Id { get; set; }

        [Required]
        public string Title { get; set; }


        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public string Address3 { get; set; }

        public string Address4 { get; set; }

        [Required]
        public string PostCode { get; set; }

        [Required]
        [RegularExpression(@"^(\(?(0|\+44)[1-9]{1}\d{1,4}?\)?\s?\d{3,4}\s?\d{3,4})$", ErrorMessage = "Please specify a valid phone number.")]
        public string Telephone { get; set; }

        [Required]
        public int Age { get; set; }
    }
}
