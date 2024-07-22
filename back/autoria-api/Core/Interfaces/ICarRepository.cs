using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using Core.Enums;

namespace Core.Interfaces
{
    public interface ICarRepository
    {
        Task<List<Cars>> GetCars();
        Task<Cars> GetCarById(int id);
        Task AddCar(Cars car);
        Task DeleteCarById(int id);
        Task EditCar(int id, Cars car);
    }
}
