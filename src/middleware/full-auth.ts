import CustomError from "../errors";
import { isTokenValid } from "../utils/jwt";

const authenticateUser = async (
  req: {
    headers: { authorization: any };
    cookies: { token: { token: any } };
    user: { userId: any; role: any };
  },
  res: any,
  next: () => void
) => {
  let token: { token: any };
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
  try {
    const payload = isTokenValid(token);

    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

const authorizeRoles = (...roles) => {
  return (req: { user: { role: any } }, res: any, next: () => void) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

export { authenticateUser, authorizeRoles };
