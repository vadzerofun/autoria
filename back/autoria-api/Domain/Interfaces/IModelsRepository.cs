using Core.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    namespace Core.Repositories
    {
        public interface IModelRepository
        {
            Task<IEnumerable<Model>> GetAllAsync();
            Task<Model> GetByIdAsync(Guid id);
            Task AddAsync(Model model);
            Task UpdateAsync(Model model);
            Task DeleteAsync(Guid id);
        }
    }
}
