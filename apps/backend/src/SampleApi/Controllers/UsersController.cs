using Microsoft.AspNetCore.Mvc;

namespace SampleApi.Controllers;

[ApiController]
[Route("api/users")]
public sealed class UsersController : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<UserSummary>> GetUsers()
    {
        var users = new[]
        {
            new UserSummary("u1", "Ava Stone", "Admin"),
            new UserSummary("u2", "Liam Fox", "Viewer")
        };

        return Ok(users);
    }
}

public sealed record UserSummary(string Id, string Name, string Role);
