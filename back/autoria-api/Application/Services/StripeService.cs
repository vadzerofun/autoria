using Application.Interfaces;
using Application.Model;
using Microsoft.Extensions.Options;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class StripeService : IPaymentService
    {
        private readonly IOptions<string> _secretKey;

        public StripeService(IOptions<string> secretKey)
        {
            _secretKey = secretKey;
            StripeConfiguration.ApiKey = _secretKey.Value;
        }

        public async Task<PaymentResponse> CreateChargeAsync(PaymentRequest request)
        {
            var options = new ChargeCreateOptions
            {
                Amount = request.Amount,
                Currency = "usd",
                Source = request.Source,
                Description = request.Description,
            };

            var service = new ChargeService();
            var charge = await service.CreateAsync(options);

            return new PaymentResponse { ChargeId = charge.Id };
        }
    }
}
