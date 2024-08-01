using Application.Interfaces;
using Core.Enums;
using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Application.Services;
using Application.Model;

namespace Application.Services
{
    public class CarService : ICarService
    {
        private readonly ICarRepository _carRepository;
        private readonly IuserRepository _userRepository;
        public CarService(ICarRepository carRepository, IuserRepository userRepository)
        {
            _carRepository = carRepository;
            _userRepository = userRepository;
        }
        public async Task AddCar(Cars car)
        {
            car.Id = Guid.NewGuid();
            car.CreatedTime = DateTime.Now;
            car.VisitedCount = 0;
            await _userRepository.AddCarIdToUser(car.UserId, car.Id);
            await _carRepository.AddCar(car);
        }

        public async Task AddImageToCar(Guid id, string ImageFiles)
        {
            await _carRepository.AddImageToCar(id, ImageFiles);
        }

        public async Task DeleteCarById(Guid id)
        {
            await _carRepository.DeleteCarById(id);
        }

        public async Task DeleteImageFromCar(Guid id, string ImageName)
        {
            await _carRepository.DeleteImagefromCar(id, ImageName);
        }

        public async Task EditCar(Guid id, Cars car)
        {
            await _carRepository.EditCar(id, car);
        }

        public async Task<Cars> GetCarById(Guid id)
        {
            Core.Models.Cars car = await _carRepository.GetCarById(id);
            if (car == null)
                return null;

            return car;

        }
        public async Task<List<Cars>> GetCarByMark(string mark)
        {
            var cars = await _carRepository.GetCarsByMark(mark);
            return cars;
        }
        public async Task<List<Cars>> GetCarByFilter(CarFilter filter)
        {
            var cars = await _carRepository.GetCarsByFilter(filter.Type, filter.Mark, filter.Model, filter.Region, filter.MinYear, filter.MaxYear, filter.MinPrice, filter.MaxPrice);
            return cars;
        }
        public async Task<List<Cars>> GetCars()
        {
            List<Cars> cars = await _carRepository.GetCars();
            return cars;
        }
        public async Task<List<Cars>> GetCarsForYou()
        {
            List<Cars> cars = await _carRepository.GetCarsForYou();
            return cars;
        }
        public async Task<List<Cars>> GetMostProfitable()
        {
            List<Cars> cars = await _carRepository.GetMostProfitable();
            return cars;
        }


    }
}
