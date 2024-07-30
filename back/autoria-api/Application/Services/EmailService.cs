using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using SendGrid.Helpers.Mail;
using SendGrid;
using System.Configuration;
using Microsoft.Extensions.Options;
using Application.Model;

namespace Application.Services
{
    public class EmailService : IEmailService
    {
        private readonly IOptions<SendGridOption> _sendGridOption;
        public EmailService(IOptions<SendGridOption> sendGridOption)
        {
            _sendGridOption = sendGridOption;
        }

        public async Task<Response> SendEmail(string Email, string plainTextContent, string htmlContent, string subject)
        {
            var sendGridOption = _sendGridOption.Value;
            var apiKey = sendGridOption.ApiKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(sendGridOption.EmailAddress, sendGridOption.EmailName);
            var to = new EmailAddress(Email, "User");
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            Response response = await client.SendEmailAsync(msg);
            return response;
        }
    }
}
