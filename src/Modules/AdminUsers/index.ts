import { Request, Response, NextFunction, Router } from "express";

export default class AdminUserController {
    public router: Router = Router({
        mergeParams: true,
        strict: true,
        caseSensitive: true
    });

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get("/", this.getAdminUsers);
    }

    private async getAdminUsers(req: Request, res: Response, next: NextFunction) {
        res.send({
            name: "test user",
            email: "test@example.com"
        })
    }
}