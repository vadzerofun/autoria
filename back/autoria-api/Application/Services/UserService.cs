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
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IuserRepository _userRepository;
        private readonly IOptions<AuthOption> _authOption;
        private readonly IJWTTokenService _jwtTokenService;
        private readonly IEmailService _emailService;
        private readonly IEncryptionService _encryptionService;
        public UserService(IuserRepository userRepository, IOptions<AuthOption> authOption, IEmailService emailService, IEncryptionService encryptionService, IJWTTokenService jWTTokenService)
        {
            _userRepository = userRepository;
            _authOption = authOption;
            _jwtTokenService = jWTTokenService;
            _emailService = emailService;
            _encryptionService = encryptionService;
        }
        public async Task<Result> AddUser(User user)
        {
            if (await _userRepository.GetUserByEmail(user.Email) != null)
                return Result.Failure("Email is already in use");

            if (await _userRepository.GetUserByPhone(user.Phone) != null)
                return Result.Failure("Phone is already in use");

            user.lastVisitedDate = DateTime.UtcNow;
            user.CreatedTime = DateTime.UtcNow;
            user.userRole = UserRole.Admin;

            await _userRepository.AddUser(user);
            return Result.Success();
        }

        public async Task<Result<Response>> SendConfirmEmail(string Email, string SuccessLink, string BadLink)
        {
            var user = await _userRepository.GetUserByEmail(Email);
            if (user == null)
                return Result<Response>.Failure("no such email");

            string Token = await _jwtTokenService.GenerateJWT(user);
            string HashToken = _encryptionService.Encrypt(Token);
            string contitueEmail = $"https://localhost:7224/api/User/ConfirmEmail?Token={Uri.EscapeDataString(HashToken)}&SuccessLink={Uri.EscapeDataString(SuccessLink)}&BadLink={Uri.EscapeDataString(BadLink)}";
            var plainTextContent = "Press this button to confirm your email";
            var htmlContent = $@"
            <strong>Підтвердіть вашу електронну пошту.</strong>
            <br><br>
            <a href='{contitueEmail}' style='display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #4CAF50; text-align: center; text-decoration: none; border-radius: 5px;'>Підтвердити пошту</a>";
            var subject = "Check Email";
            var response = await _emailService.SendEmail(Email, plainTextContent, htmlContent, subject);

            if (response.IsSuccessStatusCode)
            {
                return Result<Response>.Success(response);
            }
            return Result<Response>.Failure(response.StatusCode.ToString());

        }

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
        public async Task<Result> EditUser(Guid id, User user)
        {
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

        public async Task<Result<User>> GetUserByEmail(string email)
        {
            User user = await _userRepository.GetUserByEmail(email);
            if (user == null)
                return Result<User>.Failure("no such user");

            return Result<User>.Success(user);
        }

        public async Task<Result<User>> GetUserById(Guid id)
        {
            Core.Models.User user = await _userRepository.GetUserById(id);
            if (user == null)
                return Result<User>.Failure("no such user");

            return Result<User>.Success(user);
        }

        public async Task<Result<User>> GetUserByName(string name)
        {
            Core.Models.User user = await _userRepository.GetUserByName(name);
            if (user == null)
                return Result<User>.Failure("no such user");

            return Result<User>.Success(user);
        }

        public async Task<Result<List<User>>> GetUsers()
        {
            try
            {
                List<User> users = await _userRepository.GetUsers();
                return Result<List<User>>.Success(users);
            }
            catch (Exception ex)
            {
                return Result<List<User>>.Failure(ex.Message);
            }
        }

        public async Task<Result<RefreshTokenResponse>> Login(Login login)
        {
            //var user = _userRepository.GetUsers().Result.FirstOrDefault(user => user.Email == login.Email && user.Password == login.Password);

            //if (user == null)
            //    return Result<string>.Failure("No such User");

            //if (!user.IsEmailConfirmed)
            //    return Result<string>.Failure("Email is not confirmed!");


            //await _userRepository.Visit(user.Id);

            //var token = _jwtTokenService.GenerateJWT(user);

            //return Result<string>.Success(token);
            var user = _userRepository.GetUsers().Result.FirstOrDefault(user => user.Email == login.Email && user.Password == login.Password);

            if (user == null)
                return Result<RefreshTokenResponse>.Failure("No such User");

            if (!user.IsEmailConfirmed)
                return Result<RefreshTokenResponse>.Failure("Email is not confirmed!");

            await _userRepository.Visit(user.Id);

            var token = await _jwtTokenService.GenerateJWT(user);
            var refreshToken = await _jwtTokenService.GenerateRefreshToken(user);

            // Можна повернути обидва токени в одному об'єкті
            var response = new RefreshTokenResponse
            {
                Token = token,
                RefreshToken = refreshToken
            };

            return Result<RefreshTokenResponse>.Success(response);
        }

        public async Task<Result> ConfirmEmail(string hashToken)
        {
            string Token = _encryptionService.Decrypt(hashToken);
            var principal = await _jwtTokenService.ValidateToken(Token);
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

        public async Task<Result<Response>> ForgotPassword(string Email, string Link)
        {
            var user = await _userRepository.GetUserByEmail(Email);
            if (user == null)
                return Result<Response>.Failure("no such user");

            string Token = await _jwtTokenService.GenerateJWT(user);
            string HashToken = _encryptionService.Encrypt(Token);
            string contitueEmail = $"{Link}/{Uri.EscapeDataString(HashToken)}";
            var plainTextContent = "Press this button to chenge password";
            var htmlContent = $@"
            <strong>Chenge password.</strong>ф
            <br><br>
            <a href='{contitueEmail}' style='display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #4CAF50; text-align: center; text-decoration: none; border-radius: 5px;'>Змінити пароль</a>";
            var subject = "Chenge Password";
            var response = await _emailService.SendEmail(Email, plainTextContent, htmlContent, subject);

            if (response.IsSuccessStatusCode)
            {
                return Result<Response>.Success(response);
            }
            return Result<Response>.Failure(response.StatusCode.ToString());
        }

        public async Task<Result> ChengeForgotPassword(string NewPassword, string Token)
        {
            var UnhashToken = _encryptionService.Decrypt(Token);
            var peripteral = await _jwtTokenService.ValidateToken(UnhashToken);
            if (peripteral == null)
                return Result.Failure("Bad Token");
            var userId = peripteral.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Result.Failure("Bad Token");
            await _userRepository.ChengePassword(NewPassword, Guid.Parse(userId));
            return Result.Success();
        }

        public async Task<Result<RefreshTokenResponse>> RefreshToken(RefreshTokenRequest request)
        {
            if (await _jwtTokenService.ValidateRefreshToken(request.RefreshToken))
            {
                var user = await _userRepository.GetUserByRefreshToken(request.RefreshToken);
                if (user != null)
                {
                    // Видаляємо старий refresh токен, якщо це потрібно
                    await _jwtTokenService.RevokeRefreshToken(request.RefreshToken);

                    var newToken = await _jwtTokenService.GenerateJWT(user);
                    var newRefreshToken = await _jwtTokenService.GenerateRefreshToken(user);

                    var response = new RefreshTokenResponse
                    {
                        Token = newToken,
                        RefreshToken = newRefreshToken
                    };

                    return  Result<RefreshTokenResponse>.Success(response);
                }
                return Result<RefreshTokenResponse>.Failure("Invalid refresh token");
            }
            return Result<RefreshTokenResponse>.Failure("Invalid or expired refresh token");
        }
        public async Task<Result> Logout(string RefreshToken)
        {
            if (await _jwtTokenService.ValidateRefreshToken(RefreshToken))
            {
                _jwtTokenService.RevokeRefreshToken(RefreshToken);
                return Result.Success();
            }
            return Result.Failure("Invalid refresh token");
        }
    }
}
