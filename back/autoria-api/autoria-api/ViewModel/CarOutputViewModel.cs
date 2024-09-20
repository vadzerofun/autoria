using Core.Models;

namespace autoria_api.ViewModel
{
    public class CarOutputViewModel
    {
        public List<Cars> cars {  get; set; }
        public int count { get; set; }
        public int PageCount { get; set; }
    }
}
