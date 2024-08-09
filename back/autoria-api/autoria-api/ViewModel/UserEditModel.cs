using Core.Enums;

namespace autoria_api.ViewModel
{
    public class UserEditModel
    {
        public Guid EditId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Region { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public UserRole userRole { get; set; }
        public IFormFile? FormImageFile { get; set; }
    }
}
