using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class NewsRepository : INewsRepository
    {
        private readonly AppDbContext _context;
        public NewsRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddNews(News news)
        {
            _context.News.Add(news);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task DeleteNews(Guid Id)
        {
            if (_context.News == null)
            {
                return;
            }
            var News = await _context.News.FindAsync(Id);
            if (News == null)
            {
                return;
            }

            _context.News.Remove(News);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task<News> GetNews(Guid id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null)
                return null;
            return news;
        }

        public async Task<List<News>> GetNews()
        {
            var news = await _context.News.OrderByDescending(news => news.WritingTime).ToListAsync();
            return news;
        }
        public async Task EditNews(Guid Id, News news)
        {
            var tempNews = await _context.News.FindAsync(Id);
            if (tempNews == null)
                return;
            _context.News.Remove(tempNews);
            await _context.SaveChangesAsync();
            _context.News.Add(news);
            await _context.SaveChangesAsync();
        }

        public async Task Addlike(Guid id, Guid UserId)
        {
            var news = await GetNews(id);
            if (news == null) return;
            if (news.Likes == null) news.Likes = new List<Guid>();
            if (news.Likes.Contains(UserId))
                return;
            news.Likes.Add(UserId);
            await EditNews(news.Id, news);
            return;
        }

        public async Task<int> GetLikesCount(Guid Id)
        {
            var news = await GetNews(Id);
            if (news == null) return 0;
            if (news.Likes == null) return 0;
            int LikesCount = news.Likes.Count;
            return LikesCount;
        }

        public async Task RemoveLike(Guid id, Guid UserId)
        {
            var news = await GetNews(id);
            if (news == null) return;
            news.Likes.Remove(UserId);
            await EditNews(id, news);
            return;
        }
    }
}
