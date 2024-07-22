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

namespace Application.Services
{
    public class JWTtokenService
    {
        private readonly IOptions<AuthOption> _authOption;

        public JWTtokenService(IOptions<AuthOption> authOption)
        {
            _authOption = authOption;
        }

        public string GenerateJWT(User user)
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

        public ClaimsPrincipal ValidateToken(string token)
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
                    ClockSkew = TimeSpan.Zero // Токен не повинен мати "часового зміщення"
                }, out SecurityToken validatedToken);

                return principal;
            }
            catch
            {
                // Токен недійсний або прострочений
                return null;
            }
        }
    }
}
