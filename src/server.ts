import express, {Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import {Server as HServer} from "http";
import path from "path";
import Router from "./router";

export default class Server {
    private app: express.Application | undefined ;
    private httpServer: HServer | undefined;
    private port: string;
    private env: string;
    private router: Router | undefined;

    constructor(env: string, port: string) {
        if (!env || !port) {
            throw new Error("Invalid environment or port");
        }

        this.port = port;
        this.env = env;

        this.bootstarp();
    }

    private bootstarp(): void {
        this.app = express();
        
        this.httpServer = new HServer(this.app);

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "..", "public")));

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*"); 
            res.header("Access-Control-Allow-Methods", "*");
            next();
        })

        this.router = new Router(this.app);

        this.router.initRoutes();
    }

    public start(): void {
        if (!this.httpServer) {
            throw new Error("Express server is not initialized.");
        }

        this.httpServer.listen(this.port, () => {
            console.log(`Server running in ${this.env} mode on port ${this.port}`);
        });
    }
}