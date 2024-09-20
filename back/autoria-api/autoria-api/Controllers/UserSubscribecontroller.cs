using Application.Interfaces;
using Application.Model;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSubscribeController : ControllerBase
    {
        private readonly IUserSubscribeService _userSubscribeService;

        public UserSubscribeController(IUserSubscribeService userSubscribeService)
        {
            _userSubscribeService = userSubscribeService;
        }

        //[Authorize]
        [HttpPost("AddUserSubscribe")]
        public async Task<IActionResult> AddUserSubscribe([FromBody] UserSubscribe userSubscribe)
        {
            var result = await _userSubscribeService.AddUserSubscribe(userSubscribe);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result.ErrorMessage);
        }

        //[Authorize]
        [HttpPost("BuyUserSubscribe")]
        public async Task<IActionResult> BuyUserSubscribe([FromBody] UserSubscribe userSubscribe)
        {
            var result = await _userSubscribeService.BuyUserSubscribe(userSubscribe);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result.ErrorMessage);
        }

        //[Authorize]
        [HttpGet("GetUserSubscribe/{id}")]
        public async Task<IActionResult> GetUserSubscribe(Guid id)
        {
            var result = await _userSubscribeService.GetUserSubscribe(id);
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }
            return NotFound(result.ErrorMessage);
        }

        //[AllowAnonymous]
        [HttpGet("GetUserSubscribes")]
        public async Task<IActionResult> GetUserSubscribes()
        {
            var result = await _userSubscribeService.GetUserSubscribes();
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.ErrorMessage);
        }

        [AllowAnonymous]
        [HttpGet("GetTopCars")]
        public async Task<IActionResult> GetToopCarsId()
        {
            var result = await _userSubscribeService.GetTopCarsId();
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.ErrorMessage);
        }

        [HttpGet("GetUserSubscribesByUserId")]
        public async Task<IActionResult> GetUserSubscribesByUserId(Guid userId)
        {
            var result = await _userSubscribeService.GetUserSubscribesByUserIdAsync(userId);
            if (!result.IsSuccess)
            {
                return BadRequest(result.ErrorMessage);
            }

            return Ok(result.Value);
        }
    }
}
