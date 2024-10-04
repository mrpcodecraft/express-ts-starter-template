import { Request, Response, NextFunction, Router } from "express";
import AuthenticationMiddleware from "../../Middlewares/Authentication";
import DTOValidationMiddleware from "../../Middlewares/DTOValidator";
import AdminUserDTO from "../../DataObjects/AdminUsers/DTO";

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
        this.router.use(AuthenticationMiddleware);
        this.router.get("/", this.getAdminUsers);
        this.router.post("/", [DTOValidationMiddleware(AdminUserDTO)] ,this.addAdminUser);
    }

    private async getAdminUsers(req: Request, res: Response, next: NextFunction) {
        res.send({
            name: "test user",
            email: "test@example.com"
        })
    }

    
    private async addAdminUser(req: Request, res: Response, next: NextFunction) {
        res.send({
            message: "Admin user added successfully"
        })
    }
}