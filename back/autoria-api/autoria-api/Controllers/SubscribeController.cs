using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Model;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscribeController : ControllerBase
    {
        private readonly ISubscribeService _subscribeService;

        public SubscribeController(ISubscribeService subscribeService)
        {
            _subscribeService = subscribeService;
        }

        [HttpGet]
        public async Task<Result<List<Subscribe>>> GetSubscribes()
        {
            var subscribes = await _subscribeService.GetSubscribes();
            if (subscribes.IsSuccess)
            {
                return Result<List<Subscribe>>.Success(subscribes.Value);
            }
            return Result<List<Subscribe>>.Failure(subscribes.ErrorMessage);
        }

        [HttpGet("{id}")]
        public async Task<Result<Subscribe>> GetSubscribe(Guid id)
        {
            var subscribe = await _subscribeService.GetSubscribe(id);
            if (subscribe.IsSuccess)
            {
                return Result<Subscribe>.Success(subscribe.Value);
            }
            return Result<Subscribe>.Failure(subscribe.ErrorMessage);
        }

        [HttpPost("AddSubscribe")]
        public async Task<IActionResult> AddSubscribe([FromBody] Subscribe subscribe)
        {
            subscribe.Id = Guid.NewGuid();
            var result = await _subscribeService.AddSubscribe(subscribe);
            if (result.IsSuccess)
            {
                return Ok();
            }
            return BadRequest(result.ErrorMessage);
        }

        [HttpDelete("{id}")]
        public async Task<Result> RemoveSubscribe(Guid id)
        {
            var result = await _subscribeService.RemoveSubscribe(id);
            if (result.IsSuccess)
            {
                return Result.Success();
            }
            return Result.Failure(result.ErrorMessage);
        }
    }
}
