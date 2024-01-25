import {useState} from "react";
import classNames from "classnames";
import {AuthService} from "../utils/AuthService.ts";

interface LoginFormProps{
    loginSetState: () => void;
}
export function LoginForm( {loginSetState} : LoginFormProps){
    const [loginInput, setLoginInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');

    const authService = new AuthService();

    async function handleLoginBtn(){
        try {
            const userData = await AuthService.login(loginInput, passwordInput);

            if (userData) {
                console.log('Login successful:', userData);
                AuthService.saveUserDataToLocalStorage(userData);
                loginSetState();
            } else {
                console.log('Login failed: Invalid credentials or response');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    const inputStyle = classNames(
        'w-1/2 h-12 rounded-2xl text-accent font-bold text-2xl text-center mt-10'
    );

    return(
        <>
            <div className={'bg-white-transparent fixed z-40 w-full h-full left-0 top-14'}>
            </div>
            <div
                className={classNames(
                    'absolute w-1/4 h-96 left-1/3 top-1/4 z-50 flex flex-col justify-start items-center',
                    'bg-dark-custom-light border-4 border-accent-dark rounded-2xl',
                )}>

                <input
                    className={inputStyle}
                    placeholder={'enter login'}
                    type="text"
                    value={loginInput}
                    onChange={(event) => {
                        setLoginInput(event.target.value);
                    }}
                />
                <input
                    className={inputStyle}
                    placeholder={'enter password'}
                    type="password"
                    value={passwordInput}
                    onChange={(event) => {
                        setPasswordInput(event.target.value);
                    }}
                />
                <button
                    className={'w-1/2 h-12 bg-accent rounded-2xl text-white font-bold text-2xl text-center mt-10'}
                    onClick={handleLoginBtn}
                >
                    Log in
                </button>
            </div>
        </>

    )
}