﻿using Application.Interfaces;
using Application.Model;
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
        public NewsController(INewsService newsService, IImageUploader imageUploader)
        {
            _newsService = newsService;
            _imageUploader = imageUploader;
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

        [HttpPost("AddNews")]
        public async Task<Result> AddNews([FromForm] News news, [FromForm] IFormFile[] ImageFile)
        {
            var imgpath = await _imageUploader.UploadImage(ImageFile[0]);
            news.ImageLink = imgpath;
            var result = await _newsService.AddNew(news);
            if (result.IsSuccess)
            {
                return Result.Success();
            }
            return Result.Failure(result.ErrorMessage);
        }

        //[HttpPut("EditNews/{id}")]
        //public async Task<Result> EditNews(Guid id, [FromForm] News news, [FromForm] IFormFile image)
        //{
        //    if (image != null)
        //    {
        //        var imgpath = await _imageUploader.UploadImage(image);
        //        news.ImageLink = imgpath;
        //    }
        //    else
        //    {
        //        var newsimg = await _newsService.GetNews(id);
        //        news.ImageLink = newsimg.Value.ImageLink;
        //    }
        //    var result = await _newsService.EditNews(id, news);
        //    if (result.IsSuccess)
        //    {
        //        return Result.Success();
        //    }
        //    return Result.Failure(result.ErrorMessage);
        //}

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
