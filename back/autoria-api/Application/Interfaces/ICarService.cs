using Application.Model;
using Application.Services;
using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ICarService
    {
        public Task<List<Cars>> GetCars();
        public Task<Cars> GetCarById(Guid id);
        public Task AddCar(Cars car);
        public Task DeleteCarById(Guid id);
        public Task EditCar(Guid id, Cars car);
        public Task AddImageToCar(Guid id, string ImageFiles);
        public Task DeleteImageFromCar(Guid id, string ImageName);
        public Task<List<Cars>> GetCarByMark(string mark);
        public Task<List<Cars>> GetCarByFilter(CarFilter filter);
        public Task<List<Cars>> GetCarsForYou();
        public Task<List<Cars>> GetMostProfitable();
        public Task<Result> ViewCar(Guid Carid);
        public Task<Result<List<Cars>>> GetCarsByUserId(Guid UserId);
        public Task<Result> Like(Guid Id, Guid UserId);
    }
}
