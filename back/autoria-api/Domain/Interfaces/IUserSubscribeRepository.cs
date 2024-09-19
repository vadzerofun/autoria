using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IUserSubscribeRepository
    {
        public Task CreateUserSubscribe(UserSubscribe userSubscribe);
        public Task<List<UserSubscribe>> GetUserSubscribe();
        public Task<UserSubscribe> GetUserSubscribe(Guid Id);
        public Task DeleteUserSubscribe(Guid Id);
        public Task<List<Guid>> GetTopCarsId();
        public Task<List<Guid>> GetTopCarsId(int count);
        public Task<IEnumerable<UserSubscribe>> GetSubscriptionsByUserIdAsync(Guid userId);
    }
}
