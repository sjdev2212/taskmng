import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {useNavigate} from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers.js';
import Register from '../components/Register.js';
const mockedUsedNavigate = jest.fn();   

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

describe ('Register', () => {
    const language = "english";
  
    const theme = "light";
    mockedUsedNavigate.mockImplementation(() => null);
    
    test('renders Register component', () => {
        render(<Register language={language}  theme={theme}/>);
       
    });

test('has register btn', () => {
    render(<Register language={language}  theme={theme}/>);
    expect(screen.getByTestId('reg-btn')).toBeInTheDocument();
    }
    );
});