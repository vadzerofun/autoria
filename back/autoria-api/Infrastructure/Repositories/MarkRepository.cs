using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class MarkRepository: IMarkRepository
    {
        private readonly Data.AppDbContext _context;

        public MarkRepository(Data.AppDbContext context)
        {
            _context = context;
        }

        // Отримати список усіх марок
        public async Task<List<Marks>> Getmarks()
        {
            return await _context.Marks.ToListAsync();
        }

        // Додати нову марку
        public async Task Addmarks(Marks mark)
        {
            if (mark == null) throw new ArgumentNullException(nameof(mark));

            _context.Marks.Add(mark);
            await _context.SaveChangesAsync();
        }

        // Видалити марку за ідентифікатором
        public async Task Removemarks(Guid id)
        {
            var mark = await _context.Marks.FindAsync(id);
            if (mark == null) return;

            _context.Marks.Remove(mark);
            await _context.SaveChangesAsync();
        }
    }
}
