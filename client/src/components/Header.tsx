import {useEffect, useState} from "react";
import {LoginForm} from "./LoginForm.tsx";
import RegisterForm from "./RegisterForm.tsx";
import {AuthService} from "../utils/AuthService.ts";
import {KeyboardSettings} from "./KeyboardSettings.tsx";
import {GlobalBestScores} from "./GlobalBestScores.tsx";
import {PersonalBestScores} from "./PersonalBestScores.tsx";

export function Header() {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [openWindowState, setOpenWindowState] = useState<string>('none');


    useEffect(() => {
        setIsLogged(AuthService.isUserLogged());
    }, [])


    function handleLoginClick() {
        if (openWindowState == 'login') {
            setOpenWindowState('none');
            return;
        }
        setOpenWindowState('login');
    }

    function handleRegisterClick() {
        if (openWindowState == 'register') {
            setOpenWindowState('none');
            return;
        }
        setOpenWindowState('register');
    }

    function handleLogOutClick() {
        AuthService.logOut();
        setIsLogged(false);
    }

    function handleUserStatsButton(){

    }

    function handleKeyboardSettingsButton(){
        if (openWindowState == 'keyboardSettings') {
            setOpenWindowState('none');
            return;
        }
        setOpenWindowState('keyboardSettings');
    }
    function handlePersonalStatsButton(){
        if (openWindowState == 'personalBestScores') {
            setOpenWindowState('none');
            return;
        }
        setOpenWindowState('personalBestScores');

    }
    function handleGlobalStatsButton(){
        if (openWindowState == 'globalBestScores') {
            setOpenWindowState('none');
            return;
        }
        setOpenWindowState('globalBestScores');

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
                            onClick={handleKeyboardSettingsButton}
                        >
                            Settings
                        </div>
                        <div
                            className={"flex flex-row items-center h-full text-xl self-end px-3 text-white cursor-pointer"}
                            onClick={handleGlobalStatsButton}
                        >
                            Global ranking
                        </div>
                        <div
                            className={"flex flex-row items-center h-full text-xl self-end px-3 text-white cursor-pointer"}
                            onClick={handlePersonalStatsButton}
                        >
                            Personal Statistics
                        </div>
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
                            onClick={handleKeyboardSettingsButton}
                        >
                            Settings
                        </div>
                        <div
                            className={"flex flex-row items-center h-full text-xl self-end px-3 text-white cursor-pointer"}
                            onClick={handleGlobalStatsButton}
                        >
                            Global ranking
                        </div>
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


            <>

            </>
            {
                openWindowState == 'login' &&
                <LoginForm loginSetState={() => {
                    setIsLogged(true);
                    setOpenWindowState('none');
                }}/>
            }
            {
                openWindowState == 'register' &&
                <RegisterForm registerSetState={()=>{
                    setOpenWindowState('none');
                }}/>
            }
            {
                openWindowState == 'keyboardSettings' &&
                <KeyboardSettings onComponentClose={()=>{
                    setOpenWindowState('none');
                }}/>
            }
            {
                openWindowState == 'globalBestScores' &&
                <GlobalBestScores onComponentClose={()=>{
                    setOpenWindowState('none');
                }}/>
            }
            {
                openWindowState == 'personalBestScores' &&
                <PersonalBestScores onComponentClose={()=>{
                    setOpenWindowState('none');
                }}/>
            }

        </div>
    )
}