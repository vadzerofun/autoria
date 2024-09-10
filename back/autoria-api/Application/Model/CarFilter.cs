using Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Model
{
    public class CarFilter
    {
        public CarType? Type { get; set; }
        public string? Mark {  get; set; }
        public string? Model { get; set; }
        public int? MinYear { get; set; }
        public int? MaxYear { get; set; }
        public int? MinPrice { get; set; }
        public int? MaxPrice { get; set; }
        public string? Region { get; set; }
        public Transmission_type? GearBox { get; set; }
        public Engine_type? engine_Type { get; set; }
        public Occasion? occasion { get; set; }
        public double? minEngine_capacity { get; set; }
        public double? maxEngine_capacity { get; set; }
        public CarState? carState { get; set; }
    }
}
