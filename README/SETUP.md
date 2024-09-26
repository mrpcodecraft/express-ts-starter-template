# Express.js Application with TypeScript

This project is a simple template for building an Express.js application using TypeScript. It includes an example setup for routes, environment configuration, and a development workflow using `nodemon` for automatic code reload on changes.

## Prerequisites

Ensure that you have the following installed on your machine:
- **Node.js** (https://nodejs.org/)
- **npm** (Node package manager, comes with Node.js)

## Steps to Create the Application

### 1. Create Project Directory
Create a folder for your project and navigate inside it:
```bash
mkdir folder_name
cd folder_name
```

### 2. Initialize npm
Run the following command to initialize the project and generate a `package.json` file:
```bash
npm init
```
Follow the prompts and provide the required details, or press Enter to accept the defaults.

### 3. Install Dependencies
Install the necessary packages for Express.js and TypeScript setup:
```bash
npm install express typescript @types/node @types/express dotenv
```
- **express**: A web framework for Node.js to handle HTTP requests and routes.
- **typescript**: Superset of JavaScript providing optional static typing.
- **@types/node**: Type definitions for Node.js.
- **@types/express**: Type definitions for Express.js.
- **dotenv**: To load environment variables from a `.env` file.

### 4. Initialize TypeScript Configuration
Generate a `tsconfig.json` file by running:
```bash
tsc --init
```
- This will set up the TypeScript configuration file which defines how TypeScript should transpile your code.

### 5. Install nodemon
Install `nodemon` for automatic server restarts on file changes:
```bash
npm install nodemon --save-dev
```
- **nodemon**: It monitors for any file changes and automatically restarts your server.

### 6. Add `nodemon.json` Configuration
Create a `nodemon.json` file by running:
```bash
touch nodemon.json
```
Then add the following configuration to the `nodemon.json` file:
```json
{
  "restartable": "rs",                   // Allows manual restart by typing 'rs'
  "ext": "js,html,jst,ts,json",           // Watches these file extensions
  "ignore": ["dist"],                     // Ignores the 'dist' folder (compiled files)
  "watch": ["./src"]                      // Watches the 'src' directory for changes
}
```

### 7. Update `tsconfig.json`
Update your `tsconfig.json` file with the following:
- Under the `"compilerOptions"` section, add or update the `"outDir"` setting:
  ```json
  "outDir": "dist"                         // Output compiled files to the 'dist' folder
  ```
- Add the `"exclude"` and `"include"` options:
  ```json
  "exclude": [
    "node_modules"                        // Exclude the 'node_modules' folder
  ],
  "include": [
    "src/**/*.ts"                         // Include all TypeScript files in the 'src' folder
  ]
  ```

### 8. Create `src` Directory and Add Files
Now, create the `src` directory where the TypeScript code will reside:
```bash
mkdir src
```

Inside the `src` directory, create three files: `server.ts`, `index.ts`, and `router.ts`.

#### 8.1 `server.ts` File
Add the following code to the `server.ts` file:
```typescript
import express, { Request, Response, NextFunction } from "express";  // Import express and types for request/response handling
import bodyParser from "body-parser";                                // Middleware to parse incoming request bodies
import { Server as HServer } from "http";                            // Import HTTP server
import path from "path";                                             // Helper for working with file paths
import Router from "./router";                                       // Import the router class

export default class Server {
    private app: express.Application | undefined;                   // Express application instance
    private httpServer: HServer | undefined;                        // HTTP server instance
    private port: string;                                           // Port number for the server
    private env: string;                                            // Environment (e.g., development, production)
    private router: Router | undefined;                             // Router instance

    constructor(env: string, port: string) {
        if (!env || !port) {
            throw new Error("Invalid environment or port");         // Throw error if env or port is not provided
        }

        this.port = port;
        this.env = env;

        this.bootstrap();                                           // Initialize the server setup
    }

    private bootstrap(): void {
        this.app = express();                                       // Initialize Express app

        this.httpServer = new HServer(this.app);                    // Create HTTP server using Express app

        this.app.use(bodyParser.json());                            // Use body-parser middleware to parse JSON requests
        this.app.use(bodyParser.urlencoded({ extended: true }));    // Parse URL-encoded data
        this.app.use(express.static(path.join(__dirname, "..", "public")));  // Serve static files from the 'public' folder

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");         // Allow CORS for all origins
            res.header("Access-Control-Allow-Headers", "*");        // Allow all headers for CORS
            res.header("Access-Control-Allow-Methods", "*");        // Allow all methods (GET, POST, etc.)
            next();
        });

        this.router = new Router(this.app);                         // Initialize router
        this.router.initRoutes();                                   // Set up routes
    }

    public start(): void {
        if (!this.httpServer) {
            throw new Error("Express server is not initialized.");  // Throw error if the server isn't set up
        }

        this.httpServer.listen(this.port, () => {
            console.log(`Server running in ${this.env} mode on port ${this.port}`);  // Log when the server starts
        });
    }
}
```
- **Server class**: Handles the initialization of the Express application, middleware setup, and starting the server.

#### 8.2 `index.ts` File
Add the following code to the `index.ts` file:
```typescript
import Server from "./server";                                       // Import the server class
import * as dotenv from "dotenv";                                    // Import dotenv to load environment variables

dotenv.config();                                                     // Load variables from .env file

let server: Server;

try {
    if (!process.env.ENV || !process.env.PORT) {                     // Ensure environment variables are set
        throw new Error("Invalid environment or port");
    }

    server = new Server(process.env.ENV, process.env.PORT);          // Create a new Server instance
    server.start();                                                  // Start the server
} catch (err) {
    process.exit(1);                                                 // Exit the process if an error occurs
}
```
- **index.ts**: Acts as the entry point of the application, loading environment variables and starting the server.

#### 8.3 `router.ts` File
Add the following code to the `router.ts` file:
```typescript
import { Application } from "express";                               // Import express Application type
import { version } from "../package.json";                           // Import version from package.json
import AdminUserController from "./Modules/AdminUsers";              // Import AdminUserController

export default class Router {
    private app: Application;                                        // Express app instance

    constructor(app: Application) {
        this.app = app;
    }

    public initRoutes() {
        this.app.get("/", (req, res) => {                            // Define a GET route for the home page
            res.send({ version });                                   // Send app version as response
        });

        this.app.use("/admin", new AdminUserController().router);    // Define route for admin users
    }
}
```
- **Router class**: Handles the route initialization and links the routes to the controllers.

### 9. Add Admin User Module
Create a folder `Modules` under the `src` directory, and inside that, create another folder `AdminUsers`.

Inside `AdminUsers`, create an `index.ts` file and add the following code:

#### `AdminUsers/index.ts`
```typescript
import { Request, Response, NextFunction, Router } from "express";   // Import necessary types from express

export default class AdminUserController {
    public router: Router = Router({
        mergeParams: true,                                           // Enable merging of route parameters
        strict: true,                                                // Enforce strict routing
        caseSensitive: true                                          // Case-sensitive routing
    });

    constructor() {
        this.router = Router();                                      // Initialize a new Router instance
        this.initRoutes();                                           // Set up routes
    }

    private initRoutes(): void {
        this.router.get("/", this.getAdminUsers);                    // Define a GET route for admin users
    }

    private async getAdminUsers(req: Request, res: Response, next: NextFunction) {
        res.send({                                                   // Send test admin user data
            name: "test user",
            email: "test@example.com"
        });
    }
}
```
- **AdminUserController**: Defines routes related to admin users and provides a sample response.

### 10. Update `package.json` Scripts
Open the `package.json` file and update the `scripts` section as follows:
```json
"scripts": {
    "start_app": "tsc && node dist/src/index.js",                    // Transpile TypeScript and run the compiled JS
    "start": "nodemon --exec npm run start_app",                     // Use nodemon to watch for changes and run app
    "local": "nodemon index.ts",                                     // Run the app locally using nodemon
    "build": "tsc",                                                  // Compile the TypeScript code
    "test": "echo \"Error: no test specified\" && exit 1"            // Default test script placeholder
},
```

### 11. Add `.env` File
Create a `.env` file at the root of the project and add the following:
```
ENV=local                       // Environment variable for environment
PORT=3000                       // Port number for the server
```

### 12. Run the Server
Finally, start the server by running:
```bash
npm start
```

The server should now be running at `http://localhost:3000`, and you can test the routes.

## Conclusion

Your Express.js server with TypeScript is now set up and running. You can extend this template to suit your application's needs by adding more routes, controllers, and features.
```

---

This `README.md` includes comments explaining the purpose of each part of the code.
