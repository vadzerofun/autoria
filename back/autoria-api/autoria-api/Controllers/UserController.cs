using autoria_api.DbContext;
using autoria_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<UserDbContext> _userManager;

        public UserController(ApplicationDbContext context, UserManager<UserDbContext> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<List<UserDbContext>> GetUsers()
        {
            if (_context.Users == null)
            {
                return null;
            }
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<UserDbContext> GetUser(string id)
        {
            if (_context.Users == null)
            {
                return null;
            }
            var User = await _context.Users.FindAsync(id);

            if (User == null)
            {
                return null;
            }

            return User;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new UserDbContext
            {
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                CarsId = model.CarsId,
                Place_of_residence = model.Place_of_residence,
                ImagePath = model.ImagePath,
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("User created successfully");
        }
    }
}
