# Express.js Application with TypeScript

This project is a simple template for building an Express.js application using TypeScript. It provides a singleton-style application setup (shared service instances) and includes a class-based singleton database configuration using Sequelize with MySQL. It also includes an example setup for routes, environment configuration, and a development workflow using `nodemon` for automatic code reloads on changes.

## Prerequisites

Ensure that you have the following installed on your machine:
- **Node.js** (https://nodejs.org/)
- **npm** (Node package manager, comes with Node.js)
- **Git** (https://git-scm.com/downloads)

## Installation
Run the following command to download and run the application
```bash
git clone https://github.com/mrpcodecraft/express-ts-starter-template.git
cd express-ts-starter-template
npm install
```
### Next steps
Add the .env file in the root folder and add values for ENV and PORT
Now run the following command to start the server.
```bash
npm start
```
You can access the application at http://localhost:[ **PORT** ]


---

This `README.md` includes only cloning and setting up the template. For a detailed description to create an application by yourself please refer to [README/SETUP.md](https://github.com/mrpcodecraft/express-ts-starter-template/blob/main/README/SETUP.md).

## Important Notes (missing/required parts)

- **Environment variables**: Create a `.env` in the project root with at least the following keys:
	- `NODE_ENV` (development|production)
	- `PORT` (e.g. 3000)
	- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

- **Database (singleton)**: The project uses a class-based singleton for the database at `src/Config/database.ts`. Use `Database.getInstance().connect()` during bootstrap and access the Sequelize instance via `Database.getInstance().sequelize` in models.

- **Migrations & seeders**: Use the provided npm scripts to manage DB migrations:

	```bash
	npm run db:migrate       # run migrations
	npm run db:seed         # run seeders
	```

- **Build and start**: To build and run the compiled app:

	```bash
	npm run build
	npm run start_app
	```
