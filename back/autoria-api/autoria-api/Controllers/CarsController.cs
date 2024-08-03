using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Application.Interfaces;
using Application.Services;
using Application.Model;
using Core.Models;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarService _carService;
        private readonly IConfiguration _configuration;
        private readonly IImageUploader _imageUploader;

        public CarsController(ICarService carService, IConfiguration configuration, IImageUploader imageUploader)
        {
            _carService = carService;
            _configuration = configuration;
            _imageUploader = imageUploader;
        }
        // GET: api/Cars
        [AllowAnonymous]
        [HttpGet]
        public async Task<List<Cars>> GetCars()
        {
            var car = await _carService.GetCars();
            return car;
        }
        // GET: api/Cars/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<Cars> GetCarById(Guid id)
        {
            var car = await _carService.GetCarById(id);
            return car;
        }
        [AllowAnonymous]
        [HttpGet("GetCarByMark")]
        public async Task<Result<List<Cars>>> GetCarByMark(string mark)
        {
            try
            {
                var cars = await _carService.GetCarByMark(mark);
                return Result<List<Cars>>.Success(cars);
            }
            catch (Exception ex)
            {
                return Result<List<Cars>>.Failure(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("GetCarsForYou")]
        public async Task<Result<List<Cars>>> GetCarsForYou()
        {
            try
            {
                var cars = await _carService.GetCarsForYou();
                return Result<List<Cars>>.Success(cars);
            }
            catch (Exception ex)
            {
                return Result<List<Cars>>.Failure(ex.Message);
            }
        }
        [AllowAnonymous]
        [HttpGet("GetCarsByFilter")]
        public async Task<Result<List<Cars>>> GetCarsByFilter(CarFilter carFilter)
        {
            try
            {
                var cars = await _carService.GetCarByFilter(carFilter);
                return Result<List<Cars>>.Success(cars);
            }
            catch (Exception ex)
            {
                return Result<List<Cars>>.Failure(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("AddCar")]
        public async Task<IActionResult> AddCar([FromForm] Cars car, [FromForm] IFormFile[] ImageFiles)
        {
            car.ImagesPath = await _imageUploader.UploadImages(ImageFiles.ToList());
            await _carService.AddCar(car);
            return CreatedAtAction(nameof(AddCar), car);
        }

        // DELETE: api/Cars/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            await _carService.DeleteCarById(id);
            return Ok();
        }

        [HttpPost("EditCar")]
        public async Task<IActionResult> EditCar([FromForm] Guid id, [FromForm] Cars carDTO, [FromForm] IFormFile[] ImageFiles)
        {
            carDTO.ImagesPath = await _imageUploader.UploadImages(ImageFiles.ToList());
            await _carService.EditCar(id, carDTO);
            return Ok();
        }

        [HttpPost("AddImageToCar")]
        public async Task<IActionResult> AddImageToCar(Guid id, IFormFile ImageFile)
        {
            string ImagesPath = await _imageUploader.UploadImage(ImageFile);
            await _carService.AddImageToCar(id, ImagesPath);
            return Ok();
        }

        [HttpDelete("DeleteImageFromCar")]
        public async Task<IActionResult> DeleteImageFromCar(Guid id, string ImageName)
        {
            await _carService.DeleteImageFromCar(id, ImageName);
            return Ok();
        }
        [HttpGet("GetMostProfitable")]
        public async Task<Result<List<Cars>>> GetMostProfitable()
        {
            try
            {
                var cars = await _carService.GetMostProfitable();
                return Result<List<Cars>>.Success(cars);
            }
            catch (Exception ex)
            {
                return Result<List<Cars>>.Failure(ex.Message);
            }
        }
        [HttpGet("ViewCar")]
        public async Task<Result> ViewCar(Guid CarId)
        {
            var res = await _carService.ViewCar(CarId);
            return res;
        }
    }
}
