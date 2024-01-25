import { useState } from "react";
import classNames from "classnames";
import { AuthService } from "../utils/AuthService.ts";

export default function RegisterForm() {
    const [loginInput, setLoginInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [repeatPasswordInput, setRepeatPasswordInput] = useState<string>('');

    const isLoginValid = loginInput.length >= 4 && /^[a-zA-Z0-9]+$/.test(loginInput);
    const isPasswordValid = passwordInput.length >= 4 && /[A-Z]/.test(passwordInput) && /[!@#$%^&*(),.?":{}|<>]/.test(passwordInput);
    const isRepeatPasswordValid = passwordInput === repeatPasswordInput;

    async function handleRegisterButton() {
        try {
            const userData = await AuthService.register(loginInput, passwordInput);

            if (userData) {
                console.log('Register successful:', userData);
                AuthService.saveUserDataToLocalStorage(userData);
            } else {
                console.log('Register failed');
            }
        } catch (error) {
            console.error('Error during register:', error);
        }
    }

    const inputStyle = (isValid: boolean) => classNames(
        'w-1/2 h-12 rounded-2xl text-accent font-bold text-2xl text-center mt-10',
        { 'border-red-500 border-2': !isValid }
    );

    const isFormValid = isLoginValid && isPasswordValid && isRepeatPasswordValid;

    return (
        <>
            <div className={'bg-white-transparent fixed z-40 w-full h-full left-0 top-14'}>
            </div>
            <div
                className={classNames(
                    'absolute w-1/4 h-96 left-1/3 top-1/4 z-50 flex flex-col justify-start items-center',
                    'bg-dark-custom-light border-4 border-accent-dark rounded-2xl',
                )}>
                <input
                    className={inputStyle(isLoginValid)}
                    placeholder={'enter login'}
                    type="text"
                    value={loginInput}
                    onChange={(event) => {
                        setLoginInput(event.target.value);
                    }}
                />
                <input
                    className={inputStyle(isPasswordValid)}
                    placeholder={'enter password'}
                    type="password"
                    value={passwordInput}
                    onChange={(event) => {
                        setPasswordInput(event.target.value);
                    }}
                />
                <input
                    className={inputStyle(isRepeatPasswordValid)}
                    placeholder={'repeat password'}
                    type="password"
                    value={repeatPasswordInput}
                    onChange={(event) => {
                        setRepeatPasswordInput(event.target.value);
                    }}
                />
                <button
                    className={'w-1/2 h-12 rounded-2xl text-white font-bold text-2xl text-center mt-10'}
                    onClick={handleRegisterButton}
                    disabled={!isFormValid}
                >
                    Register
                </button>

            </div>
        </>

    )
}
