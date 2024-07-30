using SendGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IEmailService
    {
        Task<Response> SendEmail(string Email, string plainTextContent, string htmlContent, string subject);
    }
}
