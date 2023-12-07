import {useState} from "react";

export function RegisterForm(){
    const [loginInput, setLoginInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [repeatPasswordInput, setRepeatPasswordInput] = useState<string>('');


    return(
        <div className={'absolute w-72 h-96 bg-dark-custom-light border-2 border-accent-dark flex flex-col justify-between'}>
            <input
                className={'w-full'}
                placeholder={'enter login'}
                type="text"
                value={loginInput}
                onChange={(event) => {
                    setLoginInput(event.target.value);
                }}
            />
            <input
                className={'w-full'}
                placeholder={'enter password'}
                type="password"
                value={passwordInput}
                onChange={(event) => {
                    setPasswordInput(event.target.value);
                }}
            />
            <input
                className={'w-full'}
                placeholder={'repeat password'}
                type="password"
                value={repeatPasswordInput}
                onChange={(event) => {
                    setRepeatPasswordInput(event.target.value);
                }}
            />
        </div>
    )
}