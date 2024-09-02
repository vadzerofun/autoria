using Application.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPaymentService
    {
        Task<Result<CheckoutOrderResponse>> CheckoutOrder(long price, IServiceProvider sp, Guid UserId);
        Task<Result> WebHook(string json, HttpRequest Request);
    }
}
