using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IJWTTokenService
    {
        Task<string> GenerateJWT(User user);
        Task<ClaimsPrincipal> ValidateToken(string token);
        Task<string> GenerateRefreshToken(User user);
        Task<bool> ValidateRefreshToken(string token);
        Task RevokeRefreshToken(string token);

    }
}
