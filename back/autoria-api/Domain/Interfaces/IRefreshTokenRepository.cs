using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IRefreshTokenRepository
    {
        Task AddRefreshToken(RefreshToken token);
        Task<RefreshToken> GetRefreshToken(string token);
        Task DeleteRefreshToken(string token);
    }
}
