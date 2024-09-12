using Application.Interfaces;
using Application.Model;
using Core.Interfaces;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class MarksService : IMarksService
    {
        private readonly IMarkRepository _markRepository;

        public MarksService(IMarkRepository markRepository)
        {
            _markRepository = markRepository;
        }

        // Отримати всі марки
        public async Task<Result<List<Marks>>> GetMarksAsync()
        {
            try
            {
                var marks = await _markRepository.Getmarks();
                return Result<List<Marks>>.Success(marks);
            }
            catch (Exception ex)
            {
                return Result<List<Marks>>.Failure(ex.Message);
            }
        }

        // Додати нову марку
        public async Task<Result> AddMarkAsync(Marks mark)
        {
            try
            {
                await _markRepository.Addmarks(mark);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }

        // Видалити марку за ID
        public async Task<Result> RemoveMarkAsync(Guid id)
        {
            try
            {
                await _markRepository.Removemarks(id);
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure(ex.Message);
            }
        }
    }
}
