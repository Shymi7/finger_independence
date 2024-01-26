import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '../components/RegisterForm.tsx';
import {AuthService} from "../utils/AuthService.ts";
import {Header} from "../components/Header.tsx";
import App from "../components/App.tsx";
import {PianoKeyboard} from "../components/PianoKeyboard.tsx"; // Adjust the import path as needed


describe('RegisterForm Integration Tests', () => {

    test('Input fields change color when invalid input is provided', () => {
        render(<RegisterForm registerSetState={()=>{}}/>);

        const loginInput = screen.getByPlaceholderText('enter login');
        const passwordInput = screen.getByPlaceholderText('enter password');
        const repeatPasswordInput = screen.getByPlaceholderText('repeat password');

        fireEvent.change(loginInput, { target: { value: 'abc' } }); // Invalid login (less than 4 characters)
        fireEvent.change(passwordInput, { target: { value: 'pass' } }); // Invalid password (no special character or uppercase letter)
        fireEvent.change(repeatPasswordInput, { target: { value: 'pass' } });

        expect(loginInput).toHaveClass('border-red-500');
        expect(passwordInput).toHaveClass('border-red-500');
    });

    test('Register button is disabled when input is invalid', () => {
        render(<RegisterForm registerSetState={()=>{}}/>);

        const loginInput = screen.getByPlaceholderText('enter login');
        const passwordInput = screen.getByPlaceholderText('enter password');
        const repeatPasswordInput = screen.getByPlaceholderText('repeat password');
        const registerButton = screen.getByRole('button', { name: /register/i });

        fireEvent.change(loginInput, { target: { value: 'user' } });
        fireEvent.change(passwordInput, { target: { value: 'pass' } });
        fireEvent.change(repeatPasswordInput, { target: { value: 'pass' } });

        expect(registerButton).toBeDisabled();
    });

    test('Register button is enabled when input is valid', () => {
        render(<RegisterForm registerSetState={()=>{}}/>);

        const loginInput = screen.getByPlaceholderText('enter login');
        const passwordInput = screen.getByPlaceholderText('enter password');
        const repeatPasswordInput = screen.getByPlaceholderText('repeat password');
        const registerButton = screen.getByRole('button', { name: /register/i });

        fireEvent.change(loginInput, { target: { value: 'validUser' } });
        fireEvent.change(passwordInput, { target: { value: 'Pass@123' } });
        fireEvent.change(repeatPasswordInput, { target: { value: 'Pass@123' } });

        expect(registerButton).not.toBeDisabled();
    });



    describe('Header Component Basic Tests', () => {

        test('Initial render with "Login" and "Register" buttons', () => {
            render(<Header/>);

            expect(screen.getByText('Login')).toBeInTheDocument();
            expect(screen.getByText('Register')).toBeInTheDocument();
        });

        test('Click on "Login" opens login form', () => {
            render(<Header/>);

            const loginButton = screen.getByText('Login');
            fireEvent.click(loginButton);

            expect(screen.getByPlaceholderText('enter login')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('enter password')).toBeInTheDocument();
        });

        test('Click on "Register" opens register form', () => {
            render(<Header/>);

            const registerButton = screen.getByText('Register');
            fireEvent.click(registerButton);

            expect(screen.getByPlaceholderText('enter login')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('enter password')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('repeat password')).toBeInTheDocument();
        });

    });

    describe('Keyboard component should', () => {

        test('Have keys that are defined in default constructor', () => {
            render(<PianoKeyboard/>);

            expect(screen.getByText('z')).toBeInTheDocument();
            expect(screen.getByText('x')).toBeInTheDocument();
            expect(screen.getByText('c')).toBeInTheDocument();
            expect(screen.getByText('v')).toBeInTheDocument();
            expect(screen.getByText('m')).toBeInTheDocument();
            expect(screen.getByText(',')).toBeInTheDocument();
            expect(screen.getByText('.')).toBeInTheDocument();
            expect(screen.getByText('/')).toBeInTheDocument();
        });

        test('Not have keys that aren\'t defined in default constructor', () => {
            render(<PianoKeyboard/>);

            const pianoTile = (screen.getByText('m')).parentNode;
            if(pianoTile == null)
                fail();

            fireEvent.keyDown(pianoTile, {key: 'A', code: 'KeyA'})

            expect(screen.queryByText('a')).toBeNull();
            expect(screen.queryByText('u')).toBeNull();
            expect(screen.queryByText(';')).toBeNull();
            expect(screen.queryByText(']')).toBeNull();
        });

        test('Highlight keys that were pressed', () => {
            render(<PianoKeyboard/>);

            let pianoTile = (screen.getByText('z')).parentElement;
            if(pianoTile == null)
                fail();

            fireEvent.keyDown(pianoTile, { key: 'z', code: 'KeyZ', charCode: 90 })
            expect(pianoTile).toHaveClass("bg-gray-400");

            pianoTile = (screen.getByText('m')).parentElement;
            if(pianoTile == null)
                fail();

            fireEvent.keyDown(pianoTile, { key: 'm', code: 'KeyM', charCode: 109 })
            expect(pianoTile).toHaveClass("bg-gray-400");
        });

        test('Highlighted keys return to normal state after being pressed down', () => {
            render(<PianoKeyboard/>);

            let pianoTile = (screen.getByText(',')).parentElement;
            if(pianoTile == null)
                fail();

            fireEvent.keyDown(pianoTile, { key: ',', charCode: 44 })
            expect(pianoTile).toHaveClass("bg-gray-400");
            fireEvent.keyUp(pianoTile, { key: ',' })
            expect(pianoTile).toHaveClass("bg-white");


            pianoTile = (screen.getByText('x')).parentElement;
            if(pianoTile == null)
                fail();

            fireEvent.keyDown(pianoTile, { key: 'x', charCode: 120 })
            expect(pianoTile).toHaveClass("bg-gray-400");
            fireEvent.keyUp(pianoTile, { key: 'x' })
            expect(pianoTile).toHaveClass("bg-white");
        });



    });

});
