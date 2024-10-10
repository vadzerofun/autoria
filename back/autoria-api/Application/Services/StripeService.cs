using Application.Interfaces;
using Application.Model;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class StripeService : IPaymentService
    {
        public readonly IOptions<PayOptions> _PubKey;
        public readonly IUserService _userService;
        public StripeService(IOptions<PayOptions> pubKey, IUserService userService)
        {
            _PubKey = pubKey;
            _userService = userService;
        }
        public async Task<Result<CheckoutOrderResponse>> CheckoutOrder(long price, string SucsessLink, string BadLink, double Course, IServiceProvider sp, Guid UserId)
        {
            var server = sp.GetRequiredService<IServer>();

            var serverAddressesFeature = server.Features.Get<IServerAddressesFeature>();

            long ukrprice = (long)(price * Course);

            string? thisApiUrl = null;

            if (serverAddressesFeature is not null)
            {
                thisApiUrl = serverAddressesFeature.Addresses.FirstOrDefault();
            }

            if (thisApiUrl is not null)
            {
                var sessionId = await CheckOut(thisApiUrl, ukrprice, UserId.ToString(), SucsessLink, BadLink);

                var checkoutOrderResponse = new CheckoutOrderResponse()
                {
                    SessionId = sessionId,
                    PubKey = _PubKey.Value.PubKey
                };

                return Result<CheckoutOrderResponse>.Success(checkoutOrderResponse);
            }
            else
            {
                return Result<CheckoutOrderResponse>.Failure("500");
            }
        }

        public async Task<Result> WebHook(string json, HttpRequest Request)
        {
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json,
                     Request.Headers["Stripe-Signature"], "whsec_jGjMp0VEVqKXQOmg5u7mq2mdR2wRx3mR");

                if (stripeEvent.Type == "checkout.session.completed")
                {
                    var session = stripeEvent.Data.Object as Stripe.Checkout.Session;

                    if (session != null)
                    {
                        var userId = session.Metadata["UserId"];
                        var amount = session.AmountTotal;

                        var user = (await _userService.GetUserById(Guid.Parse(userId))).Value;
                        user.Balance += amount ?? 0;
                        await _userService.EditUser(user.Id, user);
                    }
                }

                Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);

                return Result.Success();
            }
            catch (StripeException e)
            {
                return Result.Failure(e.Message);
            }
        }
        private async Task<string> CheckOut(string thisApiUrl, long PriceUSDCents, string UserId, string SucsessLink, string BadLink)
        {
            StripeConfiguration.ApiKey = _PubKey.Value.SecretKey;
            var options = new SessionCreateOptions
            {
                SuccessUrl = SucsessLink,
                CancelUrl = BadLink,
                PaymentMethodTypes = new List<string>
                {
                    "card"
                },
                LineItems = new List<SessionLineItemOptions>
                {
                    new()
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = PriceUSDCents,
                            Currency = "USD",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = "Test Name",
                                Description = "Test Description",
                                Images = new List<string> { "https://img.freepik.com/free-photo/beautiful-kitten-with-colorful-clouds_23-2150752964.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723507200&semt=ais_hybrid" }
                            },
                        },
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                Metadata = new Dictionary<string, string>
                    {
                        { "UserId", UserId }
                    }
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return session.Id;
        }
    }
}
