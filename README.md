# Grandeur-Internal
A Backend for SYOO APIs

## APIs

|      REST       |        Endpoints         |
| --------------- | ------------------------ |
|                 |                          |
| MIDDLE          | /req_res/users           |
| POST            | /req_res/users           |
| GET             | /req_res/users/:id       |
| PUT             | /req_res/users/:id       |
| DELETE          | /req_res/users/:id       |
|                 |                          |
|                 |                          |
|                 |                          |
| Restaurant CRUD |                          |
|                 |                          |
| POST            | /syoo_api/restaurant     |
| GET             | /syoo_api/restaurant     |
| GET             | /syoo_api/restaurant/:id |
| PUT             | /syoo_api/restaurant     |
| PUT             | /syoo_api/restaurant/:id |
| DELETE          | /syoo_api/restaurant     |
| DELETE          | /syoo_api/restaurant/:id |
|                 |                          |
|                 |                          |
|                 |                          |
| Restaurants     |                          |
|                 |                          |
| GET             | /syoo_api/restaurants    |
|                 |                          |
|                 |                          |
|                 |                          |
| Item CRUD       |                          |
|                 |                          |
| POST            | /syoo_api/item           |
| GET             | /syoo_api/item           |
| GET             | /syoo_api/item/:id       |
| PUT             | /syoo_api/item           |
| PUT             | /syoo_api/item/:id       |
| DELETE          | /syoo_api/item           |
| DELETE          | /syoo_api/item/:id       |
|                 |                          |
|                 |                          |
|                 |                          |
| Items           |                          |
|                 |                          |
| GET             | /syoo_api/items          |
| GET             | /syoo_api/items/:id      |
|                 |                          |
|                 |                          |
|                 |                          |
| Table CRUD      |                          |
|                 |                          |
| POST            | /syoo_api/table          |
| GET             | /syoo_api/table          |
| GET             | /syoo_api/table/:id      |
| PUT             | /syoo_api/table          |
| PUT             | /syoo_api/table/:id      |
| DELETE          | /syoo_api/table          |
| DELETE          | /syoo_api/table/:id      |
|                 |                          |
|                 |                          |
|                 |                          |
| Tables          |                          |
|                 |                          |
| GET             | /syoo_api/tables         |
| GET             | /syoo_api/tables/:id     |
|                 |                          |
|                 |                          |
|                 |                          |
| Order CRUD      |                          |
|                 |                          |
| POST            | /syoo_api/order          |
| GET             | /syoo_api/order          |
| GET             | /syoo_api/order/:id      |
| PUT             | /syoo_api/order          |
| PUT             | /syoo_api/order/:id      |
| PATCH           | /syoo_api/order          |
| PATCH           | /syoo_api/order/:id      |
|                 |                          |
|                 |                          |
|                 |                          |
| Orders          |                          |
|                 |                          |
| GET             | /syoo_api/orders         |
| GET             | /syoo_api/orders/:id     |


## Development Guide

#### NOTE : Please make sure you have yarn :: [Installing yarn](https://yarnpkg.com/en/docs/install)

* Initial setup

```bash
$ yarn install
```

* To watch for changes

```bash
$ nodemon
```

## Docker Scripts

```bash
$ docker-compose up
```