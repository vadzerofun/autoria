using autoria_api.DbContext;
using autoria_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Mail;
using SendGrid;
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
                CarsId = [0],
                Place_of_residence = null,
                ImagePath = null
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("User created successfully");
        }

        [HttpPost("SendEmailConfirm")]
        public async Task<Response> SendEmailConfirm([FromBody] string email)
        {
            if (!await _context.Users.AnyAsync(u => u.Email == email))
                return null;
            string contitueEmail = "https://localhost:7224/api/User/ConfirmEmail?email=" + email;
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("dimarudik317@gmail.com", "Autoria");
            var subject = "Check Email";
            var to = new EmailAddress(email, "User");
            var plainTextContent = "Press this button to confirm your email";
            var htmlContent = $@"
            <strong>Підтвердіть вашу електронну пошту.</strong>
            <br><br>
            <a href='{contitueEmail}' style='display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #4CAF50; text-align: center; text-decoration: none; border-radius: 5px;'>Підтвердити пошту</a>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            Response response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                return response;

            }
            return null;

        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user != null)
            {
                user.EmailConfirmed = true;
                await _context.SaveChangesAsync();
                return Ok("Email confirmed successfully.");
            }
            else
            {
                return NotFound("User not found.");

            }
        }
    }
}
