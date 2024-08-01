using Core.Models;
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
        Task<Result<List<User>>> GetUsers();
        Task<Result<User>> GetUserById(Guid id);
        Task<Result<User>> GetUserByName(string name);
        Task<Result<User>> GetUserByEmail(string email);
        Task<Result> AddUser(User user);
        Task<Result> DeleteUserById(Guid id);
        Task<Result> EditUser(Guid id, User user);
        Task<Result<string>> Login(Login login);
        Task<Result<Response>> SendConfirmEmail(string Email, string SuccessLink, string BadLink);
        Task<Result> ConfirmEmail(string hashToken);
        Task<Result<Response>> ForgotPassword(string Email, string SuccessLink, string BadLink);
    }
}
