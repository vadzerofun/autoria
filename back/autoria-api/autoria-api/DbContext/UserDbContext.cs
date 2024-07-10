using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace autoria_api.DbContext
{
    public class UserDbContext: IdentityUser
    {
        public List<int>? CarsId { get; set; }
        public string? Place_of_residence { get; set; } //Мізце проживання
        public DateTime Register_date { get; set; } //Дата реестрації
        public string? ImagePath { get; set; } //Полисання на зображення
        public UserDbContext() 
        {
            Register_date = DateTime.Now;
        }

        public UserDbContext(List<int> carsId, string placeOfResidence, DateTime registerDate, string imagePath)
        {
            CarsId = carsId;
            Place_of_residence = placeOfResidence;
            Register_date = registerDate;
            ImagePath = imagePath;
        }

    }
}
