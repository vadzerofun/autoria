namespace autoria_api.Models
{
    public class Seller
    {
        public int Id { get; set; } //Id
        public string Name { get; set; } //Ім`я
        public string Place_of_residence { get; set; } //Мізце проживання
        public DateTime Register_date { get; set; } //Дата реестрації
        public string Phone { get; set; } //номер телефону
        public List<int> CarsId { get; set; } //id машин
        public string ImagePath { get; set; } //Полисання на зображення
        public Seller() { }

        public Seller(int id, string name, string placeOfResidence, DateTime registerDate, string phone, string imagePath)
        {
            Id = id;
            Name = name;
            Place_of_residence = placeOfResidence;
            Register_date = registerDate;
            Phone = phone;
            ImagePath = imagePath;
        }

        public Seller(string name, string placeOfResidence, DateTime registerDate, string phone, string imagePath)
        {
            Name = name;
            Place_of_residence = placeOfResidence;
            Register_date = registerDate;
            Phone = phone;
            ImagePath = imagePath;
        }

    }
}
