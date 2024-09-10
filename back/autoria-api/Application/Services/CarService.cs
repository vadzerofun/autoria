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
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Application.Services
{
    public class CarService : ICarService
    {
        private readonly ICarRepository _carRepository;
        private readonly IuserRepository _userRepository;
        private readonly IImageUploader _imageUploader;
        private readonly IUserSubscribeService _userSubscribeService;
        public CarService(ICarRepository carRepository, IuserRepository userRepository, IImageUploader imageUploader, IUserSubscribeService userSubscribeService)
        {
            _carRepository = carRepository;
            _userRepository = userRepository;
            _imageUploader = imageUploader;
            _userSubscribeService = userSubscribeService;
        }
        public async Task AddCar(Cars car)
        {
            car.Id = Guid.NewGuid();
            car.CreatedTime = DateTime.Now;
            car.VisitedCount = 0;
            await _userRepository.AddCarIdToUser(car.UserId, car.Id);
            await _carRepository.AddCar(car);
        }

        public async Task AddImageToCar(Guid id, List<string> ImageFiles)
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
            var car = _carRepository.GetCarById(id);
            if (car == null) return;
            await _carRepository.DeleteImagefromCar(id, ImageName);
        }

        public async Task EditCar(Guid id, Cars car)
        {
            var _car = _carRepository.GetCarById(id);
            if (_car == null) return;
            //car.ImagesPath = (await _carRepository.GetCarById(id)).ImagesPath;
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
        public async Task<List<Cars>> GetCarByFilter(CarFilter filter, int page, int pageSize)
        {
            var cars = await _carRepository.GetCarsByFilter(
                filter.Type,
                filter.Mark,
                filter.Model,
                filter.Region,
                filter.MinYear,
                filter.MaxYear,
                filter.MinPrice,
                filter.MaxPrice,
                filter.GearBox,
                filter.engine_Type,
                filter.occasion,
                filter.minEngine_capacity,
                filter.maxEngine_capacity,
                filter.carState,
                page,
                pageSize
            );

            return cars;
        }

        public async Task<List<Cars>> GetCars(int page, int pageSize)
        {
            List<Cars> cars = await _carRepository.GetCars(page, pageSize);
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

        public async Task<Result> Like(Guid Id, Guid UserId)
        {
            try
            {
                var Car = await _carRepository.GetCarById(Id);
                if (Car == null) return Result.Failure("No Such News");
                if (Car.Likes.Contains(UserId))
                {
                    await _carRepository.Removelike(Id, UserId);
                    await _userRepository.RemoveNews(UserId, Id);
                }
                else
                {
                    await _carRepository.Addlike(Id, UserId);
                    await _userRepository.AddNewsToUser(UserId, Id);
                }
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        public async Task<Result<List<Cars>>> GetTopCars()
        {
            try
            {
                var CarsId = (await _userSubscribeService.GetTopCarsId()).Value;
                if (CarsId == null) return Result<List<Cars>>.Failure("top List is empty");
                List<Cars> cars = new List<Cars>();
                foreach (var CarId in CarsId)
                {
                    cars.Add(await GetCarById(CarId));
                }
                return Result<List<Cars>>.Success(cars);
            }
            catch (Exception ex)
            {
                return Result<List<Cars>>.Failure(ex.Message);
            }
        }

        public async Task<Result<List<Cars>>> GetLikedCarsByUserId(Guid UserId, int Page, int PageSize)
        {
            try
            {
                var cars = await _carRepository.GetLikedCarsByUserId(UserId, Page, PageSize);
                return Result<List<Cars>>.Success(cars);
            }
            catch (Exception ex)
            {
                return Result<List<Cars>>.Failure(ex.Message);
            }
        }

        public async Task<Result<List<Cars>>> GetTopCars(int count)
        {
            try
            {
                var CarsId = (await _userSubscribeService.GetTopCarsId(count)).Value;
                if (CarsId == null) return Result<List<Cars>>.Failure("top List is empty");
                List<Cars> cars = new List<Cars>();
                foreach (var CarId in CarsId)
                {
                    cars.Add(await GetCarById(CarId));
                }
                return Result<List<Cars>>.Success(cars);
            }
            catch (Exception ex)
            {
                return Result<List<Cars>>.Failure(ex.Message);
            }
        }

        public async Task<Result> ViewPhone(Guid Carid)
        {
            try
            {
                await _carRepository.ViewPhone(Carid);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }
    }
}
