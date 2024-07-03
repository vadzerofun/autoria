namespace autoria_api.Models
{
    public class Car
    {
        public int Id { get; set; } // Id
        public double PriceUSD { get; set; } // ціна в доларах
        public double Mileage { get; set; } // Пробіг авто
        public string Make { get; set; } // Марка
        public string Model { get; set; } // Модель
        public int Year { get; set; } // Рік випуску
        public double Engine_capacity { get; set; } // Об'єм двигуна
        public Engine_type Engine_type { get; set; } // Тип двигуна (бензин, дизель)
        public string Color { get; set; } // Колір авто
        public int Owners_number { get; set; } // Кількість власників
        public bool Wanted { get; set; } // Стан в розшуку
        public string Road_accident { get; set; } // ДТП
        public double Carrying_capacity_ton { get; set; } // Вантажопідйомність (в тоннах)
        public string Car_number { get; set; } // Номер машини (ВХ 1000 ВН)
        public string Car_vin_code { get; set; } // Він код машини
        public Transmission_type Transmission_type { get; set; } // Тип трансмісії (автомат, механіка)
        public Occasion Occasion { get; set; } // Привід машини (передній, задній, повний)
        public string Description { get; set; } // Опис авто
        public int Number_of_seats { get; set; } // Кількість посадочних місць
        public List<string> ImagesPath { get; set; } //Посилання на картики авто

        public Car() { }
        public Car(int id, double priceUSD, double mileage, string make, string model, int year, double engine_capacity,
               Engine_type engine_type, string color, int owners_number, bool wanted, string road_accident,
               double carrying_capacity_ton, string car_number, string car_vin_code, Transmission_type transmission_type,
               Occasion occasion, string description, int number_of_seats, List<string> imagesPath)
        {
            Id = id;
            PriceUSD = priceUSD;
            Mileage = mileage;
            Make = make;
            Model = model;
            Year = year;
            Engine_capacity = engine_capacity;
            Engine_type = engine_type;
            Color = color;
            Owners_number = owners_number;
            Wanted = wanted;
            Road_accident = road_accident;
            Carrying_capacity_ton = carrying_capacity_ton;
            Car_number = car_number;
            Car_vin_code = car_vin_code;
            Transmission_type = transmission_type;
            Occasion = occasion;
            Description = description;
            Number_of_seats = number_of_seats;
            ImagesPath = imagesPath;
        }
        public Car(double priceUSD, double mileage, string make, string model, int year, double engine_capacity,
               Engine_type engine_type, string color, int owners_number, bool wanted, string road_accident,
               double carrying_capacity_ton, string car_number, string car_vin_code, Transmission_type transmission_type,
               Occasion occasion, string description, int number_of_seats, List<string> imagesPath)
        {
            PriceUSD = priceUSD;
            Mileage = mileage;
            Make = make;
            Model = model;
            Year = year;
            Engine_capacity = engine_capacity;
            Engine_type = engine_type;
            Color = color;
            Owners_number = owners_number;
            Wanted = wanted;
            Road_accident = road_accident;
            Carrying_capacity_ton = carrying_capacity_ton;
            Car_number = car_number;
            Car_vin_code = car_vin_code;
            Transmission_type = transmission_type;
            Occasion = occasion;
            Description = description;
            Number_of_seats = number_of_seats;
            ImagesPath = imagesPath;
        }
    }

    public enum Engine_type
    {
        Benzin,
        Diesel
    }

    public enum Transmission_type
    {
        Manual,
        Automatic
    }

    public enum Occasion
    {
        FrontWheel,
        RearWheel,
        AllWheel
    }
}
