
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./2-utils/config";
import catchAll from "./3-middleware/catch-all";
import { RouteNotFoundError } from "./4-models/error-models";
import dal from "./2-utils/dal";
import productsController from "./6-controllers/products-controllers";
import userController from "./6-controllers/user-controllers";
import orderController from "./6-controllers/order-controller";
import bodyParser from "body-parser";
import path from "path";


const server = express();

server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use("/api", productsController);
server.use("/api", userController);
server.use("/api", orderController);

server.use('/1-assets/images', express.static(path.join(__dirname, '1-assets/images')));



server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new RouteNotFoundError(request.method, request.originalUrl));
});


server.use(catchAll);

server.listen(config.port, () => {
    dal.connect()
    console.log(`Listening on http://localhost:${config.port}`)
});