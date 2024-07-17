using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Application.Interfaces;
using Application.DTOs;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        // GET: api/Cars
        [HttpGet]
        public async Task<List<CarDTO>> GetCars()
        {
            var car = await _carService.GetCars();
            return car;
        }

        // GET: api/Cars/5
        [HttpGet("{id}")]
        public async Task<CarDTO> GetCarById(int id)
        {
            var car = await _carService.GetCarById(id);
            return car;
        }

        [HttpPost("AddCar")]
        public async Task<IActionResult> AddCar(CarDTO carDTO)
        {
            await _carService.AddCar(carDTO);
            return CreatedAtAction(nameof(AddCar), carDTO);
        }

        // DELETE: api/Cars/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            await _carService.DeleteCarById(id);
            return Ok();
        }

        [HttpPost("EditCar")]
        public async Task<IActionResult> EditCar(int id, CarDTO carDTO)
        {
            await _carService.EditCar(id, carDTO);
            return Ok();
        }
    }
}
