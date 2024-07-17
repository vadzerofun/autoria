using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IuserRepository
    {
        Task<List<User>> GetUsers();
        Task<User> GetUserById(Guid id);
        Task<User> GetUserByName(string name);
        Task<User> GetUserByEmail(string email);
        Task AddUser(User user);
        Task DeleteUserById(Guid id);
        Task EditUser(Guid id, User user);
    }
}
