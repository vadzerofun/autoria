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
        //TODO: зробти NewsRepository
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
            var news = await _context.News.ToListAsync();
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
            news.Likes.Add(UserId);
            await EditNews(news.Id, news);
            return;
        }
    }
}
