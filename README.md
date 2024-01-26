# Finger Independence - piano training app

## Description

This project aims to create a web application for improving keyboard instrument skills in an easily accessible manner. Focused specifically on finger independence, the application utilizes the computer keyboard, simulating a piano keyboard when hands are appropriately positioned. The core functionality includes exercises that involve pressing keys in sequences defined by predefined modes, with customizable exercise modes and hand positioning settings.

![image](https://github.com/Shymi7/finger_independence/assets/49645106/4c3d364c-e00f-4bb6-85bd-d49ab2b5ea3d)


## Build project
To be able to run and test this project, you need to run commands:
```
cd .\client\
npm install
cd ..\server\
npm install
```

## Run project
```
cd .\client\
npm run dev
cd ..\server\
node index.js
```

## Test project
```
 cd .\client\
npm test
```

## Sample Endpoints

### User Registration

- **URL:** `/api/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Body:**

```
  {
    "username": "string",
    "password": "string"
  }
```
### User Login
- **URL:** `/api/login`
- **Method:** `POST`
- **Description:** Authenticate a user and return a JWT token.
- **Body:**

```
  {
    "username": "string",
    "password": "string"
  }
```
### Save score
- **URL:** `/api/save-score`
- **Method:** `POST`
- **Description:** Register a new user.
- **Header:**

```
Authorization: Bearer <token>

```
- **Body:**

```
{
  "userId": "string",
  "gameId": "string",
  "score": [number]
}
```

## Technologies
- React
- TypeScript
- Tailwind CSS
- MobX
- NodeJS
- ExpressJS
- MongoDB
