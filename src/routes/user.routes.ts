import express, { Router, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { STATUS } from "../const/networking-const.ts";
import { UserService } from "../services/user.service.ts";
import type { User } from "../models/user.interface.ts";

export class UserRoutes {
  private static _router: Router;

  private constructor() {}

  private static createRouter(): Router {
    const router = express.Router();
    router.use(express.json());
    router.get("/get/:id", UserRoutes.getUser);
    router.get("/all", UserRoutes.getGetAllUsers);
    router.post("/add", UserRoutes.addUser);
    router.put("/update/:id", UserRoutes.updateUser);
    router.delete("/delete/:id", UserRoutes.removeUser);
    return router;
  }

  public static get router(): Router {
    if (!UserRoutes._router) {
      UserRoutes._router = UserRoutes.createRouter();
    }
    return UserRoutes._router;
  }

  private static getUser = (
    request: Request<{ id: string }, {}, {}>,
    response: Response,
  ) => {
    const id = parseInt(request.params.id);
    const user = UserService.getUserByID(id);

    if (user) {
      return response.status(StatusCodes.ACCEPTED).send({
        status: STATUS.SUCCESS,
        data: user,
      });
    } else {
      return response.status(StatusCodes.NOT_ACCEPTABLE).send({
        status: STATUS.FAILURE,
        data: `User '${id}' is not found`,
      });
    }
  };

  private static getGetAllUsers = (
    request: Request,
    response: Response,
  ): Response | undefined => {
    const userDatabase = UserService.getAllUsers();

    if (userDatabase && userDatabase.length > 0) {
      return response.status(StatusCodes.ACCEPTED).send({
        status: STATUS.SUCCESS,
        data: userDatabase,
      });
    } else {
      return response.status(StatusCodes.NOT_ACCEPTABLE).send({
        status: STATUS.FAILURE,
        data: "Database is empty",
      });
    }
  };

  private static addUser = (
    request: Request<{}, {}, User>,
    response: Response,
  ) => {
    const { body: user } = request;

    const isUserAdded = UserService.addUser(user)
      ? StatusCodes.CREATED
      : StatusCodes.NOT_ACCEPTABLE;

    if (isUserAdded) {
      return response.status(StatusCodes.CREATED).send({
        status: STATUS.SUCCESS,
        data: user,
      });
    } else {
      return response.status(StatusCodes.NOT_ACCEPTABLE).send({
        status: STATUS.FAILURE,
        data: "Something went wrong",
      });
    }
  };

  private static updateUser = (
    request: Request<{ id: string }, {}, User>,
    response: Response,
  ) => {
    const { body: user } = request;
    const id = parseInt(request.params.id);
    const updatedUser = UserService.updateUserByID(id, user);

    if (updatedUser) {
      return response.status(StatusCodes.ACCEPTED).send({
        status: STATUS.SUCCESS,
        data: user,
      });
    } else {
      return response.status(StatusCodes.NOT_ACCEPTABLE).send({
        status: STATUS.FAILURE,
        data: `User '${id}' is not found`,
      });
    }
  };

  private static removeUser = (
    request: Request<{ id: string }, {}, {}>,
    response: Response,
  ) => {
    const id = parseInt(request.params.id);
    const isUserRemoved = UserService.removeUserByID(id);

    if (isUserRemoved) {
      return response.status(StatusCodes.OK).send({
        status: STATUS.SUCCESS,
        data: `User '${id}' removed successfully.`,
      });
    } else {
      return response.status(StatusCodes.NOT_ACCEPTABLE).send({
        status: STATUS.FAILURE,
        data: `User '${id}' is not found.`,
      });
    }
  };
}
