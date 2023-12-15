import jwt from "jsonwebtoken";
// import {isJWTTokenActive} from "./utilsFunctions.ts";
import axios from "axios";
import {loginData} from "./data.ts";

interface UserData {
    userId: string;
    userName: string;
    authenticationToken: string;
}

export class AuthService {
    login(login: string, password: string) {

        axios.post(loginData.MainApiPath + 'auth/login', {
            username: login,
            password: password
        })
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    isUserLogged(): boolean {
        const token = localStorage.getItem('authToken');
        if (token == null)
            return false;

        return true;
    }

    getLoggedUserData(): UserData | null {
        const id = localStorage.getItem('userId');
        const username = localStorage.getItem('userName');
        const token = localStorage.getItem('authToken');

        if (id == null || username == null || token == null) {
            console.log('error during receiving user data from local storage');
            return null;
        }

        return {userId: id, userName: username, authenticationToken: token};
    }

    // isJWTTokenActive(token: string): boolean {
    //     try {
    //         const decodedToken = jwt.decode(token);
    //         // const decodedToken = 'asdf';
    //
    //         if (decodedToken == null || typeof decodedToken == 'string') {
    //             console.log('token is null or string')
    //             return false;
    //         }
    //
    //         const expirationTime = decodedToken.exp ?? 0;
    //         const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    //
    //         return currentTime < expirationTime;
    //     } catch (error) {
    //         // Token decoding failed, consider it expired
    //         return false;
    //     }
    //     return false;
    // }
}