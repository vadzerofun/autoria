using Application.Model;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IMarksService
    {
        Task<Result<List<Marks>>> GetMarksAsync();
        Task<Result> AddMarkAsync(Marks mark);
        Task<Result> RemoveMarkAsync(Guid id);
    }
}
