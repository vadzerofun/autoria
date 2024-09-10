using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarksController : ControllerBase
    {
        private readonly IMarksService _marksService;

        public MarksController(IMarksService marksService)
        {
            _marksService = marksService;
        }

        //[Authorize]
        [HttpGet("GetMarks")]
        public async Task<IActionResult> GetMarks()
        {
            var result = await _marksService.GetMarksAsync();
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }
            return BadRequest(result.ErrorMessage);
        }

        //[Authorize]
        [HttpPost("AddMark")]
        public async Task<IActionResult> AddMark([FromBody] Marks mark)
        {
            mark.Id = Guid.NewGuid();
            var result = await _marksService.AddMarkAsync(mark);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result.ErrorMessage);
        }

        //[Authorize]
        [HttpDelete("RemoveMark/{id}")]
        public async Task<IActionResult> RemoveMark(Guid id)
        {
            var result = await _marksService.RemoveMarkAsync(id);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return NotFound(result.ErrorMessage);
        }
    }
}
