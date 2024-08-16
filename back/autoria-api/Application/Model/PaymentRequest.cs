using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Model
{
    public class PaymentRequest
    {
        public long Amount { get; set; } // сума в центрах
        public string Source { get; set; } // токен карти
        public string Description { get; set; }
        
    }
}
