import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {useNavigate} from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers.js';
import Home from '../components/Home.js';
const mockedUsedNavigate = jest.fn();


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));
 
 describe ('Home', () => {
    const userId = 123;
    const theme = "light";
    const language = "spanish";
    const  isLogged = false;
    test('renders Home component', () => {
        render(<Home userId={userId} 
            theme={theme}
            language={language}
            isLogged={isLogged}
        />);
        screen.debug();
    })
    test:('has welcome message', () => {
        render(<Home userId={userId} 
            theme={theme}
            language={language}
            isLogged={isLogged}
        />);
        const welcome = screen.getByText('Organiza tus tareas y actividades');
        expect(welcome).toBeInTheDocument();
    })
}
    );
    