using Azure;
using Core.Enums;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.Class;

namespace Infrastructure.Repositories
{
    public class CarRepository : Core.Interfaces.ICarRepository
    {
        private readonly Data.AppDbContext _context;

        public CarRepository(Data.AppDbContext context)
        {
            _context = context;
        }

        public async Task AddCar(Cars car)
        {
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task DeleteCarById(Guid id)
        {
            if (_context.Cars == null)
            {
                return;
            }
            var Car = await _context.Cars.FindAsync(id);
            if (Car == null)
            {
                return;
            }

            _context.Cars.Remove(Car);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task EditCar(Guid id, Cars car)
        {
            var tempcar = await _context.Cars.FindAsync(id);
            _context.Cars.Remove(tempcar);
            await _context.SaveChangesAsync();
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
        }

        public async Task<Cars> GetCarById(Guid id)
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

        public async Task<List<Cars>> GetCars(int page, int pageSize)
        {
            if (_context.Cars == null)
            {
                return null;
            }

            var query = _context.Cars.AsQueryable();

            if (pageSize > 0)
            {
                query = query
                    .Skip((page - 1) * pageSize) 
                    .Take(pageSize);             
            }

            return await query.ToListAsync();
        }


        public async Task AddImageToCar(Guid id, List<string> ImageLink)
        {
            var car = await GetCarById(id);
            foreach (var img in ImageLink)
            {
                car.ImagesPath.Add(img);
            }
            await EditCar(id, car);
        }

        public async Task DeleteImagefromCar(Guid id, string ImageLink)
        {
            var car = await GetCarById(id);
            if (car.ImagesPath.FirstOrDefault(car => car == ImageLink) == null)
                return;
            car.ImagesPath.Remove(ImageLink);
            await EditCar(id, car);
        }

        public async Task<List<Cars>> GetCarsByMark(Guid mark)
        {
            List<Cars> cars = new List<Cars>();
            cars = _context.Cars.Where(car => car.MakeId == mark).ToList();
            return cars;
        }

        public async Task<List<Cars>> GetCarsByFilter(CarType? type, Guid? mark, string? model, string? region, int? minYear, int? maxYear, int? minPrice, int? maxPrice, Transmission_type? gearBox, Engine_type? engineType, Occasion? occasion, double? minEngineCapacity, double? maxEngineCapacity, CarState? carState, int page, int pageSize)
        {
            if (_context.Cars == null)
            {
                return new List<Cars>();
            }

            var query = _context.Cars.AsQueryable();

            query = query.FilterIf(type.HasValue, car => car.Type == type.Value)
                         .FilterIf(mark.HasValue, car => car.MakeId == mark)
                         .FilterIf(!string.IsNullOrEmpty(model), car => car.Model == model)
                         .FilterIf(!string.IsNullOrEmpty(region), car => car.Region == region)
                         .FilterIf(minYear.HasValue, car => car.Year >= minYear)
                         .FilterIf(maxYear.HasValue, car => car.Year <= maxYear)
                         .FilterIf(minPrice.HasValue, car => car.Price >= minPrice)
                         .FilterIf(maxPrice.HasValue, car => car.Price <= maxPrice)
                         .FilterIf(gearBox.HasValue, car => car.Transmission_type == gearBox)
                         .FilterIf(engineType.HasValue, car => car.Engine_type == engineType)
                         .FilterIf(occasion.HasValue, car => car.Occasion == occasion)
                         .FilterIf(minEngineCapacity.HasValue, car => car.Engine_capacity >= minEngineCapacity)
                         .FilterIf(maxEngineCapacity.HasValue, car => car.Engine_capacity <= maxEngineCapacity)
                         .FilterIf(carState.HasValue, car => car.State == carState);

            if (pageSize > 0)
            {
                query = query.Skip((page - 1) * pageSize)
                             .Take(pageSize);
            }

            return await query.ToListAsync();
        }



        public async Task<List<Cars>> GetCarsForYou()
        {
            List<Cars> cars = new List<Cars>();
            cars = await _context.Cars.OrderByDescending(car => car.VisitedCount)
                .Take(10)
                .ToListAsync();
            return cars;
        }
        public async Task<List<Cars>> GetMostProfitable()
        {
            List<Cars> cars = new List<Cars>();
            cars = await _context.Cars.OrderByDescending(car => car.Year)
                                    .ThenBy(car => car.Price) 
                                    .Take(10)
                                    .ToListAsync();
            return cars;
        }

        public async Task ViewCar(Guid CarId)
        {
            var car = await GetCarById(CarId);
            car.VisitedCount += 1;
            await EditCar(CarId, car);
            return;
        }

        public async Task<List<Cars>> GetCarsByUserId(Guid UserId)
        {
            var cars = await _context.Cars.Where(car => car.UserId == UserId)
                .OrderBy(car => car.CreatedTime)
                .ToListAsync();
            return cars;
        }

        public async Task Addlike(Guid id, Guid UserId)
        {
            var Car = await GetCarById(id);
            if (Car == null) return;
            if (Car.Likes == null) Car.Likes = new List<Guid>();
            if (Car.Likes.Contains(UserId))
                return;
            Car.Likes.Add(UserId);
            await EditCar(Car.Id, Car);
            return;
        }

        public async Task Removelike(Guid id, Guid UserId)
        {
            var Car = await GetCarById(id);
            if (Car == null) return;
            Car.Likes.Remove(UserId);
            await EditCar(id, Car);
            return;
        }

        public async Task<List<Cars>> GetLikedCarsByUserId(Guid userId, int page, int pageSize)
        {
            var query = _context.Cars
                .Where(car => car.Likes.Contains(userId));

            if (pageSize > 0)
            {
                query = query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize);
            }

            var userCars = await query.ToListAsync();
            return userCars;
        }


        public async Task ViewPhone(Guid CarId)
        {
            var car = await GetCarById(CarId);
            car.SellerPhoneViews += 1;
            await EditCar(CarId, car);
            return;
        }
    }
}
