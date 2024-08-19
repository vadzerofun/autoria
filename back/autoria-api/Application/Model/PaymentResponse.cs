using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Model
{
    public class PaymentResponse
    {
        public string ChargeId { get; set; } // Унікальний ідентифікатор транзакції в Stripe
        public string Status { get; set; } // Статус транзакції (наприклад, "succeeded")
        public string ReceiptUrl { get; set; } // URL для квитанції або чеку
    }
}
