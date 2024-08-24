using Application.Interfaces;
using Application.Model;
using Core.Enums;
using Core.Interfaces;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserSubscribeService : IUserSubscribeService
    {
        public readonly IUserSubscribeRepository _userSubscribeRepository;
        public readonly IuserRepository _userRepository;
        public readonly ISubscribeRepository _subscribeRepository;
        public UserSubscribeService(IUserSubscribeRepository userSubscribeRepository, IuserRepository userRepository, ISubscribeRepository subscribeRepository)
        {
            _userSubscribeRepository = userSubscribeRepository;
            _userRepository = userRepository;
            _subscribeRepository = subscribeRepository;
        }
        public async Task<Result> AddUserSubscribe(UserSubscribe userSubscribe)
        {
            try
            {
                await _userSubscribeRepository.CreateUserSubscribe(userSubscribe);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        public async Task<Result> BuyUserSubscribe(UserSubscribe userSubscribe)
        {
            try
            {
                var user = await _userRepository.GetUserById(userSubscribe.UserId);
                if (user == null) return Result.Failure("No such User");

                var Subscribe = await _subscribeRepository.GetSubscribe(userSubscribe.SubscribeId);
                if (Subscribe == null) return Result.Failure("No Such Subscribe");

                if (user.Balance < Subscribe.Price) return Result.Failure("insufficient funds");
                user.Balance -= Subscribe.Price;

                if (Subscribe.Subscribe_Level != Subscribe_Level.Level3)
                    userSubscribe.CarsId = new List<Guid>() { userSubscribe.CarsId[0] };

                userSubscribe.SubEndTime = DateTime.Now.Add(Subscribe.subTime);

                await _userRepository.EditUser(user.Id, user);
                await _userSubscribeRepository.CreateUserSubscribe(userSubscribe);

                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        public async Task<Result<List<Guid>>> GetTopCarsId()
        {
            try
            {
                var cars = await _userSubscribeRepository.GetTopCarsId();
                return Result<List<Guid>>.Success(cars);
            }
            catch (Exception ex)
            {
                return Result<List<Guid>>.Failure(ex.Message);
            }
        }

        public async Task<Result<UserSubscribe>> GetUserSubscribe(Guid Id)
        {
            try
            {
                var sub = await _userSubscribeRepository.GetUserSubscribe(Id);
                return Result<UserSubscribe>.Success(sub);
            }
            catch (Exception ex)
            {
                return Result<UserSubscribe>.Failure(ex.Message);
            }
        }

        public async Task<Result<List<UserSubscribe>>> GetUserSubscribes()
        {
            try
            {
                var sub = await _userSubscribeRepository.GetUserSubscribe();
                return Result<List<UserSubscribe>>.Success(sub);
            }
            catch (Exception ex)
            {
                return Result<List<UserSubscribe>>.Failure(ex.Message);
            }
        }
    }
}
