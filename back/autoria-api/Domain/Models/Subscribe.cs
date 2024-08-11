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
        Guid Id { get; set; }
        List<Guid> CarsId { get; set; } = new List<Guid>();
        Guid UserId { get; set; }
        DateTime ByDate { get; set; }
        DateTime EndDate { get; set; }
        Subscribe_Level Subscribe_Level { get; set; }
    }
}
