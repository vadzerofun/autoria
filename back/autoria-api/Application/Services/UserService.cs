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
using Common;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IuserRepository _userRepository;
        private readonly IOptions<AuthOption> _authOption;
        public UserService(IuserRepository userRepository, IOptions<AuthOption> authOption)
        {
            _userRepository = userRepository;
            _authOption = authOption;
        }
        public async Task AddUser(UserDTO userDTO)
        {
            var user = new User
            {
                Id = userDTO.Id,
                Name = userDTO.Name,
                Email = userDTO.Email,
                Phone = userDTO.Phone,
                Password = userDTO.Password,
                userRole = 0
            };
            await _userRepository.AddUser(user);
            return;
        }

        public async Task DeleteUserById(Guid id)
        {
            await _userRepository.DeleteUserById(id);
            return;
        }

        public async Task EditUser(Guid id, UserDTO userDTO)
        {
            User user = new User
            {
                Id = id,
                Email = userDTO.Email,
                Name = userDTO.Name,
                Password = userDTO.Password,
                Phone = userDTO.Phone,
                userRole = userDTO.userRole
            };
            await _userRepository.EditUser(id, user);
        }

        public async Task<UserDTO> GetUserByEmail(string email)
        {
            User user = await _userRepository.GetUserByEmail(email);
            if (user == null)
                return null;
            UserDTO userDto = new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Phone = user.Phone,
                userRole = user.userRole
            };

            return userDto;
        }

        public async Task<UserDTO> GetUserById(Guid id)
        {
            User user = await _userRepository.GetUserById(id);
            if (user == null)
                return null;
            UserDTO userDto = new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Phone = user.Phone,
                userRole = user.userRole
            };

            return userDto;
        }

        public async Task<UserDTO> GetUserByName(string name)
        {
            User user = await _userRepository.GetUserByName(name);
            if (user == null)
                return null;
            UserDTO userDto = new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Phone = user.Phone,
                userRole = user.userRole
            };

            return userDto;
        }

        public async Task<List<UserDTO>> GetUsers()
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
                    userRole = user.userRole
                });
            }
            return userDTOs;
        }

        public async Task<string> Login(Login login)
        {
            var user = _userRepository.GetUsers().Result.FirstOrDefault(user => user.Email == login.Email && user.Password == login.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);

                return token;
            }

            return null;
        }

        private string GenerateJWT(User user)
        {
            var authParams = _authOption.Value;

            var SecurityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            claims.Add(new Claim("role", user.userRole.ToString()));

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
