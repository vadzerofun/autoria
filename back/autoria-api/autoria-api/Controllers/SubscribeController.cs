using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Model;
using Application.Services;
using Stripe;
using Stripe.Checkout;
using Core.Models;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscribeController : ControllerBase
    {
        private readonly IPaymentService _PaymentService;

        public SubscribeController(IPaymentService paymentService)
        {
            _PaymentService = paymentService;
        }

        [HttpPost("CreatePayment")]
        public async Task<IActionResult> CreatePayment([FromBody] PaymentRequest request)
        {
            if (request == null)
                return BadRequest("Invalid request");

            try
            {
                var result = await _PaymentService.CreateChargeAsync(request);
                return Ok(result);
            }
            catch (StripeException ex)
            {
                return BadRequest(new { Message = ex.StripeError.Message });
            }
        }

        
    }
}
