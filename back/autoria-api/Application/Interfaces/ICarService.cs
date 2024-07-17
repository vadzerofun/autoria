using Application.DTOs;
using Core.Interfaces;
using Core.Models;
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
        Task<CarDTO> GetCarById(int id);
        Task AddCar(CarDTO car);
        Task DeleteCarById(int id);
        Task EditCar(int id, CarDTO car);
    }
}
