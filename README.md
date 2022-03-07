## Description

Movie Platform test MVP application backend system.

## Project Main Structure
This is the project main structure:
* src
    * modules
        - auth
        - user
        - movie
    * common
        - constants
        - decorators
        - dto
        - exceptions
        - guards
        - services
* test


**modules** directory contains components encapsulating a closely related set of capabilities:
* *auth* - provides APIs and functionality for user registration and authentication,
* *user* - provides APIs and functionality for user creation, update, retrieval and favorite movies,
* *movie* - provides APIs and functionality for movie creation, update, retrieval, removal and movie rating.


**common** directory contains common functionalities and defined constants used in the project:
* *constants* - contains enumeration types used in the project,
* *decorators* - contains decorators used in controllers,
* *dto* - contains common DTOs used in the modules,
* *exceptions* - contains different exception types used in the project,
* *guards* - contains access control guards, used to ensure that the caller has sufficient permission to execute a specific route,
* *services* - contains services (such as config service) used in the project from different components.

In **test** directory should be located unit tests for project components.

## Installation

```bash
$ npm install
```

## Local Development

A local *.env* file should be created with environment variables. Here is a template:

``` text

APP_PORT=5000
APP_GLOBAL_PREFIX=api

DB_URI=mongodb+srv://<user>:<password>@cluster0.4w3ln.mongodb.net/moviePlatform?retryWrites=true&w=majority

JWT_SECRET=SomeSuperSecret
JWT_EXPIRES_IN=21600 #In seconds, 6 hours

SWAGGER_NAME=API
SWAGGER_DESCRIPTION="Movie Platform API Documentation"
SWAGGER_VERSION=0.0.1
SWAGGER_PATH=/api/doc
```

Run the following command to start the service (in watch mode):

```bash
npm run-script start:dev
```

## Swagger Documentation

**Swagger** documentation is available in *http://localhost:5000/api/doc/* URL.


### Possible improvements
The project can be improved as follows:
* Add unit test,
* Docker image can be used in order to run MongoDB locally. For that docker-compose.yml file can be created with MongoDB configurations,
* Relation DB like PostgreSQL with TypeORM can be used to have separate UserFavoriteMovies table, thus removing it from Users table.
