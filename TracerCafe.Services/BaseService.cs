using System;
using System.Collections.Generic;
using System.Text;
using TracerCafe.Data;

namespace TracerCafe.Services
{
    public abstract class BaseService
    {
        protected readonly TracerCafeContext _context;    

        protected BaseService(TracerCafeContext context)
        {
            _context = context;
        }
    }
}
