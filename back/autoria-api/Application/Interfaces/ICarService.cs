using Application.DTOs;
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
        Task<List<CarDTO>> GetCars();
        Task<CarDTO> GetCarById(Guid id);
        Task AddCar(CarDTO car);
        Task DeleteCarById(Guid id);
        Task EditCar(Guid id, CarDTO car);
        Task AddImageToCar(Guid id, string ImageFiles);
        Task DeleteImageFromCar(Guid id, string ImageName);
    }
}
