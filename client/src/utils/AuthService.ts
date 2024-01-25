import { jwtDecode } from "jwt-decode";

import axios from "axios";
import {loginData} from "./data.ts";
import {UserSettings} from "./UserSettings.ts";

interface UserData {
    userId: string;
    userName: string;
    authenticationToken: string;
}
export class AuthService {

    static async login(login: string, password: string): Promise<UserData | null> {
        try {
            const response = await axios.post(loginData.MainApiPath + 'auth/login', {
                username: login,
                password: password
            });

            if (response.data && typeof response.data.userId === 'string') {
                return {
                    userId: response.data.userId,
                    userName: login,
                    authenticationToken: response.data.token,
                };
            } else {
                console.error('Invalid response structure:', response.data);
                return null;
            }
        } catch (error) {
            console.error('Login error:', error);
            return null;
        }
    }

    static async register(login: string, password: string): Promise<UserData | null> {
        try {
            const response = await axios.post(loginData.MainApiPath + 'auth/register', {
                username: login,
                password: password
            });

            if (response.data && typeof response.data.userId === 'string') {
                return response.data;
            } else {
                console.error('Invalid response structure:', response.data);
                return null;
            }
        } catch (error) {
            console.error('Register error:', error);
            return null;
        }
    }


    static saveUserDataToLocalStorage(userData: UserData){
        const jsonUserData = JSON.stringify(userData);
        localStorage.setItem('userData', jsonUserData);
    }

    static logOut():void{
        localStorage.removeItem('userData');
    }


    static isUserLogged(): boolean {
        const userData = AuthService.getLoggedUserData();

        if (userData == null || userData.authenticationToken == null)
            return false;

        return !AuthService.isTokenExpired(userData.authenticationToken);
    }

    static getLoggedUserData(): UserData | null {
        try{
            const rawUserData = localStorage.getItem('userData');
            const userData = JSON.parse(rawUserData!) as UserData;

            return userData == null ? null : userData;
        } catch (e){
            console.log('Error while receiving user data from localStorage');
            return null;
        }
        // const id = localStorage.getItem('userId');
        // const username = localStorage.getItem('userName');
        // const token = localStorage.getItem('authToken');
        //
        // if (id == null || username == null || token == null) {
        //     console.log('error during receiving user data from local storage');
        //     return null;
        // }
        //
        // return {userId: id, userName: username, authenticationToken: token};
    }

    static isTokenExpired (token: string): boolean{
        try {
            const decoded = jwtDecode(token);

            if (!decoded.exp) {
                return true; // Assume expired if no expiry time
            }

            const currentDate = new Date();
            return decoded.exp * 1000 < currentDate.getTime();
        } catch (error) {
            console.error("Token decoding error:", error);
            return true; // Assume expired if error in decoding
        }
    };

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