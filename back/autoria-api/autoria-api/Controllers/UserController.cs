using Application.DTOs;
using Application.Interfaces;
using Application.Services;
using Microsoft.AspNetCore.Mvc;
using Common;
using Microsoft.Extensions.Options;
using Application.Model;

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
        public async Task<List<UserDTO>> GetUsers()
        {
            var users = await _userService.GetUsers();
            return users;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<UserDTO> GetUserById(Guid id)
        {
            var User = await _userService.GetUserById(id);
            return User;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserDTO UserDTO)
        {
            await _userService.AddUser(UserDTO);
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
        public async Task<UserDTO> GetUserByEmail(string email)
        {
            var User = await _userService.GetUserByEmail(email);
            return User;
        }
        [HttpGet("GetByName")]
        public async Task<UserDTO> GetUserByName(string name)
        {
            var User = await _userService.GetUserByName(name); 
            return User;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]Login login)
        {
            var res = await _userService.Login(login);
            if (res == null)
                return Unauthorized();
            return Ok(res);
        }
    }
}
