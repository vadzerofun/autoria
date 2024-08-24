using Application.Model;
using Core.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserSubscribeService
    {
        public Task<Result> AddUserSubscribe(UserSubscribe userSubscribe);
        public Task<Result<List<UserSubscribe>>> GetUserSubscribes();
        public Task<Result<UserSubscribe>> GetUserSubscribe(Guid Id);
        public Task<Result> BuyUserSubscribe(UserSubscribe userSubscribe);
        public Task<Result<List<Guid>>> GetTopCarsId();
    }
}
