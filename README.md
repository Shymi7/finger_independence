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

## Test scenarios for manual tester

| Test Case ID | Description                  | Test Steps                                                                                                                                                                                                                                         | Expected Result                                                                                                               |
|--------------|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| TC_01        | Incorrect registration       | 1. Click "Register" on the top bar<br>2. Enter any login longer than 4 characters<br>3. Enter any password and a different repeated password<br>4. Click the "Register" button at the bottom of the dialog                                         | Registration dialog will not disappear                                                                                         |
| TC_02        | Correct registration         | 1. Click "Register" on the top bar<br>2. Enter any login longer than 4 characters<br>3. Enter any password with at least 8 characters, an uppercase letter, a digit, and a special character, and the same repeated password<br>4. Click "Register" button | Registration dialog will disappear                                                                                             |
| TC_03        | Incorrect login              | 1. Click "Log in" on the top bar<br>2. Enter "sdfgsdfg" in the login field and "qwerqwr" in the password field<br>3. Click the "Log in" button                                                                                                    | Login dialog will not disappear                                                                                                |
| TC_04        | Correct login                | 1. Click "Log in" on the top bar<br>2. Enter "testuser6" in the login field and "Admin123!" in the password field<br>3. Click the "Log in" button                                                                                                 | Login dialog will disappear. The user's name and a "Log out" button will appear on the navigation bar                           |
| TC_05        | Log out                      | 1. After logging in (see TC_04), click the "Log out" button on the top bar                                                                                                                                                                         | The user's name and "Log out" button will disappear, "Log in" and "Register" buttons will appear                               |
| TC_06        | Check keyboard functionality | 1. Press any keys on the keyboard for 10 seconds                                                                                                                                                                                                   | Keys on the virtual keyboard will light up when corresponding keys on the computer keyboard are pressed                        |
| TC_07        | Select training mode         | 1. Click on the training mode labeled "Medium" in the middle of the screen                                                                                                                                                                         | The name of the selected mode will appear on the left side of the chosen mode                                                  |
| TC_08        | Start training               | 1. After selecting the training mode (see TC_07), click on the button labeled "Start"                                                                                                                                                              | A pattern of rectangles with keys to press will appear in the middle of the screen (above the virtual keyboard)                |
| TC_09        | Check chart                  | 1. Start "Easy" training.<br>2. Press the characters visible on the virtual keyboard for 30 seconds                                                                                                                                                 | A chart will appear in the middle of the screen after 30 seconds                                                               |
| TC_10        | Check the number of errors   | 1. Start "Easy" training.<br>2. Press the "m" key on the keyboard 5 times                                                                                                                                                                           | The phrase "Mistakes made: 5" will appear at the top of the screen (just below the navigation bar)                             |



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
