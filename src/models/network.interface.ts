import { StatusCodes } from "http-status-codes";
import type { User } from "./user.interface.ts";

export interface UserResponseMessage {
  code: StatusCodes;
  info: UserResponseMessageInfo;
}

export interface UserResponseMessageInfo {
  status: string;
  data: User | Array<User> | string;
}
