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
        public double Price { get; set; } // ціна
        public Сurrency Сurrency { get; set; } //валюта
        public double Mileage { get; set; } // Пробіг авто
        public Guid MakeId { get; set; } // Марка
        public Guid ModelId { get; set; } // Модель
        public CarType Type { get; set; } // Тип машини Легкові, Вантажні ...
        public int Year { get; set; } // Рік випуску
        public double? Engine_capacity { get; set; } // Об'єм двигуна
        public Engine_type Engine_type { get; set; } // Тип двигуна (бензин, дизель, ...)
        public string? Color { get; set; } // Колір авто
        public int Owners_number { get; set; } // Кількість власників
        public bool Wanted { get; set; } // Стан в розшуку
        public string Road_accident { get; set; } // ДТП
        public double Carrying_capacity_ton { get; set; } // Вантажопідйомність (в тоннах)
        public string Car_number { get; set; } // Номер машини (ВХ 1000 ВН)
        public string Car_vin_code { get; set; } // Він код машини
        public Transmission_type? Transmission_type { get; set; } // Тип трансмісії (автомат, механіка)
        public Occasion Occasion { get; set; } // Привід машини (передній, задній, повний)
        public string Description { get; set; } // Опис авто
        public int Number_of_seats { get; set; } // Кількість посадочних місць
        public List<string> ImagesPath { get; set; } //Посилання на картики авто
        public Guid UserId { get; set; } //Id юзера
        public DateTime CreatedTime { get; set; } // дата створення оголошення
        public string Region {  get; set; } // Регіон Продажу Авто
        public int VisitedCount { get; set; } // кількість переглядів
        public int SellerPhoneViews { get; set; } //кількість переглядів номера
        public CarState State { get; set; } // Стан Авто (нове, в ДТП ...)
        public string Body {  get; set; } // тип кузову
        public string? City { get; set; } //місто
        public string SellerPhone { get; set; } //номер телефону продавця
        public string SellerName { get; set; } // імя продавця
        public string? SellerPhoneExtra { get; set; } // Дод. номер продавця
        public List<Guid> Likes { get; set; } = new List<Guid>(); //лайки
    }
}
