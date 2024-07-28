﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class News
    {
        public Guid Id { get; set; } //Id
        public string Tittle {  get; set; } //заголовок
        public DateTime WritingTime { get; set; } //час написання
        public List<Guid>? Likes { get; set; } //лайки
        public string Link {  get; set; } //лінк на новину
        public string ImageLink { get; set; } //посилання на картинку

    }
}
