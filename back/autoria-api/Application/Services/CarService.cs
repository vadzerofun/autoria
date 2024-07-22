using Application.DTOs;
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

namespace Application.Services
{
    public class CarService : ICarService
    {
        private readonly ICarRepository _carRepository;
        public CarService(ICarRepository carRepository)
        {
            _carRepository = carRepository;
        }
        public async Task AddCar(CarDTO carDTO)
        {
            Cars car = new Cars
            {
                PriceUSD = carDTO.PriceUSD,
                Mileage = carDTO.Mileage,
                Make = carDTO.Make,
                Model = carDTO.Model,
                Year = carDTO.Year,
                Engine_capacity = carDTO.Engine_capacity,
                Engine_type = carDTO.Engine_type,
                Color = carDTO.Color,
                Owners_number = carDTO.Owners_number,
                Wanted = carDTO.Wanted,
                Road_accident = carDTO.Road_accident,
                Carrying_capacity_ton = carDTO.Carrying_capacity_ton,
                Car_number = carDTO.Car_number,
                Car_vin_code = carDTO.Car_vin_code,
                Transmission_type = carDTO.Transmission_type,
                Occasion = carDTO.Occasion,
                Description = carDTO.Description,
                Number_of_seats = carDTO.Number_of_seats,
                ImagesPath = carDTO.ImagesPath,
                UserId = carDTO.UserId,
                CreatedTime = DateTime.Now

            };
            await _carRepository.AddCar(car);
        }

        public Task AddImageToCar(Guid id, string ImageFiles)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteCarById(Guid id)
        {
            await _carRepository.DeleteCarById(id);
        }

        public Task DeleteImageFromCar(Guid id, string ImageName)
        {
            throw new NotImplementedException();
        }

        public async Task EditCar(Guid id, CarDTO carDTO)
        {
            Cars car = new Cars
            {
                Id = id,
                PriceUSD = carDTO.PriceUSD,
                Mileage = carDTO.Mileage,
                Make = carDTO.Make,
                Model = carDTO.Model,
                Year = carDTO.Year,
                Engine_capacity = carDTO.Engine_capacity,
                Engine_type = carDTO.Engine_type,
                Color = carDTO.Color,
                Owners_number = carDTO.Owners_number,
                Wanted = carDTO.Wanted,
                Road_accident = carDTO.Road_accident,
                Carrying_capacity_ton = carDTO.Carrying_capacity_ton,
                Car_number = carDTO.Car_number,
                Car_vin_code = carDTO.Car_vin_code,
                Transmission_type = carDTO.Transmission_type,
                Occasion = carDTO.Occasion,
                Description = carDTO.Description,
                Number_of_seats = carDTO.Number_of_seats,
                ImagesPath = carDTO.ImagesPath,
                UserId = carDTO.UserId,
                CreatedTime = carDTO.CreatedTime

            };
            await _carRepository.EditCar(id, car);
        }

        public async Task<CarDTO> GetCarById(Guid id)
        {
            Cars car = await _carRepository.GetCarById(id);
            if (car == null)
                return null;

            CarDTO carDTO = new CarDTO
            {
                Id = car.Id,
                PriceUSD = car.PriceUSD,
                Mileage = car.Mileage,
                Make = car.Make,
                Model = car.Model,
                Year = car.Year,
                Engine_capacity = car.Engine_capacity,
                Engine_type = car.Engine_type,
                Color = car.Color,
                Owners_number = car.Owners_number,
                Wanted = car.Wanted,
                Road_accident = car.Road_accident,
                Carrying_capacity_ton = car.Carrying_capacity_ton,
                Car_number = car.Car_number,
                Car_vin_code = car.Car_vin_code,
                Transmission_type = car.Transmission_type,
                Occasion = car.Occasion,
                Description = car.Description,
                Number_of_seats = car.Number_of_seats,
                ImagesPath = car.ImagesPath,
                UserId = car.UserId,
                CreatedTime = car.CreatedTime
            };
            return carDTO;

        }

        public async Task<List<CarDTO>> GetCars()
        {
            List<Cars> cars = await _carRepository.GetCars();
            List<CarDTO> carDTOs = new List<CarDTO>();
            foreach (var car in cars)
            {
                carDTOs.Add(new CarDTO
                {
                    Id = car.Id,
                    PriceUSD = car.PriceUSD,
                    Mileage = car.Mileage,
                    Make = car.Make,
                    Model = car.Model,
                    Year = car.Year,
                    Engine_capacity = car.Engine_capacity,
                    Engine_type = car.Engine_type,
                    Color = car.Color,
                    Owners_number = car.Owners_number,
                    Wanted = car.Wanted,
                    Road_accident = car.Road_accident,
                    Carrying_capacity_ton = car.Carrying_capacity_ton,
                    Car_number = car.Car_number,
                    Car_vin_code = car.Car_vin_code,
                    Transmission_type = car.Transmission_type,
                    Occasion = car.Occasion,
                    Description = car.Description,
                    Number_of_seats = car.Number_of_seats,
                    ImagesPath = car.ImagesPath,
                    UserId = car.UserId,
                    CreatedTime = car.CreatedTime
                });
            }
            return carDTOs;
        }
    }
}
