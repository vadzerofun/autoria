using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enums
{
    public enum CarState
    {
        noNested, //Не вимагає вкладень
        needsRepair, //Потребує ремонту 
        postAccident, //Після ДТП
        partsAndComponents, //Запчастини та комплектуючі
        newCar, // Нове авто - 0 пробіг
    }
}
