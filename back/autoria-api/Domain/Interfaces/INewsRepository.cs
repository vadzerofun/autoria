using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Interfaces
{
    public interface INewsRepository
    {
        //TODO: Доробити інтерфейс INewsRepository
        public Task AddNews(News news);
        public Task EditNews(Guid Id, News news);
        public Task DeleteNews(Guid Id);
        public Task<List<News>> GetNews();
        public Task<News> GetNews(Guid id);
        
    }
}
