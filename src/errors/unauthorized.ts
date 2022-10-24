import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-error";

export default class UnauthorizedError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
