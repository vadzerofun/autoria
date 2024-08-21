﻿using Application.Interfaces;
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
        private readonly IImageUploader _imageUploader;
        public CarService(ICarRepository carRepository, IuserRepository userRepository, IImageUploader imageUploader)
        {
            _carRepository = carRepository;
            _userRepository = userRepository;
            _imageUploader = imageUploader;
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
            var car = await _carRepository.GetCarById(id);
            if (car == null)
                return;
            await _imageUploader.DeleteImages(car.ImagesPath);
            await _carRepository.DeleteCarById(id);
        }

        public async Task DeleteImageFromCar(Guid id, string ImageName)
        {
            await _carRepository.DeleteImagefromCar(id, ImageName);
        }

        public async Task EditCar(Guid id, Cars car)
        {
            car.ImagesPath = (await _carRepository.GetCarById(id)).ImagesPath;
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

        public async Task<Result> ViewCar(Guid Carid)
        {
            try
            {
                await _carRepository.ViewCar(Carid);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        public async Task<Result<List<Cars>>> GetCarsByUserId(Guid UserId)
        {
            try
            {
                var cars = await _carRepository.GetCarsByUserId(UserId);
                return Result<List<Cars>>.Success(cars);
            }
            catch (Exception ex)
            {
                return Result<List<Cars>>.Failure(ex.Message);
            }
        }
    }
}
