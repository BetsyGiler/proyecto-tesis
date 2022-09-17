package router;

type Route string;

const (
	Login Route = "/auth/login";
	Register Route = "/auth/register";
	CheckSession Route = "/auth/check-session";
	Logout Route = "/auth/logout";
)
