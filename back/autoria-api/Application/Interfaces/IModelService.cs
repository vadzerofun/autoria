using Core.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface IModelService
    {
        Task<IEnumerable<Model>> GetAllModelsAsync();
        Task<Model> GetModelByIdAsync(Guid id);
        Task CreateModelAsync(Model model);
        Task UpdateModelAsync(Model model);
        Task DeleteModelAsync(Guid id);
    }
}
