using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class SubscribeRepository : ISubscribeRepository
    {
        private readonly Data.AppDbContext _context;

        public SubscribeRepository(Data.AppDbContext context)
        {
            _context = context;
        }
        public async Task AddSubscribe(Subscribe subscribe)
        {
            _context.Subscribe.Add(subscribe);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task<Subscribe> GetSubscribe(Guid Id)
        {
            if (_context.Subscribe == null)
            {
                return null;
            }
            var Car = await _context.Subscribe.FindAsync(Id);

            if (Car == null)
            {
                return null;
            }

            return Car;
        }

        public async Task<List<Subscribe>> GetSubscribes()
        {
            if (_context.Subscribe == null)
            {
                return null;
            }
            return await _context.Subscribe.ToListAsync();
        }

        public async Task RemoveSubscribe(Guid Id)
        {
            if (_context.Cars == null)
            {
                return;
            }
            var Subscribe = await _context.Subscribe.FindAsync(Id);
            if (Subscribe == null)
            {
                return;
            }

            _context.Subscribe.Remove(Subscribe);
            await _context.SaveChangesAsync();
            return;
        }
    }
}
