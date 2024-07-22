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
        public async Task<CarDTO> GetCarById(Guid id)
        {
            var car = await _carService.GetCarById(id);
            return car;
        }

        [HttpPost("AddCar")]
        public async Task<IActionResult> AddCar([FromForm] CarDTO carDTO, [FromForm] IFormFile[] ImageFiles)
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

        [HttpPost("EditCar")]
        public async Task<IActionResult> EditCar([FromForm] Guid id, [FromForm] CarDTO carDTO, [FromForm] IFormFile[] ImageFiles)
        {
            carDTO.ImagesPath = await UploadImages(ImageFiles.ToList());
            await _carService.EditCar(id, carDTO);
            return Ok();
        }
        //TODO: доробити додавання і видалення фото
        //[HttpPost("AddImageToCar")]
        //public async Task<IActionResult> AddImageToCar([FromForm] Guid id, [FromForm] IFormFile ImageFiles)
        //{
        //    await _carService.AddImageToCar(id, "test");
        //    return Ok();
        //}

        //[HttpDelete("DeleteImageFromCar")]
        //public async Task<IActionResult> DeleteImageFromCar([FromForm] Guid id, [FromForm] string ImageName)
        //{
        //    await _carService.DeleteImageFromCar(id, ImageName);
        //    return Ok();
        //}

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
    }
}
