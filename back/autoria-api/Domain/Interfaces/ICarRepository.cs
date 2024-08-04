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
        Task<Cars> GetCarById(Guid id);
        Task AddCar(Cars car);
        Task DeleteCarById(Guid id);
        Task EditCar(Guid id, Cars car);
        Task AddImageToCar(Guid id, string ImageLink);
        Task DeleteImagefromCar(Guid id, string ImageLink);
        Task<List<Cars>> GetCarsByMark(string mark);
        Task<List<Cars>> GetCarsByFilter(CarType type, string Mark, string Model, string Region, int MinYear, int MaxYear, int MinPrice, int MaxPrice);
        Task<List<Cars>> GetCarsForYou();
        Task<List<Cars>> GetMostProfitable();
        Task ViewCar(Guid CarId);
    }
}
