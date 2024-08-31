using Application.Interfaces;
using Application.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using System.Security.Claims;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayController : ControllerBase
    {
        public readonly IPaymentService _paymentService;

        public PayController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CheckoutOrder([FromBody] long price, [FromServices] IServiceProvider sp)
        {
            var UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (UserId == null) return BadRequest("No such User");

            var res = await _paymentService.CheckoutOrder(price, sp, Guid.Parse(UserId));
            if (res.IsSuccess)
            {
                return Ok(res.Value);
            }
            return BadRequest(res.ErrorMessage);
        }


        [HttpPost("Webhook")]
        public async Task<IActionResult> WebHook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var res = await _paymentService.WebHook(json, Request);
            if (res.IsSuccess)
            {
                return Ok();
            }
            return BadRequest(res.ErrorMessage);
        }
    }
}
