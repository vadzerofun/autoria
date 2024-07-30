using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using Core.Interfaces;
using Application.Model;

namespace Application.Interfaces
{
    public interface INewsService
    {
        //TODO: доробити INewsService
        public Task<Result> AddNew(News news);
        public Task<Result> Delete(Guid Id);
        public Task<Result<List<News>>> GetNews();
        public Task<Result<News>> GetNews(Guid Id);
        public Task<Result> EditNews(Guid Id, News news);
        public Task<Result> AddLike(Guid Id, Guid UserId);

    }
}
