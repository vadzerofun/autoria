using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IImageUploader
    {
        Task<List<string>> UploadImages(List<IFormFile> files);
        Task<string> UploadImage(IFormFile file);
    }
}
