using Application.Interfaces;
using Core.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace autoria_api.Atributes
{
    public class RoleFilterAttribute : Attribute, IAuthorizationFilter
    {
        private readonly UserRole _role;
        private readonly IUserService _userService;
        public RoleFilterAttribute(UserRole role, IUserService userService)
        {
            _role = role;
            _userService = userService;
        }
        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            var UserId = context.HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (UserId == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var user = await _userService.GetUserById(Guid.Parse(UserId));

            if (user == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var UserRole = user.Value.userRole;
            
            if (UserRole != _role)
            {
                context.Result = new ForbidResult();  
            }
        }
    }
}
