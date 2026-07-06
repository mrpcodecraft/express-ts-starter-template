import { Request, Response, NextFunction, Router } from "express";
import AuthenticationMiddleware from "../../Middlewares/Authentication";
import DTOValidationMiddleware from "../../Middlewares/DTOValidator";
import AdminUserDTO from "./dto";
import UserService from "./service";
import { IUser } from "./interface";


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
        try {
            const userService: UserService = UserService.getInstance();
            
            let data: IUser[] = await userService.getAll();
    
            res.send(data);
        } catch (error) {
            next(error);
        }
        
    }

    
    private async addAdminUser(req: Request, res: Response, next: NextFunction) {
        res.send({
            message: "Admin user added successfully"
        })
    }
}