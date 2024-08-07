using Core.Models;
using Application.Interfaces;
using Application.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Application.Model;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Core.Enums;
using autoria_api.ViewModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOptions<AuthOption> _authOption;
        private readonly IImageUploader _imageUploader;

        public UserController(IUserService userService, IOptions<AuthOption> authOptions, IImageUploader imageUploader)
        {
            _userService = userService;
            _authOption = authOptions;
            _imageUploader = imageUploader;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var res = await _userService.GetUsers();
            if (!res.IsSuccess)
                return BadRequest(res.ErrorMessage);
            return Ok(res.Value);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var res = await _userService.GetUserById(id);
            if (!res.IsSuccess)
                return BadRequest(res.ErrorMessage);
            return Ok(res.Value);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(User User)
        {
            User.Id = Guid.NewGuid();
            User.CarsId = new List<Guid>();
            var res = await _userService.AddUser(User);
            if (!res.IsSuccess)
                return BadRequest(res.ErrorMessage);
            return Ok();
        }

        // DELETE: api/Users/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var userid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            if (userid == null || userRole == null)
                return BadRequest("No Such User");
            if (id == Guid.Parse(userid) || userRole == UserRole.Admin.ToString())
            {
                await _userService.DeleteUserById(id);
                return Ok();
            }
            return BadRequest("no access");
        }

        [Authorize]
        [HttpPost("EditUser")]
        public async Task<IActionResult> EditUser([FromForm] UserEditModel InputUser)
        {
            string imgpath;
            if (InputUser.FormImageFile != null)
                imgpath = await _imageUploader.UploadImage(InputUser.FormImageFile);
            else
                imgpath = "";

            var userRole = base.User.FindFirst(ClaimTypes.Role)?.Value;
            var userId = base.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userRole == null || userId == null)
                return BadRequest("No Such User");

            var userOrig = (await _userService.GetUserById(InputUser.EditId)).Value;

            User User = new User
            {
                Id = userOrig.Id,
                Name = InputUser.Name,
                Phone = InputUser.Phone,
                Email = InputUser.Email,
                Password = InputUser.Password,
                Region = InputUser.Region,
                CreatedTime = userOrig.CreatedTime,
                lastVisitedDate = userOrig.lastVisitedDate,
                IsEmailConfirmed = InputUser.IsEmailConfirmed,
                CarsId = userOrig.CarsId,
                userRole = InputUser.userRole,
                ImageLink = imgpath,
                LikesNews = userOrig.LikesNews
            };

            if (userRole == UserRole.Admin.ToString())
            {
                User.Password = userOrig.Password;
            }
            else
            {
                if (InputUser.EditId != Guid.Parse(userId))
                    return BadRequest("No Sucsess");
                User.IsEmailConfirmed = userOrig.IsEmailConfirmed;
                User.userRole = userOrig.userRole;
            }
            await _userService.EditUser(InputUser.EditId, User);
            return Ok();
        }
        [HttpGet("GetByEmail")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var res = await _userService.GetUserByEmail(email);
            if (!res.IsSuccess)
                return BadRequest(res.ErrorMessage);
            return Ok(res);
        }
        [HttpGet("GetByName")]
        public async Task<IActionResult> GetUserByName(string name)
        {
            var res = await _userService.GetUserByName(name);
            if (!res.IsSuccess)
                return BadRequest(res.ErrorMessage);
            return Ok(res);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]Login login)
        {
            var res = await _userService.Login(login);
            if (!res.IsSuccess)
                return Unauthorized(res.ErrorMessage);
            return Ok(res);
        }

        [HttpPost("SendConfirmEmail")]
        public async Task<IActionResult> SendConfirmEmail(ConfirmEmail confirmEmail)
        {
            var res = await _userService.SendConfirmEmail(confirmEmail.Email, confirmEmail.SuccessLink, confirmEmail.BadLink);
            if (!res.IsSuccess)
                return BadRequest(res.ErrorMessage);
            return Ok(res);
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string Token, string SuccessLink, string BadLink)
        {
            var res = await _userService.ConfirmEmail(Token);
            if (!res.IsSuccess)
                return Redirect(BadLink);
            return Redirect(SuccessLink);
        }
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(string Email, string Link)
        {
            var res = await _userService.ForgotPassword(Email, Link);
            if (!res.IsSuccess)
                return BadRequest(res.ErrorMessage);
            return Ok(res);
        }

        [HttpPost("ChengeForgotPassword")]
        public async Task<IActionResult> ChengeForgotPassword(string NewPassword, string Token)
        {
            var res = await _userService.ChengeForgotPassword(NewPassword, Token);
            if (!res.IsSuccess)
                return BadRequest(res.ErrorMessage);
            return Ok(res);
        }
        
    }
}
