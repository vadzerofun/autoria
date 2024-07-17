using Application.DTOs;
using Application.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDTO>> GetUsers();
        Task<UserDTO> GetUserById(Guid id);
        Task<UserDTO> GetUserByName(string name);
        Task<UserDTO> GetUserByEmail(string email);
        Task AddUser(UserDTO user);
        Task DeleteUserById(Guid id);
        Task EditUser(Guid id, UserDTO user);
        Task<string> Login(Login login);
    }
}
