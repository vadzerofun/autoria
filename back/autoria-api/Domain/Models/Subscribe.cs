using Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Subscribe
    {
        public Guid Id { get; set; }
        public List<Guid> CarsId { get; set; } = new List<Guid>();
        public Guid UserId { get; set; }
        public DateTime ByDate { get; set; }
        public DateTime EndDate { get; set; }
        public Subscribe_Level Subscribe_Level { get; set; }
    }
}
