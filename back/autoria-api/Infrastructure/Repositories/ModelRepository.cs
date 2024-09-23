using Core.Interfaces.Core.Repositories;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ModelRepository : IModelRepository
    {
        private readonly AppDbContext _context;

        public ModelRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Model>> GetAllAsync()
        {
            return await _context.Models.ToListAsync();
        }

        public async Task<Model> GetByIdAsync(Guid id)
        {
            return await _context.Models.FindAsync(id);
        }

        public async Task AddAsync(Model model)
        {
            await _context.Models.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Model model)
        {
            _context.Models.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var model = await _context.Models.FindAsync(id);
            if (model != null)
            {
                _context.Models.Remove(model);
                await _context.SaveChangesAsync();
            }
        }
    }
}
