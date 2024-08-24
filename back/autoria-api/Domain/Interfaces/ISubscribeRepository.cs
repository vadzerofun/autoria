using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ISubscribeRepository
    {
        public Task AddSubscribe(Subscribe subscribe);
        public Task RemoveSubscribe(Guid Id);
        public Task<List<Subscribe>> GetSubscribes();
        public Task<Subscribe> GetSubscribe(Guid Id);
    }
}
