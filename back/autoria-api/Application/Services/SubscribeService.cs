using Application.Interfaces;
using Application.Model;
using Core.Interfaces;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class SubscribeService : ISubscribeService
    {
        private readonly ISubscribeRepository subscribeRepository;
        private readonly IuserRepository userRepository;

        public SubscribeService(ISubscribeRepository subscribeRepository, IuserRepository iuserRepository)
        {
            this.subscribeRepository = subscribeRepository;
            this.userRepository = iuserRepository;
        }

        public async Task<Result> AddSubscribe(Subscribe subscribe)
        {
            try
            {
                await subscribeRepository.AddSubscribe(subscribe);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        public async Task<Result<List<Subscribe>>> GetSubscribes()
        {
            try
            {
                var subscribes = await subscribeRepository.GetSubscribes();
                return Result<List<Subscribe>>.Success(subscribes);
            }
            catch (Exception ex)
            {
                return Result<List<Subscribe>>.Failure(ex.Message);
            }
        }

        public async Task<Result> RemoveSubscribe(Guid Id)
        {
            try
            {
                await subscribeRepository.RemoveSubscribe(Id);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        public async Task<Result<Subscribe>> GetSubscribe(Guid Id)
        {
            try
            {
                var subscribe = await subscribeRepository.GetSubscribe(Id);
                if (subscribe == null)
                {
                    return Result<Subscribe>.Failure("Subscribe not found.");
                }
                return Result<Subscribe>.Success(subscribe);
            }
            catch (Exception ex)
            {
                return Result<Subscribe>.Failure(ex.Message);
            }
        }
    }
}
