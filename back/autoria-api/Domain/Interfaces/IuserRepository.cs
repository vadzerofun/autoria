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
        Task<User> GetUserByPhone(string phone);
        Task AddUser(User user);
        Task DeleteUserById(Guid id);
        Task EditUser(Guid id, User user);
        Task ConfirmUserEmail(string Email);
        Task AddCarIdToUser(Guid UserId, Guid CarId);
        Task Visit(Guid UserId);
        Task ChengePassword(string Password, Guid UserId);
        Task AddNewsToUser(Guid UserId, Guid NewsId);
        Task RemoveNews(Guid UserId, Guid NewsId);
        Task<User> GetUserByRefreshToken(string refreshToken);
    }
}
