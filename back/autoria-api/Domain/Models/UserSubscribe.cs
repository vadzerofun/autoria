using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class UserSubscribe
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public List<Guid> CarsId { get; set; } = new List<Guid>();
        public DateTime SubEndTime { get; set; }
        public Guid SubscribeId { get; set; }
    }
}
