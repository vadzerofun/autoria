using Core.Enums;
using Core.Models;

namespace autoria_api.ViewModel
{
    public class CarInputViewModel
    {
        //public Guid Id { get; set; } // Id
        public double PriceUSD { get; set; } // ціна в доларах
        public double Mileage { get; set; } // Пробіг авто
        public string Make { get; set; } // Марка
        public string Model { get; set; } // Модель
        public CarType Type { get; set; } // Тип машини Легкові, Вантажні ...
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
        //public List<string> ImagesPath { get; set; } //Посилання на картики авто
        //public Guid UserId { get; set; } //Id юзера
        //public DateTime CreatedTime { get; set; } // дата створення оголошення
        public string Region { get; set; } // Регіон Продажу Авто
        //public int VisitedCount { get; set; } // кількість переглядів

        static public Cars ToCars(CarInputViewModel CarVM, Guid Id, List<string> ImagesPath, Guid UserId, DateTime CreatedTime, int VisitedCount)
        { 
            Cars cars = new Cars
            {
                Id = Id,
                Price = CarVM.PriceUSD,
                Mileage = CarVM.Mileage,
                Make = CarVM.Make,
                Model = CarVM.Model,
                Type = CarVM.Type,
                Year = CarVM.Year,
                Engine_capacity = CarVM.Engine_capacity,
                Engine_type = CarVM.Engine_type,
                Color = CarVM.Color,
                Owners_number = CarVM.Owners_number,
                Wanted = CarVM.Wanted,
                Road_accident = CarVM.Road_accident,
                Carrying_capacity_ton = CarVM.Carrying_capacity_ton,
                Car_number = CarVM.Car_number,
                Car_vin_code = CarVM.Car_vin_code,
                Transmission_type = CarVM.Transmission_type,
                Occasion = CarVM.Occasion,
                Description = CarVM.Description,
                Number_of_seats = CarVM.Number_of_seats,
                ImagesPath = ImagesPath,
                UserId = UserId,
                CreatedTime = CreatedTime,
                Region = CarVM.Region,
                VisitedCount = VisitedCount,
            };
            return cars;
        }
    }
}
