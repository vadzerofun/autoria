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
        private readonly IuserRepository _userRepository;
        private readonly INewsRepository _NewsRepository;

        public NewsService(INewsRepository repository, IuserRepository userRepository)
        {
            _NewsRepository = repository;
            _userRepository = userRepository;
        }

        public async Task<Result> AddLike(Guid Id, Guid UserId)
        {
            try
            {
                var news = await _NewsRepository.GetNews(Id);
                if (news == null) return Result.Failure("No Such News");
                if (news.Likes.Contains(UserId))
                {
                    await _NewsRepository.RemoveLike(Id, UserId);
                    await _userRepository.RemoveNews(UserId, Id);
                }
                else
                {
                    await _NewsRepository.Addlike(Id, UserId);
                    await _userRepository.AddNewsToUser(UserId, Id);
                }
                return Result.Success();
            }catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        public async Task<Result> AddNew(News news)
        {
            try
            {
                news.WritingTime = DateTime.Now;
                news.Likes = new List<Guid>();
                news.Id = Guid.NewGuid();
                await _NewsRepository.AddNews(news);
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
                await _NewsRepository.DeleteNews(Id);
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
                await _NewsRepository.EditNews(Id, news);
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
                return Result<List<News>>.Success(await _NewsRepository.GetNews());
            }catch (Exception ex)
            {
                return Result<List<News>>.Failure(ex.Message);
            }
        }

        public async Task<Result<News>> GetNews(Guid Id)
        {
            try
            {
                return Result<News>.Success(await _NewsRepository.GetNews(Id));
            }
            catch (Exception ex)
            {
                return Result<News>.Failure(ex.Message);
            }
        }

        public async Task<Result<int>> GetNewsLikes(Guid Id)
        {
            try
            {
                var likes = await _NewsRepository.GetLikesCount(Id);
                return Result<int>.Success(likes);
            }
            catch (Exception ex)
            {
                return Result<int>.Failure(ex.Message);
            }
        }
    }
}
