using Core.Interfaces.Core.Repositories;
using Core.Models;
using Core.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class ModelService : IModelService
    {
        private readonly IModelRepository _modelRepository;

        public ModelService(IModelRepository modelRepository)
        {
            _modelRepository = modelRepository;
        }

        public async Task<IEnumerable<Model>> GetAllModelsAsync()
        {
            return await _modelRepository.GetAllAsync();
        }

        public async Task<Model> GetModelByIdAsync(Guid id)
        {
            return await _modelRepository.GetByIdAsync(id);
        }

        public async Task CreateModelAsync(Model model)
        {
            await _modelRepository.AddAsync(model);
        }

        public async Task UpdateModelAsync(Model model)
        {
            await _modelRepository.UpdateAsync(model);
        }

        public async Task DeleteModelAsync(Guid id)
        {
            await _modelRepository.DeleteAsync(id);
        }
    }
}
