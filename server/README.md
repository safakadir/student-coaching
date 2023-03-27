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

## Configuration

Application keeps all the configs in environment according to [Twelve Factor](https://12factor.net/config)
For development, **.env** file is being used to set environment variables at application start. But *.env.\** files are not allowed in the repository.
(except the one for template) 

Use `.env.template` file as a guide for required environment variables. Copy it by renaming and poppulate the values.

## Deployment

The backend api is deployed to [Cyclic](https://app.cyclic.sh)
Simple **git push** will deploy the app automatically.

Explore the api at [live deployment](https://student-coaching.cyclic.app)

## Development Tools

To learn more about the tools used in this project, take a look at the following resources:

- [Nest.js Documentation](https://docs.nestjs.com/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)

Bootstrapped with [`@nestjs/cli`](https://docs.nestjs.com/cli/overview).
