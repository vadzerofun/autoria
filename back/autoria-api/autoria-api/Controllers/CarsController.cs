using autoria_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using autoria_api.DbContext;
using Microsoft.AspNetCore.Authorization;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CarsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Cars
        [HttpGet]
        public async Task<List<Car>> GetCars()
        {
            if (_context.Cars == null)
            {
                return null;
            }
            return await _context.Cars.ToListAsync();
        }

        // GET: api/Cars/5
        [HttpGet("{id}")]
        public async Task<Car> GetCars(int id)
        {
            if (_context.Cars == null)
            {
                return null;
            }
            var Car = await _context.Cars.FindAsync(id);

            if (Car == null)
            {
                return null;
            }

            return Car;
        }

        [HttpGet("AddCar"), Authorize]
        public async Task<List<Car>> AddCar(double priceUSD, double mileage, string make, string model, int year, double engine_capacity,
               Engine_type engine_type, string color, int owners_number, bool wanted, string road_accident,
               double carrying_capacity_ton, string car_number, string car_vin_code, Transmission_type transmission_type,
               Occasion occasion, string description, int number_of_seats, [FromQuery] List<string> imagesPath, string userId)
        {
            _context.Cars.Add(new Car(priceUSD, mileage, make, model, year, engine_capacity,
               engine_type, color, owners_number, wanted, road_accident,
               carrying_capacity_ton, car_number, car_vin_code, transmission_type,
               occasion, description, number_of_seats, imagesPath, userId));

            await _context.SaveChangesAsync();
            return _context.Cars.ToList();
        }

        // DELETE: api/Cars/5
        [HttpDelete("{id}"), Authorize]
        public async Task<Car> DeleteCar(int id)
        {
            if (_context.Cars == null)
            {
                return null;
            }
            var Car = await _context.Cars.FindAsync(id);
            if (Car == null)
            {
                return null;
            }

            _context.Cars.Remove(Car);
            await _context.SaveChangesAsync();

            return Car;
        }

        //[HttpDelete("All")]
        //public async Task<List<Car>> DeleteAllCar()
        //{
        //    if (_context.Cars == null)
        //    {
        //        return null;
        //    }
        //    foreach (var item in _context.Cars)
        //    {
        //        _context.Cars.Remove(item);
        //    }

        //    await _context.SaveChangesAsync();

        //    return _context.Cars.ToList();
        //}

        [HttpGet("EditCar"), Authorize]
        public async Task<Car> EditCar(int id, double priceUSD, double mileage, string make, string model, int year, double engine_capacity,
               Engine_type engine_type, string color, int owners_number, bool wanted, string road_accident,
               double carrying_capacity_ton, string car_number, string car_vin_code, Transmission_type transmission_type,
               Occasion occasion, string description, int number_of_seats, [FromQuery] List<string> imagesPath, string userId)
        {
            var tempcar = await _context.Cars.FindAsync(id);
            _context.Cars.Remove(tempcar);
            Car Car = new Car(priceUSD, mileage, make, model, year, engine_capacity,
               engine_type, color, owners_number, wanted, road_accident,
               carrying_capacity_ton, car_number, car_vin_code, transmission_type,
               occasion, description, number_of_seats, imagesPath, userId);
            _context.Cars.Add(Car);
            await _context.SaveChangesAsync();
            return Car;
        }
    }
}
