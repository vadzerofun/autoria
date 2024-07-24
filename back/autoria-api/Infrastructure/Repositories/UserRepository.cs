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
    public class UserRepository : IuserRepository
    {
        private readonly Data.AppDbContext _context;

        public UserRepository(Data.AppDbContext context)
        {
            _context = context;
        }
        public async Task AddUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task DeleteUserById(Guid id)
        {
            if (_context.Users == null)
            {
                return;
            }
            var User = await _context.Users.FindAsync(id);
            if (User == null)
            {
                return;
            }

            _context.Users.Remove(User);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task EditUser(Guid id, User user)
        {
            var tempUser = await _context.Users.FindAsync(id);
            _context.Users.Remove(tempUser);
            await _context.SaveChangesAsync();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetUserByEmail(string email)
        {
            if (_context.Users == null)
            {
                return null;
            }
            var User = await _context.Users.FirstOrDefaultAsync(user => user.Email == email);

            if (User == null)
            {
                return null;
            }

            return User;
        }

        public async Task<User> GetUserByPhone(string phone)
        {
            if (_context.Users == null)
            {
                return null;
            }
            var User = await _context.Users.FirstOrDefaultAsync(user => user.Phone == phone);

            if (User == null)
            {
                return null;
            }

            return User;
        }

        public async Task<User> GetUserById(Guid id)
        {
            if (_context.Users == null)
            {
                return null;
            }
            var User = await _context.Users.FindAsync(id);

            if (User == null)
            {
                return null;
            }

            return User;
        }

        public async Task<User> GetUserByName(string name)
        {
            if (_context.Users == null)
            {
                return null;
            }
            var User = await _context.Users.FirstOrDefaultAsync(user => user.Name == name);

            if (User == null)
            {
                return null;
            }

            return User;
        }

        public async Task<List<User>> GetUsers()
        {
            if (_context.Users == null)
            {
                return null;
            }
            return await _context.Users.ToListAsync();
        }

        public async Task ConfirmUserEmail(string Email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Email == Email);
            if (user == null)
                return;
            user.IsEmailConfirmed = true;
            await EditUser(user.Id, user);
        }

        public async Task AddCarIdToUser(Guid UserId, Guid CarId)
        {
            var user = await GetUserById(UserId);
            if (user == null)
                return;

            if (user.CarsId == null)
            {
                user.CarsId = new List<Guid>();
            }

            user.CarsId.Add(CarId);
            await _context.SaveChangesAsync();
        }
    }
}

