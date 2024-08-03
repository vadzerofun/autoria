using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using System.Security.Cryptography;
using Microsoft.Extensions.Options;
using Application.Model;

namespace Application.Services
{
    public class AesEncryptionService : IEncryptionService
    {
        public readonly IOptions<AesEncryptionOption> _encryptionOption;

        public AesEncryptionService(IOptions<AesEncryptionOption> encryptionOption)
        {
            _encryptionOption = encryptionOption;
        }

        public string Encrypt(string plainText)
        {
            var encryptionOption = _encryptionOption.Value;
            using (Aes aes = Aes.Create())
            {
                aes.Key = Convert.FromBase64String(encryptionOption.Key);
                aes.IV = Convert.FromBase64String(encryptionOption.IV);

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter sw = new StreamWriter(cs))
                        {
                            sw.Write(plainText);
                        }
                    }
                    return Convert.ToBase64String(ms.ToArray());
                }
            }
        }

        public string Decrypt(string cipherText)
        {
            var encryptionOption = _encryptionOption.Value;
            using (Aes aes = Aes.Create())
            {
                aes.Key = Convert.FromBase64String(encryptionOption.Key);
                aes.IV = Convert.FromBase64String(encryptionOption.IV);

                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (MemoryStream ms = new MemoryStream(Convert.FromBase64String(cipherText)))
                {
                    using (CryptoStream cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader sr = new StreamReader(cs))
                        {
                            return sr.ReadToEnd();
                        }
                    }
                }
            }
        }

        public string Decrypt(string cipherText, string Key)
        {
            var encryptionOption = _encryptionOption.Value;
            using (Aes aes = Aes.Create())
            {
                aes.Key = Convert.FromBase64String(Key);
                aes.IV = Convert.FromBase64String(encryptionOption.IV);

                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (MemoryStream ms = new MemoryStream(Convert.FromBase64String(cipherText)))
                {
                    using (CryptoStream cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader sr = new StreamReader(cs))
                        {
                            return sr.ReadToEnd();
                        }
                    }
                }
            }
        }

        public string Encrypt(string plainText, string Key)
        {
            var encryptionOption = _encryptionOption.Value;
            using (Aes aes = Aes.Create())
            {
                aes.Key = Convert.FromBase64String(Key);
                aes.IV = Convert.FromBase64String(encryptionOption.IV);

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter sw = new StreamWriter(cs))
                        {
                            sw.Write(plainText);
                        }
                    }
                    return Convert.ToBase64String(ms.ToArray());
                }
            }
        }
    }
}
