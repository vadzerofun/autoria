using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enums;
using Microsoft.AspNetCore.Http;

namespace Core.Models
{
    public class Cars
    {
        public Guid Id { get; set; } // Id
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
        public Guid UserId { get; set; } //Id юзера
        public DateTime CreatedTime { get; set; } // дата створення оголошення
    }
}
