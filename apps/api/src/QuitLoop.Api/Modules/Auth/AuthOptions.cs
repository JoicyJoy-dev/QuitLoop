using System.ComponentModel.DataAnnotations;

namespace QuitLoop.Api.Modules.Auth;

public sealed class AuthOptions
{
    public const string SectionName = "Auth";

    [Range(1, 365)]
    public int SessionDays { get; set; } = 30;

    [Range(1, 48)]
    public int PasswordResetHours { get; set; } = 1;

    [Required]
    public string PublicWebBaseUrl { get; set; } = "https://quitloop.org";

    public string[] AllowedOrigins { get; set; } =
    [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://quitloop.org",
        "https://www.quitloop.org"
    ];

    public bool IsValid()
    {
        return SessionDays is >= 1 and <= 365
            && PasswordResetHours is >= 1 and <= 48
            && Uri.TryCreate(PublicWebBaseUrl, UriKind.Absolute, out var uri)
            && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);
    }
}
