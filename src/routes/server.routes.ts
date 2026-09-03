
import express, { Router, type Request, type Response } from "express"
import { StatusCodes } from "http-status-codes";
import { type RequestBody, STATUS } from "../const/networking-const.ts";

export class ServerRouter {
    private static _router: Router

    private constructor() {}

    private static createRouter(): Router {
        const ROUTER = express.Router();
        ROUTER.use(express.json());
        ROUTER.get('/', ServerRouter.getHello);
        ROUTER.post('/add', ServerRouter.addItem);
        return ROUTER;
    }

    public static get router(): Router {
        if (!ServerRouter._router) {
            ServerRouter._router = ServerRouter.createRouter()
        }
        return ServerRouter._router
    }


    private static getHello = (request: Request, response: Response): void => {
        response.status(StatusCodes.OK).send('Szia Lajos!');
    }

    private static addItem = (request: Request<{},{}, RequestBody>, response: Response) => {
        const { body } = request;
    
        if (!body.name) {
            return response.status(StatusCodes.NOT_ACCEPTABLE).send({
                status: STATUS.FAILURE,
                message: 'Name is required'
            })
        }
        response.status(StatusCodes.OK).send({
            status: STATUS.SUCCESS,
            data: body
        })
    }
}