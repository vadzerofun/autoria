using System.ComponentModel.DataAnnotations;

namespace autoria_api.Models
{
    public class UserRegisterModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public List<int>? CarsId { get; set; }
        public string Place_of_residence { get; set; }
        public string ImagePath { get; set; }
        public string Password { get; set; }
    }
}
