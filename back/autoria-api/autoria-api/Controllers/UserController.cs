using Application.DTOs;
using Application.Interfaces;
using Application.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Application.Model;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace autoria_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOptions<AuthOption> _authOption;

        public UserController(IUserService userService, IOptions<AuthOption> authOptions)
        {
            _userService = userService;
            _authOption = authOptions;
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
        public async Task<IActionResult> Register(UserDTO UserDTO)
        {
            UserDTO.Id = Guid.NewGuid();
            var res = await _userService.AddUser(UserDTO);
            if (!res.IsSuccess)
                return BadRequest(res.ErrorMessage);
            return Ok();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            await _userService.DeleteUserById(id);
            return Ok();
        }

        [HttpPost("EditUser")]
        public async Task<IActionResult> EditUser(Guid id, UserDTO UserDTO)
        {
            await _userService.EditUser(id, UserDTO);
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
        //TODO: зробити забув пароль
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword()
        {
            return Ok("Dont Work");
        }
    }
}
