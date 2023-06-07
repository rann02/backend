# Branded Thing API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /users`
- `DELETE /delete/:id`
- `PUT /update/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "DepartmenId": "integer",
  "LevelId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "message": "account has been created"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name required"
}
OR
{
  "message": "email required"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "input have to be email"
}
OR
{
  "message": "password required"
}
OR
{
  "message": "min 5 characters"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email or password required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "email or password incorrrect"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

## 3. GET /users

Description:

- Get all users from database

Request:

- headers

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "name": "Ahmad",
        "email": "ahmad@gmail.com",
        "Department": {
            "name": "IT"
        },
        "Level": {
            "name": "Junior IT"
        }
    },
    {
        "name": "Ahmad02",
        "email": "ahmad02@gmail.com",
        "Department": {
            "name": "HRD"
        },
        "Level": {
            "name": "Senior HRD"
        }
    },
    ...,
]
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 4. DELETE /delete/:id

Description:

- Delete user by id

Request:

- headers

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer(required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "user ${deleted.name} deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 5. PUT /update/:id

Description:

- Update user by id/primary key

Request:

- headers

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer(required)"
}
```

- body:

```json
{
  "name": "string",
  "email": "string",
  "DepartmentId": "integer",
  "LevelId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "User data has been updated!"
}
```

_Response (400 - Bad Request)_

````json
{
  "message": "name required"
}
OR
{
  "message": "email required"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "input have to be email"
}

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
````

&nbsp;
