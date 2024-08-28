using Core.Models;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;
using Microsoft.Extensions.Options;
using Application.Model;
using Stripe;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Infrastructure.Data;
using Application.Interfaces;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayController : ControllerBase
    {
        public readonly IOptions<PayOptions> _PubKey;
        public readonly IUserService _userService;

        public PayController(IOptions<PayOptions> pubKey, IUserService userService)
        {
            _PubKey = pubKey;
            _userService = userService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CheckoutOrder([FromBody] long price, [FromServices] IServiceProvider sp)
        {
            var referer = Request.Headers.Referer;
            var UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (UserId == null) return BadRequest("No such User");
            //s_wasmClientURL = referer[0];

            // Build the URL to which the customer will be redirected after paying.
            var server = sp.GetRequiredService<IServer>();

            var serverAddressesFeature = server.Features.Get<IServerAddressesFeature>();

            string? thisApiUrl = null;

            if (serverAddressesFeature is not null)
            {
                thisApiUrl = serverAddressesFeature.Addresses.FirstOrDefault();
            }

            if (thisApiUrl is not null)
            {
                var sessionId = await CheckOut(thisApiUrl, price, UserId);

                var checkoutOrderResponse = new CheckoutOrderResponse()
                {
                    SessionId = sessionId,
                    PubKey = _PubKey.Value.PubKey
                };

                return Ok(checkoutOrderResponse);
            }
            else
            {
                return StatusCode(500);
            }
        }

        [NonAction]
        public async Task<string> CheckOut(string thisApiUrl, long PriceUSDCents, string UserId)
        {
            StripeConfiguration.ApiKey = _PubKey.Value.SecretKey;
            // Create a payment flow from the items in the cart.
            // Gets sent to Stripe API.
            var options = new SessionCreateOptions
            {
                // Stripe calls the URLs below when certain checkout events happen such as success and failure.
                SuccessUrl = $"{thisApiUrl}/checkout/success?sessionId=" + "{CHECKOUT_SESSION_ID}", // Customer paid.
                CancelUrl = "https://google.com" + "failed",  // Checkout cancelled.
                PaymentMethodTypes = new List<string> // Only card available in test mode?
            {
                "card"
            },
                LineItems = new List<SessionLineItemOptions>
            {
                new()
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = PriceUSDCents, // Price is in USD cents.
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
                Mode = "payment", // One-time payment. Stripe supports recurring 'subscription' payments.
                Metadata = new Dictionary<string, string>
                {
                    { "UserId", UserId }
                }
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return session.Id;
        }

        [HttpPost("Webhook")]
        public async Task<IActionResult> WebHook()
        {
            //var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            //try
            //{
            //    var stripeEvent = EventUtility.ConstructEvent(json,
            //        Request.Headers["Stripe-Signature"], "whsec_1765b20b614d2be52f6d3d51e8a95906e2e74e608b9ad63618c4bdb92a7a5556");

            //    // Handle the event
            //    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);

            //    return Ok();
            //}
            //catch (StripeException e)
            //{
            //    return BadRequest();
            //}
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], "whsec_jGjMp0VEVqKXQOmg5u7mq2mdR2wRx3mR");

                // Перевіряємо тип події
                if (stripeEvent.Type == "checkout.session.completed")
                {
                    var session = stripeEvent.Data.Object as Stripe.Checkout.Session;

                    if (session != null)
                    {
                        // Логіка для оновлення балансу користувача
                        var userId = session.Metadata["UserId"]; // Отримай userId, використовуючи, наприклад, Metadata з сесії
                        var amount = session.AmountTotal; // Сума в доларах, якщо Stripe повертає в центах

                        // Оновлення балансу користувача
                        var user = (await _userService.GetUserById(Guid.Parse(userId))).Value;
                        user.Balance += amount ?? 0;
                        await _userService.EditUser(user.Id, user);
                    }
                }

                // Логування інших подій, якщо потрібно
                Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);

                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest();
            }
        }

        private string GetUserIdFromSession(Session session)
        {
            // Якщо ти передаєш userId через Metadata при створенні сесії, то отримаєш його так:
            if (session.Metadata.TryGetValue("userId", out var userId))
            {
                return userId;
            }

            // Інший спосіб отримання userId залежить від реалізації
            return string.Empty;
        }
    }
}
