﻿using Application.Interfaces;
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
        public async Task<List<Cars>> GetCars(int page, int pageSize)
        {
            var car = await _carService.GetCars(page, pageSize);
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
        public async Task<Result<List<Cars>>> GetCarByMark(Guid mark)
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
        public async Task<Result<CarOutputViewModel>> GetCarsByFilter(CarFilter carFilter, int page = 0, int pageSize = 0)
        {
            try
            {
                var cars = await _carService.GetCarByFilter(carFilter, page, pageSize);
                var count = (await _carService.GetCars(0, 0)).Count;
                CarOutputViewModel viewModel = new CarOutputViewModel
                {
                    cars = cars,
                    count = count,
                    PageCount = count / pageSize
                };
                return Result<CarOutputViewModel>.Success(viewModel);
            }
            catch (Exception ex)
            {
                return Result<CarOutputViewModel>.Failure(ex.Message);
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
        [HttpGet("GetTopCars")]
        public async Task<IActionResult> GetTopCars(int count)
        {
            var res = await _carService.GetTopCars(count);
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res.ErrorMessage);
        }

        [AllowAnonymous]
        [HttpGet("GetLikedCarsByUserId")]
        public async Task<IActionResult> GetLikedCarsByUserId(Guid userId, int Page = 0, int PageSize = 0)
        {
            var res = await _carService.GetLikedCarsByUserId(userId, Page, PageSize);
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res.ErrorMessage);
        }

        [AllowAnonymous]
        [HttpGet("ViewPhone")]
        public async Task<IActionResult> ViewPhone(Guid CarId)
        {
            var res = await _carService.ViewPhone(CarId);
            if (res.IsSuccess)
            {
                return Ok();
            }
            return BadRequest(res.ErrorMessage);
        }
    }
}
