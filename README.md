# AMS-IX Backend

A Express backend for an android kotlin app

# Overview of our current tech stack

The backend of the AMS-IX uses the Express framework in combination with typescript. Prisma is used as ORM for the db

## Badges

![](https://img.shields.io/badge/Prisma-4.5.0-success?style=flat&logo=prisma)
![](https://img.shields.io/badge/Typescript-4.8.4-orange?style=flat&logo=typescript)
![](https://img.shields.io/badge/Express-4.18.2-success?style=flat&logo=express)
![](https://img.shields.io/badge/.ENV-16.0.3-success?style=flat&logo=dotenv)
![](https://img.shields.io/badge/JsonWebTokens-8.5.1-success?style=flat&logo=jsonwebtokens)

## Installation Guide

Please have
![](https://img.shields.io/badge/Node-16.15.0-success?style=plastic&logo=nodedotjs)

1. Clone Repository

```shell
$ git clone <repository>
```

2. Install Dependencies

```shell
$ npm install
```

3. Create .env file based on the .env.sample

`DATABASE_URL`
`JWT_SECRET`
`PORT`

Ask a developer for these credentials

4. Seed the db

```shell
$ npx prisma db seed
```

## Run development server

```shell
$ npm run dev
```

Migrate prisma schema

```shell
$ npx prisma migrate dev
```

## Run database ui

```shell
$ npx prisma studio
```

## App Functionalities

### Available Functionalities

- Register
- Login
- fetch user

### Planned For Development
