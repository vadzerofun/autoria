using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Application.Interfaces;
using Application.DTOs;
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

        public CarsController(ICarService carService, IConfiguration configuration)
        {
            _carService = carService;
            _configuration = configuration;
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
            catch(Exception ex)
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
        public async Task<IActionResult> AddCar([FromForm] Cars carDTO, [FromForm] IFormFile[] ImageFiles)
        {
            carDTO.ImagesPath = await UploadImages(ImageFiles.ToList());
            await _carService.AddCar(carDTO);
            return CreatedAtAction(nameof(AddCar), carDTO);
        }

        // DELETE: api/Cars/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            await _carService.DeleteCarById(id);
            return Ok();
        }
        //[HttpGet("Validat3eToken")]
        //public async Task<bool> Validat3eToken(string token)
        //{
        //    var authOptions = _configuration.GetSection("AuthOption").Get<AuthOption>();
        //    var JWT = JWTtokenService(authOptions);
        //    return  
        //}

        [HttpPost("EditCar")]
        public async Task<IActionResult> EditCar([FromForm] Guid id, [FromForm] Cars carDTO, [FromForm] IFormFile[] ImageFiles)
        {
            carDTO.ImagesPath = await UploadImages(ImageFiles.ToList());
            await _carService.EditCar(id, carDTO);
            return Ok();
        }

        [HttpPost("AddImageToCar")]
        public async Task<IActionResult> AddImageToCar(Guid id, IFormFile ImageFile)
        {
            string ImagesPath = await UploadImage(ImageFile);
            await _carService.AddImageToCar(id, ImagesPath);
            return Ok();
        }

        [HttpDelete("DeleteImageFromCar")]
        public async Task<IActionResult> DeleteImageFromCar(Guid id, string ImageName)
        {
            await _carService.DeleteImageFromCar(id, ImageName);
            return Ok();
        }

        private async Task<List<string>> UploadImages(List<IFormFile> files)
        {
            var _imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
            var filePaths = new List<string>();

            foreach (var file in files)
            {
                if (file == null || file.Length == 0)
                {
                    throw new ArgumentException("One or more files are invalid.");
                }

                var fileExtension = Path.GetExtension(file.FileName);
                var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
                var filePath = Path.Combine(_imageFolderPath, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                filePaths.Add(uniqueFileName);
            }

            return filePaths;
        }

        private async Task<string> UploadImage(IFormFile file)
        {
            var _imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");

            if (file == null || file.Length == 0)
                throw new ArgumentException("file is invalid.");

            var fileExtension = Path.GetExtension(file.FileName);
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(_imageFolderPath, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return uniqueFileName;
        }

    }
}
