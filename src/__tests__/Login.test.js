import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {useNavigate} from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers.js';
import Login from '../components/Login.js';
const mockedUsedNavigate = jest.fn();   


describe ('Login', () => {
    const language = "english";
    const handleSubmit = jest.fn();
    const setEmail = jest.fn(); 
    const setpassword = jest.fn();
    const theme = "light";
    
    test('renders Login component', () => {
        render(<Login language={language} handleSubmit={handleSubmit} setEmail={setEmail} setpassword={setpassword} theme={theme}/>);
        expect(screen.getByTestId('login')).toBeInTheDocument();
    }
    );

test('has log in btn', () => {
    render(<Login language={language} handleSubmit={handleSubmit} setEmail={setEmail} setpassword={setpassword} theme={theme}/>);
    expect(screen.getByTestId('log-btn')).toBeInTheDocument();
}
);


});