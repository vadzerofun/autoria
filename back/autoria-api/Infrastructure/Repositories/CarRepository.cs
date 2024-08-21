using Core.Enums;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<List<Cars>> GetCars()
        {
            if (_context.Cars == null)
            {
                return null;
            }
            return await _context.Cars.ToListAsync();
        }

        public async Task AddImageToCar(Guid id, string ImageLink)
        {
            var car = await GetCarById(id);
            car.ImagesPath.Add(ImageLink);
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

        public async Task<List<Cars>> GetCarsByMark(string mark)
        {
            List<Cars> cars = new List<Cars>();
            cars = _context.Cars.Where(car => car.Make == mark).ToList();
            return cars;
        }

        public async Task<List<Cars>> GetCarsByFilter(CarType type, string Mark, string Model, string Region, int MinYear, int MaxYear, int MinPrice, int MaxPrice)
        {
            List<Cars> cars = new List<Cars>();
            cars = await _context.Cars.Where(car => car.Type == type && car.Make == Mark && car.Model == Model && (car.Year < MaxYear && car.Year > MinYear) && (car.Price < MaxPrice && car.Price > MinPrice) && car.Region == Region).ToListAsync();
            return cars;
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
    }
}
