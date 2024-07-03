using autoria_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace autoria_api.Controllers
{
    public class CarsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CarsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            if (_context.Cars == null)
            {
                return NotFound();
            }
            return await _context.Cars.ToListAsync();
        }

        // GET: api/Cars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCars(int id)
        {
            if (_context.Cars == null)
            {
                return NotFound();
            }
            var Car = await _context.Cars.FindAsync(id);

            if (Car == null)
            {
                return NotFound();
            }

            return Car;
        }

        [HttpGet("AddCar")]
        public async Task<List<Car>> AddCar(double priceUSD, double mileage, string make, string model, int year, double engine_capacity,
               Engine_type engine_type, string color, int owners_number, bool wanted, string road_accident,
               double carrying_capacity_ton, string car_number, string car_vin_code, Transmission_type transmission_type,
               Occasion occasion, string description, int number_of_seats, List<string> imagesPath)
        {
            _context.Cars.Add(new Car(priceUSD, mileage, make, model, year, engine_capacity,
               engine_type, color, owners_number, wanted, road_accident,
               carrying_capacity_ton, car_number, car_vin_code, transmission_type,
               occasion, description, number_of_seats, imagesPath));

            await _context.SaveChangesAsync();
            return _context.Cars.ToList();
        }

        // DELETE: api/Cars/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            if (_context.Cars == null)
            {
                return NotFound();
            }
            var Car = await _context.Cars.FindAsync(id);
            if (Car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(Car);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("All")]
        public async Task<IActionResult> DeleteAllCar()
        {
            if (_context.Cars == null)
            {
                return NotFound();
            }
            foreach (var item in _context.Cars)
            {
                _context.Cars.Remove(item);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("EditCar")]
        public async Task<Car> EditCar(int id, double priceUSD, double mileage, string make, string model, int year, double engine_capacity,
               Engine_type engine_type, string color, int owners_number, bool wanted, string road_accident,
               double carrying_capacity_ton, string car_number, string car_vin_code, Transmission_type transmission_type,
               Occasion occasion, string description, int number_of_seats, List<string> imagesPath)
        {
            var tempcar = await _context.Cars.FindAsync(id);
            _context.Cars.Remove(tempcar);
            Car Car = new Car(priceUSD, mileage, make, model, year, engine_capacity,
               engine_type, color, owners_number, wanted, road_accident,
               carrying_capacity_ton, car_number, car_vin_code, transmission_type,
               occasion, description, number_of_seats, imagesPath);
            _context.Cars.Add(Car);
            await _context.SaveChangesAsync();
            return Car;
        }
    }
}
