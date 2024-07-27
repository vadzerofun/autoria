using Application.DTOs;
using Application.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SendGrid;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<Result<List<UserDTO>>> GetUsers();
        Task<Result<UserDTO>> GetUserById(Guid id);
        Task<Result<UserDTO>> GetUserByName(string name);
        Task<Result<UserDTO>> GetUserByEmail(string email);
        Task<Result> AddUser(UserDTO user);
        Task<Result> DeleteUserById(Guid id);
        Task<Result> EditUser(Guid id, UserDTO user);
        Task<Result<string>> Login(Login login);
        Task<Result<Response>> SendConfirmEmail(string Email, string SuccessLink, string BadLink);
        Task<Result> ConfirmEmail(string token);
    }
}
