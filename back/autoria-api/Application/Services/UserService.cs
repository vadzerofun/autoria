using Application.DTOs;
using Application.Interfaces;
using Core.Enums;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Application.Model;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using SendGrid.Helpers.Mail;
using SendGrid;
using Application.Services;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IuserRepository _userRepository;
        private readonly IOptions<AuthOption> _authOption;
        private readonly JWTtokenService _jwtTokenService;
        public UserService(IuserRepository userRepository, IOptions<AuthOption> authOption)
        {
            _userRepository = userRepository;
            _authOption = authOption;
            _jwtTokenService = new JWTtokenService(authOption);
        }
        public async Task<Result> AddUser(UserDTO userDTO)
        {

            var user = new User
            {
                Id = userDTO.Id,
                Name = userDTO.Name,
                Email = userDTO.Email,
                Phone = userDTO.Phone,
                Password = userDTO.Password,
                userRole = 0,
                IsEmailConfirmed = false,
                CarsId = new List<Guid>()
            };


            if (await _userRepository.GetUserByEmail(userDTO.Email) != null)
                return Result.Failure("Email is already in use");

            if (await _userRepository.GetUserByPhone(userDTO.Phone) != null)
                return Result.Failure("Phone is already in use");

            await _userRepository.AddUser(user);
            return Result.Success();
        }

        public async Task<Result<Response>> SendConfirmEmail(string Email, string SuccessLink, string BadLink)
        {
            var user = await _userRepository.GetUserByEmail(Email);
            if (user == null)
                return Result<Response>.Failure("no such email");

            string Token = _jwtTokenService.GenerateJWT(user);
            string contitueEmail = $"https://localhost:7224/api/User/ConfirmEmail?Token={Token}&SuccessLink={SuccessLink}&BadLink={BadLink}";
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("dimarudik317@gmail.com", "Autoria");
            var subject = "Check Email";
            var to = new EmailAddress(Email, "User");
            var plainTextContent = "Press this button to confirm your email";
            var htmlContent = $@"
            <strong>Підтвердіть вашу електронну пошту.</strong>
            <br><br>
            <a href='{contitueEmail}' style='display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #4CAF50; text-align: center; text-decoration: none; border-radius: 5px;'>Підтвердити пошту</a>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            Response response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                return Result<Response>.Success(response);
            }
            return Result<Response>.Failure(response.StatusCode.ToString());

        }

        //TODO: Тільки юзер якого видаляють
        public async Task<Result> DeleteUserById(Guid id)
        {
            try
            {
                await _userRepository.DeleteUserById(id);
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
            return Result.Success();
        }
        //TODO: Тільки юзер якого редагують
        public async Task<Result> EditUser(Guid id, UserDTO userDTO)
        {
            User user = new User
            {
                Id = id,
                Email = userDTO.Email,
                Name = userDTO.Name,
                Password = userDTO.Password,
                Phone = userDTO.Phone,
                userRole = userDTO.userRole,
                CarsId = userDTO.CarsId
            };
            try
            {
                await _userRepository.EditUser(id, user);
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
            return Result.Success();
        }

        public async Task<Result<UserDTO>> GetUserByEmail(string email)
        {
            User user = await _userRepository.GetUserByEmail(email);
            if (user == null)
                return Result<UserDTO>.Failure("no such user");
            UserDTO userDto = new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Phone = user.Phone,
                userRole = user.userRole,
                IsEmailConfirmed = user.IsEmailConfirmed,
                CarsId = user.CarsId,
            };

            return Result<UserDTO>.Success(userDto);
        }

        public async Task<Result<UserDTO>> GetUserById(Guid id)
        {
            User user = await _userRepository.GetUserById(id);
            if (user == null)
                return Result<UserDTO>.Failure("no such user");
            UserDTO userDto = new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Phone = user.Phone,
                userRole = user.userRole,
                IsEmailConfirmed = user.IsEmailConfirmed,
                CarsId = user.CarsId,
            };

            return Result<UserDTO>.Success(userDto);
        }

        public async Task<Result<UserDTO>> GetUserByName(string name)
        {
            User user = await _userRepository.GetUserByName(name);
            if (user == null)
                return Result<UserDTO>.Failure("no such user");
            UserDTO userDto = new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Phone = user.Phone,
                userRole = user.userRole,
                IsEmailConfirmed = user.IsEmailConfirmed,
                CarsId = user.CarsId,
            };

            return Result<UserDTO>.Success(userDto);
        }

        public async Task<Result<List<UserDTO>>> GetUsers()
        {
            try
            {
                List<User> users = await _userRepository.GetUsers();
                List<UserDTO> userDTOs = new List<UserDTO>();
                foreach (var user in users)
                {
                    userDTOs.Add(new UserDTO
                    {
                        Id = user.Id,
                        Email = user.Email,
                        Name = user.Name,
                        Phone = user.Phone,
                        userRole = user.userRole,
                        IsEmailConfirmed = user.IsEmailConfirmed,
                        CarsId = user.CarsId,
                    });
                }
                return Result<List<UserDTO>>.Success(userDTOs);
            }
            catch (Exception ex)
            {
                return Result<List<UserDTO>>.Failure(ex.Message);
            }
        }

        public async Task<Result<string>> Login(Login login)
        {
            var user = _userRepository.GetUsers().Result.FirstOrDefault(user => user.Email == login.Email && user.Password == login.Password);

            

            if (user != null)
            {
                if (!user.IsEmailConfirmed)
                    return Result<string>.Failure("Email is not confirmed!");


                var token = _jwtTokenService.GenerateJWT(user);

                return Result<string>.Success(token);
            }

            return Result<string>.Failure("No such User");
        }

        public async Task<Result> ConfirmEmail(string token)
        {
            var principal = _jwtTokenService.ValidateToken(token);
            if (principal == null)
                return Result.Failure("Old Link");
            var email = principal.FindFirst(ClaimTypes.Email)?.Value;

            await _userRepository.ConfirmUserEmail(email);
            return Result.Success();
        }

        public async Task<Result> AddCarIdToUser(Guid UserId, Guid CarId)
        {
            try
            {
                await _userRepository.AddCarIdToUser(UserId, CarId);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }
    }
}
