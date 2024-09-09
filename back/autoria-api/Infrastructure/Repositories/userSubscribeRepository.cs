using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class UserSubscribeRepository : IUserSubscribeRepository
    {
        private readonly Data.AppDbContext _context;

        public UserSubscribeRepository(Data.AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateUserSubscribe(UserSubscribe userSubscribe)
        {
            _context.UserSubscribes.Add(userSubscribe);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task<List<UserSubscribe>> GetUserSubscribe()
        {
            if (_context.UserSubscribes == null)
            {
                return null;
            }
            return await _context.UserSubscribes.ToListAsync();
        }

        public async Task<UserSubscribe> GetUserSubscribe(Guid id)
        {
            if (_context.UserSubscribes == null)
            {
                return null;
            }
            var userSubscribe = await _context.UserSubscribes.FindAsync(id);

            if (userSubscribe == null)
            {
                return null;
            }

            return userSubscribe;
        }

        public async Task DeleteUserSubscribe(Guid id)
        {
            if (_context.UserSubscribes == null)
            {
                return;
            }
            var userSubscribe = await _context.UserSubscribes.FindAsync(id);
            if (userSubscribe == null)
            {
                return;
            }

            _context.UserSubscribes.Remove(userSubscribe);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task<List<Guid>> GetTopCarsId()
        {
            if (_context.UserSubscribes == null)
            {
                return null;
            }
            var currentDateTime = DateTime.UtcNow;

            var activeUserSubscribes = await _context.UserSubscribes
                .Where(us => us.SubEndTime > currentDateTime)
                .ToListAsync();

            var activeCarIds = activeUserSubscribes
                .SelectMany(us => us.CarsId)
                .ToList();

            if (activeCarIds == null)
            {
                return null;
            }

            return activeCarIds;
        }

        public async Task<List<Guid>> GetTopCarsId(int count)
        {
            if (_context.UserSubscribes == null)
            {
                return null;
            }

            var currentDateTime = DateTime.UtcNow;

            var activeUserSubscribes = await _context.UserSubscribes
                .Where(us => us.SubEndTime > currentDateTime)
                .ToListAsync();

            var activeCarIds = activeUserSubscribes
                .SelectMany(us => us.CarsId)
                .ToList();

            if (activeCarIds == null || !activeCarIds.Any())
            {
                return null;
            }

            var randomActiveCarIds = activeCarIds
                .OrderBy(_ => Guid.NewGuid())
                .Take(count)
                .ToList();

            return randomActiveCarIds;


        }
    }
}
