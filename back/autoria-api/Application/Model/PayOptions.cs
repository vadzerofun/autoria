using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Model
{
    public class PayOptions
    {
        public string SecretKey { get; set; }
        public string PubKey { get; set; }
        public string StripeSignature {  get; set; }
    }
}
