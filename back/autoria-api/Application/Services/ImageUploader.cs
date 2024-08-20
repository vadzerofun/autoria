using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using MySqlX.XDevAPI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ImageUploader: IImageUploader
    {
        public async Task<List<string>> UploadImages(List<IFormFile> files)
        {
            var _imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
            var filePaths = new List<string>();

            foreach (var file in files)
            {
                if (file == null || file.Length == 0)
                {
                    throw new ArgumentException("One or more files are invalid.");
                }

                var fileExtension = Path.GetExtension(file.FileName);
                var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
                var filePath = Path.Combine(_imageFolderPath, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                filePaths.Add(uniqueFileName);
            }

            return filePaths;
        }

        public async Task<string> UploadImage(IFormFile file)
        {
            var _imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");

            if (file == null || file.Length == 0)
                throw new ArgumentException("file is invalid.");

            var fileExtension = Path.GetExtension(file.FileName);
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(_imageFolderPath, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return uniqueFileName;
        }

        public async Task DeleteImages(List<string> images)
        {
            var _imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
            foreach (var fileName in images)
            {
                var filePath = Path.Combine(_imageFolderPath, fileName);

                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
                //else
                //{
                //    Model.Result.Failure($"Файл {fileName} не знайдено.");
                //}
            }
            return;
        }
    }
}
