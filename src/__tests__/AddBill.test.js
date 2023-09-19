import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {useNavigate} from 'react-router-dom';
import MyCalendar from '../components/Calendar.js';
import { fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers.js';
import AddBill from '../components/AddBill.js';
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));
 
 describe('AddBill', () => {
    test('renders AddBill component', () => {
        const userId = 123
        const theme = "light"
        const language = "spanish"
        const closeModal = true;
        const getBills = jest.fn();
        const totalPaid = 0;

        render(<AddBill userId={userId} 
            theme={theme}
            language={language}
            closeModal={closeModal}
            getBills={getBills}
            totalPaid={totalPaid}
            totalUnPaid={0}


        /> );
        screen.debug();
    }
    );
    test('has a add button', () => {
        const userId = 123
        const theme = "light"
        const language = "spanish"
        const closeModal = true;
        const getBills = jest.fn();
        const totalPaid = 0;
        render( <AddBill userId={userId} 
            theme={theme}
            language={language}
            closeModal={closeModal}
            getBills={getBills}
            totalPaid={totalPaid}
            totalUnPaid={0}
           

        />);
        const addBtn =  screen.getAllByTestId('gasto');
        expect(addBtn).toBeInstanceOf(Array);
    }
    );
})




