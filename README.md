## how to use?

1. clone it `git clone git@github.com:Wavely-project/core.git`
2. `cd core`
3. `npm install`
4. `docker compose up`
5. `npm run dev`
6. enjoy!

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
