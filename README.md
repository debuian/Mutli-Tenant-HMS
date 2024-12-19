## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Folder Structure for Gobal Routin

```
# Folder Structure
src
├── admin/
│       └── admin-routes.ts
│       └── admin.controller.ts
│       └── admin.service.ts
│       └── admin.module.ts
├── hotel/
│       └── hotel-routes.ts
│       └── hotel.controller.ts
│       └── hotel.service.ts
│       └── hotel.module.ts
```

## Migrations CLI commands

```bash
# Generate Migrations inside database/migrations at root level
$ npm run migration:generate --name=<MigartionName>

# Running Migrations
$ npm run migration:run

```

## Environment Variables

The following environment variables need to be set in your `.env` file for the application to run correctly:

- `APP_PORT`
- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`
- `JWT_SECRET`

Ensure you create a `.env` file in the root of your project and set these variables accordingly.
