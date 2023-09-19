import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {useNavigate} from 'react-router-dom';
import MyCalendar from '../components/Calendar.js';
import { fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers.js';
import AddTask from '../components/AddTask.js';
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));


 describe('AddTask', () => {
    test ('renders AddTask component', () => {
        const userId = 123
        const theme = "light"
        const language = "spanish"
        const closeModal = jest.fn();
        const getTasks = jest.fn();
  
        render(<AddTask userId={userId} 
            theme={theme}
            language={language}
            closeModal={closeModal}
            getTasks={getTasks}
          


        /> );
        screen.debug();
    });

    test('has a add button', () => {
        const userId = 123
        const theme = "light"
        const language = "spanish"
        const closeModal = jest.fn();
        const getTasks = jest.fn();
  
        render(<AddTask userId={userId} 
            theme={theme}
            language={language}
            closeModal={closeModal}
            getTasks={getTasks}

        />);
        const addBtn = screen.getByTestId('Add');
        expect(addBtn).toBeInTheDocument();
    }
    );
   

});