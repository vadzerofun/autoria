using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class RefreshTokenRepository: IRefreshTokenRepository
    {
        private readonly AppDbContext _context;

        public RefreshTokenRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddRefreshToken(RefreshToken token)
        {
            _context.refreshTokens.Add(token);
            await _context.SaveChangesAsync();
        }

        public async Task<RefreshToken> GetRefreshToken(string token)
        {
            return await _context.refreshTokens.SingleOrDefaultAsync(t => t.Token == token);
        }

        public async Task DeleteRefreshToken(string token)
        {
            var refreshToken = _context.refreshTokens.SingleOrDefault(t => t.Token == token);
            if (refreshToken != null)
            {
                _context.refreshTokens.Remove(refreshToken);
                await _context.SaveChangesAsync();
            }
        }
    }
}
