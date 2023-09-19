import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Calendar from 'react-calendar';
import {useNavigate} from 'react-router-dom';
import MyCalendar from '../components/Calendar.js';
import { fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers.js';
const mockedUsedNavigate = jest.fn();



jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));
 


describe('Calendar', () => {
    test('renders Calendar component', () => {
        const userId = 123
        const theme = "light"
        const language = "spanish"
        render(<MyCalendar userId={userId} 
            theme={theme}
            language={language}
        />);
       
        
    });
    test('has a add button', () => {
        const userId = 123
        const theme = "light"
        const language = "spanish"
        render(<MyCalendar userId={userId} 
            theme={theme}
            language={language}
        />);
        const addBtn = screen.getByTestId('Add');
        expect(addBtn).toBeInTheDocument();
    }
    );

    


});

