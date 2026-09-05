import type { User } from "../models/user.interface.ts";
import users from "./users.data.ts";

export const getByID = (id: number): User | undefined =>
  users.find((user) => user.id === id);

export const getAll = (): Array<User> | undefined => users;

export const insert = (details: User): boolean => {
  users.push({ ...details, id: users.length + 1 });
  return true;
};

export const updateByID = (id: number, newData: User): boolean => {
  const idx = users.findIndex((user) => user.id === id);
  if (idx === -1) {
    return false;
  }
  users.splice(idx, 1, newData);

  return true;
};

export const removeByID = (id: number) => {
  const deletedUser = (user: User, idx: number) => {
    if (user.id === id) {
      users.splice(idx, 1);
      return true;
    }
    return false;
  };

  return users.find(deletedUser);
};

export default { getByID, getAll, insert, updateByID, removeByID };
