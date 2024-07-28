using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Core.Models;
using Core.Interfaces;
using Application.Model;

namespace Application.Services
{
    public class NewsService : INewsService
    {
        private readonly INewsRepository _repository;

        public NewsService(INewsRepository repository)
        {
            _repository = repository;
        }


        public async Task<Result> AddNew(News news)
        {
            try
            {
                await _repository.AddNews(news);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        public async Task<Result> Delete(Guid Id)
        {
            try
            {
                await _repository.DeleteNews(Id);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        public async Task<Result> EditNews(Guid Id, News news)
        {
            try
            {
                await _repository.EditNews(Id, news);
                return Result.Success();
            }catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        public async Task<Result<List<News>>> GetNews()
        {
            try
            {
                return Result<List<News>>.Success(await _repository.GetNews());
            }catch (Exception ex)
            {
                return Result<List<News>>.Failure(ex.Message);
            }
        }

        public async Task<Result<News>> GetNews(Guid Id)
        {
            try
            {
                return Result<News>.Success(await _repository.GetNews(Id));
            }
            catch (Exception ex)
            {
                return Result<News>.Failure(ex.Message);
            }
        }
    }
}
