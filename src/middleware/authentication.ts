import CustomError from "../errors";
import { isTokenValid } from "../utils";

const authenticateUser = async (
  req: {
    signedCookies: { token: any };
    user: { name: any; userId: any; role: any };
  },
  res: any,
  next: () => void
) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req: { user: { role: any } }, res: any, next: () => void) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
