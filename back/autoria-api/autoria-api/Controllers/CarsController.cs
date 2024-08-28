using Application.Interfaces;
using Application.Model;
using autoria_api.ViewModel;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
        public async Task<IActionResult> AddCar([FromForm] CarInputViewModel carV, [FromForm] IFormFile[] ImageFiles)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return BadRequest("No such authorise User");
            var UserId = Guid.Parse(userId);
            var ImagesPath = await _imageUploader.UploadImages(ImageFiles.ToList());
            var car = CarInputViewModel.ToCars(carV, Guid.NewGuid(), ImagesPath, UserId, DateTime.Now, 0);
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
        public async Task<IActionResult> EditCar([FromForm] Guid id, [FromForm] CarInputViewModel carVM, [FromForm] IFormFile[] ImageFiles)
        {
            var oldCar = (await _carService.GetCarById(id));
            if (oldCar == null)
                return NotFound();
            List<string> ImagesPath;
            if (ImageFiles.Length == 0)
            {
                ImagesPath = oldCar.ImagesPath;
                //await _imageUploader.DeleteImages(oldCar.ImagesPath);
            }
            else
            {
                ImagesPath = oldCar.ImagesPath;
                ImagesPath.AddRange(await _imageUploader.UploadImages(ImageFiles.ToList()));
            }

            var car = CarInputViewModel.ToCars(carVM, id, ImagesPath, oldCar.UserId, oldCar.CreatedTime, oldCar.VisitedCount);
            await _carService.EditCar(id, car);
            return Ok();
        }

        [HttpPost("AddImageToCar")]
        public async Task<IActionResult> AddImageToCar(Guid id, IFormFile[] ImageFile)
        {
            List<string> ImagesPath = await _imageUploader.UploadImages(ImageFile.ToList());
            await _carService.AddImageToCar(id, ImagesPath);
            return Ok();
        }

        [HttpDelete("DeleteImageFromCar")]
        public async Task<IActionResult> DeleteImageFromCar(Guid id, string ImageName)
        {
            await _imageUploader.DeleteImages(new List<string>() { ImageName });
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
        [HttpGet("GetCarsByUserId")]
        public async Task<Result<List<Cars>>> GetCarsByUserId(Guid UserId)
        {
            var res = await _carService.GetCarsByUserId(UserId);
            return res;
        }
        [Authorize]
        [HttpPost("Like")]
        public async Task<Result> Like(Guid Id)
        {
            var UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (UserId == null) return Result.Failure("Bad User");
            var res = await _carService.Like(Id, Guid.Parse(UserId));
            if (res.IsSuccess)
            {
                return Result.Success();
            }
            return Result.Failure(res.ErrorMessage);
        }
        [AllowAnonymous]
        [HttpPost("GetTopCars")]
        public async Task<IActionResult> GetTopCars()
        {
            var res = await _carService.GetTopCars();
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res.ErrorMessage);
        }

        [AllowAnonymous]
        [HttpGet("GetLikedCarsByUserId")]
        public async Task<IActionResult> GetLikedCarsByUserId(Guid userId)
        {
            var res = await _carService.GetLikedCarsByUserId(userId);
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res.ErrorMessage);
        }
    }
}
