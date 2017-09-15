# Demo

Converts Arabic numerals to Roman numerals.

The Swagger API can be used under the `http://<host>:<port>/swagger-ui.html` URL. The web application is located under the root.

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

The server can be accessed under port `8080`.

## Development

### Backend

```
./mvwn spring-boot:run
```

The backend will be available under port `11000`.

### Frontend

Requires [Node](https://nodejs.org/) (latest).

Inside the `src/main/javascript` folder use

```
npm start
```

The frontend will be available under port `3000`.

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

### Frontend

* Substitute propTypes with Flow or TypeScript

* Extract strings for localization support

* Implement page model object for tests

* Abstract common functions, e.g. input or clicking in tests
