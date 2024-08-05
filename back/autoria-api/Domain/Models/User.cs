using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;

namespace Core.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Region { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime lastVisitedDate { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public List<Guid>? CarsId { get; set; }
        public UserRole userRole { get; set; }
        public List<Guid> LikesNews { get; set; } = new List<Guid>();
    }
}
