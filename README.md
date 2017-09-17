# Demo

Converts Arabic numerals to Roman numerals.

Since this is a demonstration, the SPA is provided by the same server which should normally be extracted and served seperately as static resource.

## Requirements

[Docker](https://www.docker.com/) (stable:latest)

## Run

```
docker-compose up
```

or a clean slate

```
docker-compose up --build
```

The server can be accessed under port `8080` with the web application served at the root.

The Swagger API can be used under the `http://<host>:<port>/swagger-ui.html` URL.

## Development

### Backend

```
./mvwn spring-boot:run
```

The backend will be available at port `11000`.

### Frontend

Requires [Node](https://nodejs.org/) (latest).

Inside the `src/main/javascript` folder use

```
npm start
```

The frontend will be available at port `3000`.

## Build

```
./mvwn clean install
```

## Improvements

### General

* Implement E2E tests

### Backend

* Implement a sparse bit vector for the number representation

* Implement a cache

* Persistence

* Implement authentication and authorization

### Frontend

* Substitute propTypes with Flow or TypeScript

* Extract strings for localization support

* Implement page model object for tests

* Abstract common functions, e.g. input or clicking in tests

* Use Redux for state
