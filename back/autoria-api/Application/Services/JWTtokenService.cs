using Application.Model;
using Core.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text.Unicode;
using Core.Interfaces;
using Application.Interfaces;

namespace Application.Services
{
    public class JWTtokenService: IJWTTokenService
    {
        private readonly IOptions<AuthOption> _authOption;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public JWTtokenService(IOptions<AuthOption> authOption, IRefreshTokenRepository refreshTokenRepository)
        {
            _authOption = authOption;
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<string> GenerateJWT(User user)
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

        public async Task<ClaimsPrincipal> ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = _authOption.Value.GetSymmetricSecurityKey();

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _authOption.Value.Issuer,
                    ValidAudience = _authOption.Value.Audience,
                    IssuerSigningKey = key,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return principal;
            }
            catch
            {
                return null;
            }
        }
        public async Task<string> GenerateRefreshToken(User user)
        {
            var refreshToken = new RefreshToken
            {
                Token = Guid.NewGuid().ToString(),
                ExpiryDate = DateTime.UtcNow.AddMonths(5),
                UserId = user.Id
            };

            _refreshTokenRepository.AddRefreshToken(refreshToken);
            return refreshToken.Token;
        }

        public async Task<bool> ValidateRefreshToken(string token)
        {
            var refreshToken = await _refreshTokenRepository.GetRefreshToken(token);
            return refreshToken != null && refreshToken.ExpiryDate > DateTime.UtcNow;
        }

        public async Task RevokeRefreshToken(string token)
        {
            _refreshTokenRepository.DeleteRefreshToken(token);
        }
    }
}
