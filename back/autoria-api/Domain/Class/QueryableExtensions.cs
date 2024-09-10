﻿using System;
using System.Linq;
using System.Linq.Expressions;

namespace Core.Class
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> FilterIf<T>(this IQueryable<T> query, bool condition, Expression<Func<T, bool>> predicate)
        {
            return condition ? query.Where(predicate) : query;
        }
    }

}