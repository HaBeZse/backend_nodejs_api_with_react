import userDataAccessObject from "../data/user.data.access.object.ts";
import type { User } from "../models/user.interface.ts";

export class UserService {
  private constructor() {}

  public static addUser = (newUser: User) =>
    userDataAccessObject.insert(newUser);

  public static getUserByID = (id: number) => userDataAccessObject.getByID(id);

  public static getAllUsers = () => userDataAccessObject.getAll();

  public static updateUserByID = (id: number, newData: User) =>
    userDataAccessObject.updateByID(id, newData);

  public static removeUserByID = (id: number) =>
    userDataAccessObject.removeByID(id);
}
