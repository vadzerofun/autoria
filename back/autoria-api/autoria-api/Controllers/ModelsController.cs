using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModelsController : ControllerBase
    {
        private readonly IModelService _modelService;

        public ModelsController(IModelService modelService)
        {
            _modelService = modelService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllModels()
        {
            var models = await _modelService.GetAllModelsAsync();
            return Ok(models);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetModelById(Guid id)
        {
            var model = await _modelService.GetModelByIdAsync(id);
            if (model == null)
            {
                return NotFound();
            }
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> CreateModel([FromBody] Model model)
        {
            if (ModelState.IsValid)
            {
                await _modelService.CreateModelAsync(model);
                return CreatedAtAction(nameof(GetModelById), new { id = model.Id }, model);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateModel(Guid id, [FromBody] Model model)
        {
            if (id != model.Id)
            {
                return BadRequest("ID mismatch");
            }

            if (ModelState.IsValid)
            {
                await _modelService.UpdateModelAsync(model);
                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModel(Guid id)
        {
            await _modelService.DeleteModelAsync(id);
            return NoContent();
        }
    }
}
