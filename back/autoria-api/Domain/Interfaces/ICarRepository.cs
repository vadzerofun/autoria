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
        Task<List<Cars>> GetCars(int page, int pageSize);
        Task<Cars> GetCarById(Guid id);
        Task AddCar(Cars car);
        Task DeleteCarById(Guid id);
        Task EditCar(Guid id, Cars car);
        Task AddImageToCar(Guid id, List<string> ImageLink);
        Task DeleteImagefromCar(Guid id, string ImageLink);
        Task<List<Cars>> GetCarsByMark(Guid mark);
        Task<List<Cars>> GetCarsByFilter(
            CarType? type,
            Guid? mark,
            string? model,
            string? region,
            int? minYear,
            int? maxYear,
            int? minPrice,
            int? maxPrice,
            Transmission_type? gearBox,
            Engine_type? engineType,
            Occasion? occasion,
            double? minEngineCapacity,
            double? maxEngineCapacity,
            CarState? carState,
            int page,
            int pageSize);
        Task<List<Cars>> GetCarsForYou();
        Task<List<Cars>> GetMostProfitable();
        Task ViewCar(Guid CarId);
        Task ViewPhone(Guid CarId);
        Task<List<Cars>> GetCarsByUserId(Guid UserId);
        Task Addlike(Guid id, Guid UserId);
        Task Removelike(Guid id, Guid UserId);
        Task<List<Cars>> GetLikedCarsByUserId(Guid userId, int Page, int PageSize);
    }
}
