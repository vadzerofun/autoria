﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Model
{
    public class ConfirmEmail
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string SuccessLink { get; set; }
        [Required]
        public string BadLink { get; set; }
        [Required]
        public string ServerLink { get; set; }
    }
}
