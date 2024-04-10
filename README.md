## how to use?

1. clone it `git clone git@github.com:Wavely-project/core.git`
2. `cd core`
3. `npm install`
4. `docker compose up`
5. `npm run dev`
6. enjoy!

---

## Migrations and seeding

Checkout [this](https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261) guide.

-   to create a migration file: `knex migrate:make create_users_table`
-   to run migrations: `knex migrate:latest`

-   to create a seeder file: `knex seed:make 01_users`
-   to run the seeders: `knex seed:run`.

## 📁 Project Structure

```
.
├── api
│   ├── healthCheck
│   │   ├── __tests__
│   │   │   └── healthCheckRouter.test.ts
│   │   └── healthCheckRouter.ts
│   └── user
│       ├── __tests__
│       │   ├── userRouter.test.ts
│       │   └── userService.test.ts
│       ├── userModel.ts
│       ├── userRepository.ts
│       ├── userRouter.ts
│       └── userService.ts
├── api-docs
│   ├── openAPIDocumentGenerator.ts
│   ├── openAPIResponseBuilders.ts
│   └── openAPIRouter.ts
├── common
│   ├── __tests__
│   │   ├── errorHandler.test.ts
│   │   └── requestLogger.test.ts
│   ├── middleware
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts
│   │   └── requestLogger.ts
│   ├── models
│   │   └── serviceResponse.ts
│   └── utils
│       ├── commonValidation.ts
│       ├── envConfig.ts
│       └── httpHandlers.ts
├── index.ts
└── server.ts

```
