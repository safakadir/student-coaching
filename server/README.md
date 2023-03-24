This is the backend of a tailor-made student-coaching application primarly build for **"Arel Akademi"**

## Installation

```bash
$ npm install
```

## Running the app

```bash
#development
$ nest start

# watch mode
$ npm run start:dev

# production mode
$ npm run start # because of config requirements of cyclic
# or
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

The backend api is deployed to [Cyclic](https://app.cyclic.sh)
Simple **git push** will deploy the app automatically.

Explore the api at [live deployment](https://student-coaching.cyclic.app)

## Development Tools

To learn more about the tools used in this project, take a look at the following resources:

- [Nest.js Documentation](https://docs.nestjs.com/)

Bootstrapped with [`@nestjs/cli`](https://docs.nestjs.com/cli/overview).
