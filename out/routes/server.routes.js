import express from "express";
import { StatusCodes } from "http-status-codes";
import { STATUS } from "../const/networking-const.js";
export class ServerRouter {
    constructor() { }
    static createRouter() {
        const ROUTER = express.Router();
        ROUTER.use(express.json());
        ROUTER.get('/', ServerRouter.getHello);
        ROUTER.post('/add', ServerRouter.addItem);
        return ROUTER;
    }
    static get router() {
        if (!ServerRouter._router) {
            ServerRouter._router = ServerRouter.createRouter();
        }
        return ServerRouter._router;
    }
}
ServerRouter.getHello = (request, response) => {
    response.status(StatusCodes.OK).send('Szia Lajos!');
};
ServerRouter.addItem = (request, response) => {
    const { body } = request;
    if (!body.name) {
        return response.status(StatusCodes.NOT_ACCEPTABLE).send({
            status: STATUS.FAILURE,
            message: 'Name is required'
        });
    }
    response.status(StatusCodes.OK).send({
        status: STATUS.SUCCESS,
        data: body
    });
};
//# sourceMappingURL=server.routes.js.map