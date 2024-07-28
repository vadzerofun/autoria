using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Model
{
    public class SendGridOption
    {
        public string ApiKey { get; set; }
        public string EmailAddress { get; set; }
        public string EmailName { get; set; }
    }
}
