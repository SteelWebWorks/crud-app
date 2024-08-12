<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>

# Description

This is an open source book libraray project, for managing books and users on the backend, writen in Nestjs.
Only the CRUD operations are implemented, frontend needs to implement separately 

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Installation

Download/clone the project, then navigate to the root directory. There u need to run:

```bash
$ npm install
```

# Configuration

You need to copy the env.example file, and provide the necessary data for the database and the Jwt module.

The ENVIOREMENT env variable currently determinate 

# Moduls, Entities and Endpoints

There are two enities; the User and the Book entity. They have a OneToMany <-> ManyToOne relationship, for managing that what book is borrowed by what user.
There is an Auth module which is responsible the User authencitaion (register, login, etc). Where are roles required for endpont, there must provide bearer token, which cen be aquired by login, and it's live for as long as configured

## User Entity

<p><b>The user entity have the following fields:</b></p>

Id: bigint - the database identifier <br>
Name: string - the display name of the user <br>
UUID: string - identifier for manageing membership <br>
Username: string - the login name of the user <br>
Password: string - the user's password - hashed <br>
Role: string - the user's role, enum (ADMIN, EMPLOYEE, BORROWER) <br>
<br>
Relations: Books - OneToMany <br>
<br>
<b>GET /users</b> Find and returns all users (TODO: query filter), only with ADMIN and EMPLOYEE role <br>
<b>GET /users/:uuid</b> Find one user by uuid, all roles (TODO: limit borrower to read only self) <br>
<b>POST /users</b> Create a new user, entity fields required in body. Only with ADMIN role <br>
<b>POST /users/:uuid/borrow</b> Borrow multiple books, book uuids required in body. ADMIN and EMPLOYEE only <br>
<b>POST /users/:uuid/return</b> Return multiple books, book uuids required in body. ADMIN and EMPLOYEE only <br>
<b>PATH /users/:uuid</b> Update the given user. Admin role (TODO: implement EMPLOYEE and BORROWER to self) <br>
<b>DELETE /user/:uuid</b> Delete the given user. Only with ADMIN role (TODO: Soft delete) <br>
<br>

## Book Entity

<p><b>The book entity have the following fields:</b></p>
Id: bigint - the database identifier <br>
Name: string - name of the book <br>
UUID: string - identifier for manageing books <br>
Description: string - The book's short description <br>
Availability: boolean - The books availability to borrow <br>
ExpireDate: Date - The borrowed book's expire date <br>
<br>
Relations: User - ManyToOne <br>
<br>
<b>GET /books</b> Find and returns all books (TODO: query filter) <br>
<b>GET /books/:uuid</b> Find one book by the given UUID <br>
<b>POST /books</b> Create a new book, entity fields required in body. ADMIN and EMPLOYEE roles only <br>
<b>POST /books/:uuid/borrow</b> Borrows the book. UserId requred in body <br>
<b>POST /books/:uuid/return</b> Returns the book. UserId requred in body <br>
<b>PATH /books/:uuid</b> Update the given book. Admin and Employee <br>
<b>DELETE /books/:uuid</b> Delete the given book. Only with ADMIN role (TODO: Soft delete) <br>

## Auth module

<p>The AuthModule is based on the JWT package, nad not store the login data on the server.
There are two strategies: local and Jwt.
Local is responsible to login, and the JWT is responsible the Role "protection"</p>

<b>POST /auth/login</b> The user login endpoint. Fields required in body: username, password <br>
<b>POST /auth/register</b> The user registration endpoint, which creates a new user with BORROWER role <br>
<b>GET /auth/status</b> Returns the logged in user's status <br>

# Helper and Support classes

<p>There is two ENUM that are supposed to support the code to avoid magic strings and numbers: Roles and Actions.
Both are can be find in the User module.</p>

## Roles ENUM

<p>There are thre rols in this app:</p>

<b>ADMIN</b> With this role every endpoint can be used <br>
<b>EMPLOYEE</b> This role can manage books and borrowers <br>
<b>BORROWER</b> The role who can only borrow books, and list them <br>

## Action ENUM
<p>The two borring action, which are responsible to help keep the codebase clean. These are responsible to decide wichever values are addigned to the book entity's fields</p>
<b>BORROW</b> <br>
<b>RETURN</b> <br>
<br>

# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Support
You can support my work by buying me a coffe: https://ko-fi.com/steelhammer


# License

Nest is [MIT licensed](LICENSE).
