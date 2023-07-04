# Simple.Keeper

Simple.Keeper is an expense tracking application built with Nest.js. It allows users to track their expenses and manage their financial activities effectively.

## Tech Stack

- Framework: Nest.js
- Database: Postgres (in Docker)
- ORM: Prisma
- Authentication: JWT (JSON Web Tokens), access tokens, refresh tokens
- Docker Compose for containerization
- Continuous Integration/Continuous Deployment (CI/CD)
- Code Quality Tools: ESLint, Husky, Prettier, Commitlint, GitHub Actions
- Node Version Manager (nvm)
- Testing: Jest

## Installation

1. Clone the repository.
2. Install the dependencies using the following command:

```shell
npm install
```

3. Create a `.env` file in the project root directory and provide the required environment variables. (Look to the `.env.example` file for reference.)

## Usage

To start the application, run the following command:

```shell
npm run start:dev
```

The application will start in development mode and automatically restart when changes are detected.

## Commands

- `build`: Builds the Nest.js application.
- `format`: Formats the source code using Prettier.
- `start`: Starts the Nest.js application.
- `start:dev`: Starts the Nest.js application in development mode with watch mode enabled.
- `start:debug`: Starts the Nest.js application in debug mode with watch mode enabled.
- `start:prod`: Starts the compiled application in production mode.
- `lint`: Lints the code using ESLint.
- `lint:fix`: Fixes linting issues automatically.
- `test`: Runs Jest tests.
- `test:watch`: Runs Jest tests in watch mode.
- `test:cov`: Runs Jest tests with coverage reporting.
- `test:debug`: Runs Jest tests in debug mode.
- `test:e2e`: Runs end-to-end (e2e) tests using Jest.

## Contributing

Contributions are welcome! To contribute to Simple.Keeper, follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push the changes to your fork.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
