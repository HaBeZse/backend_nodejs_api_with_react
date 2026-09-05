import express, { Router, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

export class MainRoutes {
  private static _router: Router;

  private constructor() {}

  private static createRouter(): Router {
    const router = express.Router();
    router.use(express.json());
    router.get("/hello-world", MainRoutes.getHello);
    return router;
  }

  public static get router(): Router {
    if (!MainRoutes._router) {
      MainRoutes._router = MainRoutes.createRouter();
    }
    return MainRoutes._router;
  }

  private static getHello = (request: Request, response: Response): void => {
    response.status(StatusCodes.OK).send("Szia Lajos!");
  };
}
