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
        public string Tittle { get; set; }
        public TimeSpan subTime { get; set; }
        public long Price { get; set; }
        public Subscribe_Level Subscribe_Level { get; set; }
    }
}
