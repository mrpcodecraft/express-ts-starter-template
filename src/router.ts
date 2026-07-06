import { Application } from "express";
import { version } from "../package.json";
import UsersController from "./Modules/Users/contoller";

export default class Router {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public initRoutes() {
        this.app.get("/", (req, res) => {
            res.send({ version });
        });


        this.app.use("/admin", new UsersController().router);
    }
}