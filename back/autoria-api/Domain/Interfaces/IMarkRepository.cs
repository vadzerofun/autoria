using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IMarkRepository
    {
        public Task<List<Marks>> Getmarks();
        public Task Addmarks(Marks mark);
        public Task Removemarks(Guid id);
    }
}
