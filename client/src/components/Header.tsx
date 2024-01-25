import {useEffect, useState} from "react";
import {LoginForm} from "./LoginForm.tsx";
import RegisterForm from "./RegisterForm.tsx";
import {AuthService} from "../utils/AuthService.ts";

export function Header() {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [loginOrRegister, setLoginOrRegister] = useState<string>('none');


    useEffect(() => {
        setIsLogged(AuthService.isUserLogged());
    }, [])


    function handleLoginClick() {
        if (loginOrRegister == 'login') {
            setLoginOrRegister('none');
            return;
        }
        setLoginOrRegister('login');
    }

    function handleRegisterClick() {
        if (loginOrRegister == 'register') {
            setLoginOrRegister('none');
            return;
        }
        setLoginOrRegister('register');
    }

    function handleLogOutClick() {
        AuthService.logOut();
        setIsLogged(false);
    }

    function handleUserStatsButton(){

    }

    function getUserNameFromLocalStorage(): string {
        return AuthService.getLoggedUserData()?.userName ?? 'error';
    }


    return (
        <div className={'w-full h-14 flex flex-row justify-between bg-accent-dark'}>
            <div className={'flex flex-row'}>
                <div className={'flex flex-row items-center h-full text-3xl px-3 font-bold text-white'}>
                    Finger Independence
                </div>
                <div className={"flex flex-row items-center h-full text-xl px-3 text-gray-300"}>
                    piano training app
                </div>
            </div>
            {
                isLogged ?
                    <div className={'flex flex-row'}>
                        <div
                            className={"flex flex-row items-center h-full text-xl self-end px-3 text-white cursor-pointer"}
                            onClick={handleUserStatsButton}
                        >
                            {getUserNameFromLocalStorage()}
                        </div>
                        <div
                            className={"flex flex-row items-center h-full text-xl self-end px-3 text-white cursor-pointer"}
                            onClick={handleLogOutClick}
                        >
                            Log out
                        </div>


                    </div>
                    :
                    <div className={'flex flex-row'}>
                        <div
                            className={"flex flex-row items-center h-full text-xl self-end px-3 text-white cursor-pointer"}
                            onClick={handleLoginClick}
                        >
                            Login
                        </div>
                        <div
                            className={"flex flex-row items-center h-full text-xl self-end px-3 text-white cursor-pointer"}
                            onClick={handleRegisterClick}
                        >
                            Register
                        </div>
                    </div>
            }


            {
                loginOrRegister == 'login' &&
                <LoginForm loginSetState={() => {
                    setIsLogged(true);
                    setLoginOrRegister('none');
                }}/>
            }
            {
                loginOrRegister == 'register' &&
                <RegisterForm/>
            }

        </div>
    )
}