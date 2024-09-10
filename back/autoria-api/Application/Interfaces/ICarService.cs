﻿using Application.Model;
using Application.Services;
using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ICarService
    {
        public Task<List<Cars>> GetCars(int page, int pageSize);
        public Task<Cars> GetCarById(Guid id);
        public Task AddCar(Cars car);
        public Task DeleteCarById(Guid id);
        public Task EditCar(Guid id, Cars car);
        public Task AddImageToCar(Guid id, List<string> ImageFiles);
        public Task DeleteImageFromCar(Guid id, string ImageName);
        public Task<List<Cars>> GetCarByMark(Guid mark);
        public Task<List<Cars>> GetCarByFilter(CarFilter filter, int page, int pageSize);
        public Task<List<Cars>> GetCarsForYou();
        public Task<List<Cars>> GetMostProfitable();
        public Task<Result> ViewCar(Guid Carid);
        public Task<Result> ViewPhone(Guid Carid);
        public Task<Result<List<Cars>>> GetCarsByUserId(Guid UserId);
        public Task<Result> Like(Guid Id, Guid UserId);
        public Task<Result<List<Cars>>> GetTopCars();
        public Task<Result<List<Cars>>> GetTopCars(int count);
        public Task<Result<List<Cars>>> GetLikedCarsByUserId(Guid userId, int Page, int PageSize);
    }
}
