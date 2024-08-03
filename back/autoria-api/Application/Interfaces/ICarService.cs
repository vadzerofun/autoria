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
        Task<List<Cars>> GetCars();
        Task<Cars> GetCarById(Guid id);
        Task AddCar(Cars car);
        Task DeleteCarById(Guid id);
        Task EditCar(Guid id, Cars car);
        Task AddImageToCar(Guid id, string ImageFiles);
        Task DeleteImageFromCar(Guid id, string ImageName);
        Task<List<Cars>> GetCarByMark(string mark);
        Task<List<Cars>> GetCarByFilter(CarFilter filter);
        Task<List<Cars>> GetCarsForYou();
        Task<List<Cars>> GetMostProfitable();
        Task<Result> ViewCar(Guid Carid);
    }
}
