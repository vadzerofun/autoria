using Application.Model;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ISubscribeService
    {
        public Task<Result> AddSubscribe(Subscribe subscribe);
        public Task<Result<List<Subscribe>>> GetSubscribes();
        public Task<Result> RemoveSubscribe(Guid Id);
        public Task<Result<Subscribe>> GetSubscribe(Guid Id);
    }
}
