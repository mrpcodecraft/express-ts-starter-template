import "reflect-metadata"; 
import Server from "./server";
import * as dotenv from "dotenv";

dotenv.config();

let server: Server;

try {

    if (!process.env.ENV ||!process.env.PORT) {
        throw new Error("Invalid environment or port");
    }
    
    server = new Server(process.env.ENV, process.env.PORT);
    server.start();
    
} catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
}