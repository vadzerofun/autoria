using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IEncryptionService
    {
        public string Decrypt(string cipherText);
        public string Encrypt(string cipherText);
    }
}
