using Application.Interfaces;
using Application.Model;
using autoria_api.Atributes;
using Core.Enums;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;
        private readonly IImageUploader _imageUploader;
        private readonly IUserService _userService;
        public NewsController(INewsService newsService, IImageUploader imageUploader, IUserService userService)
        {
            _newsService = newsService;
            _imageUploader = imageUploader;
            _userService = userService;
        }
        [HttpGet]
        public async Task<Result<List<News>>> GetNews()
        {
            var news = await _newsService.GetNews();
            if (news.IsSuccess)
            {
                return Result<List<News>>.Success(news.Value);
            }
            return Result<List<News>>.Failure(news.ErrorMessage);
        }

        [HttpGet("{id}")]
        public async Task<Result<News>> GetNews(Guid id)
        {
            var news = await _newsService.GetNews(id);
            if (news.IsSuccess)
            {
                return Result<News>.Success(news.Value);
            }
            return Result<News>.Failure(news.ErrorMessage);
        }

        [Authorize(Policy = "Admin-Policy")]
        [HttpPost("AddNews")]
        public async Task<Result> AddNews([FromForm] News news, [FromForm] IFormFile[] ImageFile)
        {
            string imgpath;
            if (ImageFile != null)
                imgpath = await _imageUploader.UploadImage(ImageFile[0]);
            else
                imgpath = "";
            news.ImageLink = imgpath;
            var result = await _newsService.AddNew(news);
            if (result.IsSuccess)
            {
                return Result.Success();
            }
            return Result.Failure(result.ErrorMessage);
        }

        [HttpPut("EditNews/{id}")]
        public async Task<Result> EditNews(Guid id, [FromForm] News news, [FromForm] IFormFile[] image)
        {
            if (image != null)
            {
                var imgpath = await _imageUploader.UploadImage(image[0]);
                news.ImageLink = imgpath;
            }
            else
            {
                var newsimg = await _newsService.GetNews(id);
                news.ImageLink = newsimg.Value.ImageLink;
            }
            var result = await _newsService.EditNews(id, news);
            if (result.IsSuccess)
            {
                return Result.Success();
            }
            return Result.Failure(result.ErrorMessage);
        }

        [Authorize]
        [HttpPost("LikeNews")]
        public async Task<Result> LikeNews(Guid Id, Guid UserId)
        {
            var res = await _newsService.AddLike(Id, UserId);
            if (res.IsSuccess)
            {
                return Result.Success();
            }
            return Result.Failure(res.ErrorMessage);
        }

        [HttpDelete("{id}")]
        public async Task<Result> DeleteNews(Guid id)
        {
            var result = await _newsService.Delete(id);
            if (result.IsSuccess)
            {
                return Result.Success();
            }
            return Result.Failure(result.ErrorMessage);
        }

    }
}
