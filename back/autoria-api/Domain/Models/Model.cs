using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Model
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid MakeId { get; set; }
    }
}
